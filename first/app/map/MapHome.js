import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableHighlight,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { mapStyle } from './mapStyle';
import { HOT_DATA } from './HotData';  //hot景點的資料
import { SHOP_DATA } from './ShopData';  //shop景點的資料
import { HOL_DATA } from './HolData';  //shop景點的資料
import { MAIN_ROUTE_DATA } from './MainRoute'; //主路線的資料
import { ORI_DATA } from './OriData'; //空資料 -> 初始化
import  Detail  from '../detail/Detail';

const Map = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState(initialState);

  const [hotPress, setHotPress] = useState(false);
  const [shopPress, setShopPress] = useState(false);
  const [holPress, setHolPress] = useState(false);
  const [data, setData] = useState(ORI_DATA);
  const onPressHandlerForComlete = () => {
    console.log("press complete");
  }
  const onPressHandlerForHot = () => {
    if (hotPress) {
      setData(ORI_DATA);
    } else {
      setData(HOT_DATA);
      setShopPress(false);
      setHolPress(false);
    }
    setHotPress(!hotPress); //打開
  }
  const onPressHandlerForShop = () => {
    if (shopPress) {
      setData(ORI_DATA);
    } else {
      setData(SHOP_DATA);
      setHotPress(false);
      setHolPress(false);
    }
    setShopPress(!shopPress); //打開
  }
  const onPressHandlerForHoliday = () => {
    if (holPress) {
      setData(ORI_DATA);
    } else {
      setData(HOL_DATA);
      setShopPress(false);
      setHotPress(false);
    }
    setHolPress(!holPress); //打開
  }
  return (
    <View style={styles.container}>

      {/*浮動視窗-------------------------------------------------------------------------------*/}
      <Detail
        entry={modalEntry}//傳進去的資料參數
        modalVisible={modalVisible}//可不可見
        onClose={() => {setModalVisible(false);console.log("close")}}//關閉函式
      />
      {/*浮動視窗-------------------------------------------------------------------------------*/}
      
      {/*熱門景點*/}
      <TouchableHighlight
        style={styles.buttonForHot}
        onPress={onPressHandlerForHot}
        underlayColor='#eeeeee'
      >
        <Text style={styles.textForOption}>熱門景點</Text>
      </TouchableHighlight>

      {/*節日*/}
      <TouchableHighlight
        style={styles.buttonHoliday}
        onPress={onPressHandlerForHoliday}
        underlayColor='#eeeeee'
      >
        <Text style={styles.textForOption}>節日</Text>
      </TouchableHighlight>

      {/*購物*/}
      <TouchableHighlight
        style={styles.buttonForShop}
        onPress={onPressHandlerForShop}
        underlayColor='#eeeeee'
      >
        <Text style={styles.textForOption}>購物</Text>
      </TouchableHighlight>

      {/*完成*/}
      <TouchableHighlight
        style={styles.buttonForComlete}
        onPress={onPressHandlerForComlete}
        underlayColor='#ddddd'
      >
        <Text style={styles.text}>完成</Text>
      </TouchableHighlight>

      <MapView //初始化位置
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        initialRegion={{
          latitude: 25.1505495,
          longitude: 121.7735869,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        mapType="standard"
      >
        {/*market of main Route */}
        {MAIN_ROUTE_DATA.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            pinColor={marker.pinColor}
          ></Marker>
        ))}

        {data.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            pinColor={marker.pinColor}
            onPress={(e) => {
              //console.log(e.nativeEvent);
              //console.log('pu');
              setModalVisible(!modalVisible);
              setModalEntry(sites);
              //console.log('site');
              //console.log({site});
            }}
          ></Marker>
        ))}


        <Polyline
          coordinates={[{
            latitude: 25.1492020,
            longitude: 121.7725950,
          },
          {
            latitude: 25.1538028,
            longitude: 121.7747954,
          }]}
          strokeColor="#5f695d"
          //strokeColors={['#7F0000']}
          strokeWidth={3}
        />
      </MapView>


    </View>
  );
}
const initialState = {
      "id":{},
      "name": {},
      "img": {},
      "address":{},
      "info":{},
}
const sites = 
  {
    id: 1,
    name: '陽明山國家公園',
    img: require('../../assets/site1.jpg'),
    address: '台北市士林區竹子湖路1-20號',
    star: 4.5,
    info:'陽明山國家公園是臺灣離都會區最近的一座國家公園，這裡地貌多變、生態豐富，孕育了許多珍貴的保育類動物，幸運的話，可以在這裏發現臺灣特有種鳥類－臺灣藍鵲的蹤跡。'
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
  },
  buttonForComlete: {
    zIndex: 2,
    left: '30%',
    position: 'absolute',
    top: '92%',
    backgroundColor: '#5f695d',
    width: '40%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonForHot: {
    zIndex: 2,
    left: 15,
    position: 'absolute',
    top: '3%',
    backgroundColor: '#D1DED7',
    width: '30%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonHoliday: {
    zIndex: 2,
    left: 15,
    position: 'absolute',
    top: '9%',
    backgroundColor: '#D1DED7',
    width: '30%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonForShop: {
    zIndex: 2,
    left: 15,
    position: 'absolute',
    top: '15%',
    backgroundColor: '#D1DED7',
    width: '30%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 17,
    color: '#F2F2F2',
  },
  textForOption: {
    fontSize: 17,
    color: '#5f695d',
  },
});
export default Map; 