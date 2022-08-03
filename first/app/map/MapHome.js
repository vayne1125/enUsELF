import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { mapStyle } from './mapStyle';
import { HOT_DATA } from './HotData';  //hot景點的資料
import { SHOP_DATA } from './ShopData';  //shop景點的資料
import { HOL_DATA } from './HolData';  //shop景點的資料
import { MAIN_ROUTE_DATA } from './MainRoute'; //主路線的資料
import { ORI_DATA } from './OriData'; //空資料 -> 初始化
import { END_DATA } from './EndData';
import  Detail  from '../detail/Detail';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Entypo';
const Map = () => {
  const tp = [{
    latitude: 24.9536339,
    longitude: 121.2234045,
  },
  {
    latitude: 23.517405,
    longitude: 120.7914543,
  }];
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState(initialState);
  const [tpData,setData] = useState(tp);
  const [hotPress, setHotPress] = useState(false);
  const [shopPress, setShopPress] = useState(false);
  const [holPress, setHolPress] = useState(false);
  const [hotData, setHotData] = useState(ORI_DATA);
  const [holData, setHolData] = useState(ORI_DATA);
  const [shopData, setShopData] = useState(ORI_DATA);
  const [endData, setEndData] = useState(ORI_DATA);
  const onPressHandlerForComlete = () => {
    console.log("press complete");
    setHotData(ORI_DATA);
    setHolData(ORI_DATA);
    setShopData(ORI_DATA);
    setEndData(END_DATA);
    setData([
      {
        latitude: 24.9536339,
        longitude: 121.2234045,
      },{
        latitude: 23.503666,
        longitude: 120.6762536,
      },{
        latitude: 23.559718,
        longitude: 120.5986966,
      },{
        latitude: 23.45498,
        longitude: 120.1392385,
      },{
        latitude: 23.4858371,
        longitude: 120.4504105,
      },{
        latitude: 23.517405,
        longitude: 120.7914543,
      }
    ])
  }
  const onPressHandlerForHot = () => {
    if (hotPress) {
      setHotData(ORI_DATA);
    } else {
      setHotData(HOT_DATA);
    }
    setHotPress(!hotPress); //打開
  }
  const onPressHandlerForShop = () => {
    if (shopPress) {
      setShopData(ORI_DATA);
    } else {
      setShopData(SHOP_DATA);
    }
    setShopPress(!shopPress); //打開
  }
  const onPressHandlerForHoliday = () => {
    if (holPress) {
      setHolData(ORI_DATA);
    } else {
      setHolData(HOL_DATA);
    }
    setHolPress(!holPress); //打開
  }
  return (
    <View style={styles.container}> 
    <TouchableOpacity
        onPress={() => {
            navigation.goBack();
        }}
        style={styles.a}>
        <View style={styles.iconContainer}>
          <Icons
            name="chevron-left"
            size={60}
            color={'#5f695d'}
            style={styles.iconStyle}
          />
        </View>
      </TouchableOpacity>
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
          latitude: 24.2355194,
          longitude: 121.007429,
          latitudeDelta: 1.2,
          longitudeDelta: 1.2,
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

        {hotData.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            pinColor={marker.pinColor}
            onPress={(e) => {
              setModalVisible(!modalVisible);
              setModalEntry(sites);
            }}
            title={marker.name}
          ></Marker>
        ))}
        {holData.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            pinColor={marker.pinColor}
            onPress={(e) => {
              setModalVisible(!modalVisible);
              setModalEntry(sites);
            }}
          ></Marker>
        ))}
        {shopData.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            pinColor={marker.pinColor}
            onPress={(e) => {
              setModalVisible(!modalVisible);
              setModalEntry(sites);
            }}
          ></Marker>
        ))}
        {endData.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            pinColor={marker.pinColor}
            onPress={(e) => {
              setModalVisible(!modalVisible);
              setModalEntry(sites);
            }}
          ></Marker>
        ))}


        <Polyline
          coordinates={tpData}
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
    top: '8%',
    backgroundColor: '#FF9797',
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
    top: '15%',
    backgroundColor: '#FFFFB9',
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
    top: '22%',
    backgroundColor: '#C4E1FF',
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
  topbar: {
    backgroundColor: '#5f695d',
    //flex:1,
    height: 63,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    //opacity: 0.9,
  },
  a:{
    zIndex:2,
    position: 'absolute',
    left:15,
    top: "1%",
  },
  iconContainer: {
    backgroundColor: '#D1DED7',
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  iconStyle: {
    fontSize:45,
    top: -4,
    left: -2,
  },
});
export default Map; 