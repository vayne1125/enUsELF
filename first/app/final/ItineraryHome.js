import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import DetailForFinal from '../detail/DetailForFinal';
//import Back from './Back';
import MapViewDirections from 'react-native-maps-directions';
import ItineraryTop from './ItineraryTop';

const ItineraryHome = ({ navigation, route }) => {
  const API_key = 'AIzaSyDHq53RuJ511QN4rLqFmwLWiXA1_-nR7vY'
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState({}); //initialState
  const [modalIsMain,setModalIsMain] = useState(false); 
  const [mainRoute,setMainRoute] = useState(route.params.mainRoute);
  const [origin,setOrigin] = useState(route.params.origin);
  const [destination,setDestination] = useState(route.params.destination);
  const [endRoute,setEndRoute] = useState(route.params.endRoute);
  const [region,setRegion] = useState(route.params.region);
  const [waypoints,setWaypoints] = useState(route.params.waypoints);
  /*---------這些參數全都要存---------*/

  // const mainRoute = route.params.mainRoute;
  // const origin = route.params.origin;
  // const destination = route.params.destination;
  // const waypoints = route.params.waypoints;
  // const endRoute = route.params.endRoute;
  // const region = route.params.region;

  /*---------這些參數全都要存---------*/
  useEffect(()=>{
    console.log("mainRoute: ", mainRoute);
    console.log("endRoute: ", endRoute);
    console.log("waypoints: ", waypoints);
    console.log("origin: ", origin);
    console.log("destination: ", destination);
    console.log("region: ", region);
  })

  return (
    <View style={styles.container}>
      {/*浮動視窗-------------------------------------------------------------------------------*/}
      <DetailForFinal
        entry={modalEntry}//傳進去的資料參數
        modalVisible={modalVisible}//可不可見
        onClose={() => { setModalVisible(false);}}//關閉函式
        isMain = {modalIsMain}
      />
    {/*浮動視窗-------------------------------------------------------------------------------*/}
      <MapView //todo:初始化位置 
        loadingEnabled = {true}
        moveOnMarkerPress={false}
        rotateEnabled = {false}
        zoomEnabled = {false}
        zoomControlEnabled = {false}
        scrollEnabled = {false}
        //customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        //to do 取起終的中點
        initialRegion={region}
        mapType="standard" 
  >
        <MapViewDirections
          origin={origin} //to do抓當前位置
          destination={destination}
          waypoints = {waypoints}
          apikey={API_key}
          strokeWidth={3}
          strokeColor="#5f695d"
        >
        </MapViewDirections>

        <Marker
          pinColor='tan'
          tracksViewChanges={false}
          coordinate={origin}
          title="你的位置"
        />

        {/* {(mainRoute).map((marker,index) => {
          return (
            <Marker
              key={index}
              coordinate={{ latitude: marker.location.lat, longitude: marker.location.lng }}
              title={marker.name}
              onPress={(e) => {
                setModalIsMain(true);
                setModalVisible(!modalVisible);
                setModalEntry({
                  name: marker.name,
                  address: marker.address,
                  star: marker.star,
                  info: marker.info,
                  time: marker.time,
                  city: marker.city,
                  region: marker.region,
                });
              }}
            >
              <View style={styles.markerCss}>
                <Text style={styles.markerText}>{marker.name}</Text>
                <Image style={styles.markerImg} source={require('../../assets/pin/green.png')} />
              </View>
            </Marker>
          )
        }
        )} */}

      {/* {(endRoute).map((marker) => {
          return (
            <Marker
              key={marker.id}
              coordinate={{ latitude: marker.location.lat, longitude: marker.location.lng }}
              title={marker.name}
              onPress={(e) => {
                setModalIsMain(false);
                setModalVisible(!modalVisible);
                setModalEntry({
                  id: marker.id,
                  name: marker.name,
                  address: marker.address,
                  star: marker.star,
                  info: marker.info,
                  time: marker.time,
                  city: marker.city,
                  region: marker.region,
                  source:marker.source,
                });
              }}
            >
              <View style={styles.markerCss}>
                <Text style={styles.markerText}>{marker.name}</Text>
                <Image style={styles.markerImg} source={require('../../assets/pin/green.png')} />
              </View>
            </Marker>
           )
        }
        )} */}
      </MapView>

      <View style={styles.topbar}>
        <ItineraryTop></ItineraryTop>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  mapStyle: {
    position:'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  topbar: {
    zIndex:2,
    backgroundColor: '#5f695d',
    //flex:1,
    height: 63,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    //opacity: 0.9,
  },
  markerCss: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerText: {
    color: '#5f695d',
    fontSize: 15,
    fontWeight: "bold",
  },
});
export default ItineraryHome;
