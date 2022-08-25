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

const ItineraryHome = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState({}); //initialState
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
        moveOnMarkerPress={false}
        rotateEnabled = {false}
        zoomEnabled = {false}
        //customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        //to do 取起終的中點
        initialRegion={{
          //23.8269823,120.737534
          latitude: 23.8269823,
          longitude: 120.737534,
          latitudeDelta: 1.2, //數字越小 地圖道路越大
          longitudeDelta: 0,
        }}
        mapType="standard"
      >
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

//npx react-native run-android
