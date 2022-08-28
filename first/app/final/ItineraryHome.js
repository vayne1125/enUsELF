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
 
  const [origin,setOrigin] = useState(route.params.origin);
  const [destination,setDestination] = useState(route.params.origin);
  const [waypoints,setWaypoints] = useState([]);
  const [marker,setMarker] = useState([]);
  /*---------這些參數全都要存---------*/

  // const mainRoute = route.params.mainRoute;
  // const origin = route.params.origin;
  // const destination = route.params.destination;
  // const waypoints = route.params.waypoints;
  // const endRoute = route.params.endRoute;
  // const region = route.params.region;
  // origin:origin,
  // desSite:desSite,
  // site:site
  /*---------這些參數全都要存---------*/
  useEffect(()=>{
    setDestination(()=>{
      if(desSite.type === "food"){
        retrun (Food[param.id]);
      }else if(desSite.type === "nature"){
        retrun (desSite[param.id]);
      }else if(param.type === "kol"){
        retrun (KOL[param.id]);
      }else if(desSite.type === "monuments"){
        retrun (Monuments[param.id]);
      }else if(desSite.type === "hotel"){
        retrun (Hotel[param.id]);
      }
    })
  },[route.params.desSite])

  useEffect(()=>{
    setMarker(()=>{           
      var data = [];
      (route.params.site).map((param)=>{
        if(param.type === "food"){
          data.push(Food[param.id]);
        }else if(param.type === "nature"){
          data.push(Nature[param.id]);
        }else if(param.type === "kol"){
          data.push(KOL[param.id]);
        }else if(param.type === "monuments"){
          data.push(Monuments[param.id]);
        }else if(param.type === "hotel"){
          data.push(Hotel[param.id]);
        }else if(param.type === "hol"){

        }else if(param.type === "hot"){

        }else if(param.type === "shop"){

          
        }
        mySet.add(param.place_id); 
      })
      return data;
    })

    setWaypoints(()=>{           
      var data = [];
      (route.params.site).map((param)=>{
        if(param.type === "food"){
          data.push(Food[param.id]);
        }else if(param.type === "nature"){
          data.push(Nature[param.id]);
        }else if(param.type === "kol"){
          data.push(KOL[param.id]);
        }else if(param.type === "monuments"){
          data.push(Monuments[param.id]);
        }else if(param.type === "hotel"){
          data.push(Hotel[param.id]);
        }
        mySet.add(param.place_id); 
      })
      return data;
    })



  },[route.params.site])

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
          destination={{
            latitude: desSite.lat,
            longitude: desSite.lng
          }}
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
