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

const ItineraryHome = ({ navigation, route }) => {
  const API_key = 'AIzaSyDHq53RuJ511QN4rLqFmwLWiXA1_-nR7vY'
  //console.log(route.params);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState({}); //initialState
  /*---------這些參數全都要存---------*/
  const mainRoute = route.params.route1;
  const origin = route.params.origin;
  const destination = route.params.destination;
  const waypoints = route.params.waypoints;
  const endRoute = route.params.route2;
  const region = route.params.initRegion;
  /*---------這些參數全都要存---------*/
  return (
    <View style={styles.container}>
      {/*浮動視窗-------------------------------------------------------------------------------*/}
      <DetailForFinal
        entry={modalEntry}//傳進去的資料參數
        modalVisible={modalVisible}//可不可見
        onClose={() => { setModalVisible(false);}}//關閉函式
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

      
        

      </MapView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
export default ItineraryHome;
