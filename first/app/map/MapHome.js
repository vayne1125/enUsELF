import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { mapStyle } from './mapStyle';
import { MAIN_ROUTE_DATA } from './MainRoute'; //主路線的資料
import { ORI_DATA } from './OriData'; //空資料 -> 初始化
import { END_DATA } from './EndData';
import DetailForMap from '../detail/DetailForMap';
import Back from './Back';
import Refresh from './Refresh';
import MapViewDirections from 'react-native-maps-directions';
import Hotplace from './Hotplace'
import Shopplace from './Shopplace'
import Holplace from './Holplace'
//import Hotplace from './tp'
const Map = () => {
  const API_key = 'AIzaSyDHq53RuJ511QN4rLqFmwLWiXA1_-nR7vY'
  const [once, setOnce] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState(initialState);
  const [completePress, setCompletePress] = useState(false);
  const [hotPress, setHotPress] = useState(false);
  const [shopPress, setShopPress] = useState(false);
  const [holPress, setHolPress] = useState(false);
  const [hotData, setHotData] = useState([]);
  const [holData, setHolData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [endData, setEndData] = useState(ORI_DATA);
  const [currentPlace, setCurrentPlace] = useState();
  const onPressHandlerForComlete = () => {
    setCompletePress(true);
    setHotData(ORI_DATA);
    setHolData(ORI_DATA);
    setShopData(ORI_DATA);
    setEndData(END_DATA);
    //getCurrentLocation();
  }
  const onPressHandlerForHot = () => {
    setHotPress(!hotPress); //打開
  }
  const onPressHandlerForShop = () => {
    setShopPress(!shopPress); //打開
  }
  const onPressHandlerForHoliday = () => {
    setHolPress(!holPress); //打開
  }
  //取得當前位置
  const getCurrentLocation = () => {
    var positionOption = { timeout: 50000, enableHighAccuracy: true };
    Geolocation.getCurrentPosition(position => {
      setCurrentPlace({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      // const lat = position.coords.latitude;
      // const long = position.coords.longitude;
      // console.log(lat);
      // console.log(long);
    },
      console.log("wait second..."), positionOption)
  }

  //過濾導航線的點 最多抓20個點
  const getPositionArray = (array) => {
    const rt = [];
    const sz = array.length;
    var a = 1;
    if (sz > 20)
      a = sz / 20;
    var cnt = 0;
    array.map((i) => {
      cnt += 1;
      //rt.push({ lat: i.latitude, long: i.longitude })
      (cnt % a == 0) ? rt.push({ lat: i.latitude, lng: i.longitude }) : 1;
    })
    return rt;
  }

  const hotSet = new Set();
  const shopSet = new Set();
  const holSet = new Set();

  const getDis = (pos, place) => {
    rt = (pos.lat - place.location.lat) * (pos.lat - place.location.lat) + (pos.lng - place.location.lng) * (pos.lng - place.location.lng);
    return Math.sqrt(rt)
  }

  //算出附近的點
  const getPlace = (array) => {
    //1 -> 111km  0.1 -> 11km
    array.map((pos) => {
      for (i = 0; i < Holplace.length; i++) {
        if (holSet.has(Holplace[i].id))
          continue;
        if (getDis(pos, Holplace[i]) <= 0.3) {
          holData.push(Holplace[i]);
          holSet.add(Holplace[i].id);
        }
      }
      for (i = 0; i < Hotplace.length; i++) {
        if (hotSet.has(Hotplace[i].id) || holSet.has(Hotplace[i].id))
          continue;
        if (getDis(pos, Hotplace[i]) <= 0.3) {
          hotData.push(Hotplace[i]);
          hotSet.add(Hotplace[i].id);
        }
      }
      for (i = 0; i < Shopplace.length; i++) {
        if (shopSet.has(Shopplace[i].id) || hotSet.has(Shopplace[i].id) || holSet.has(Shopplace[i].id))
          continue;
        if (getDis(pos, Shopplace[i]) <= 0.3) {
          shopData.push(Shopplace[i]);
          shopSet.add(Shopplace[i].id);
        }
      }
    })
    console.log('ok')
    console.log(holData.length);
  }

  const SetData = (array) => {
    const PositionArray = getPositionArray(array);  //一般的fun
    //console.log(PositionArray);
    getPlace(PositionArray);
  }

  useEffect(() => {
    console.log("pupupupu");
    if (once) {
      getCurrentLocation();  //取得位置
      //const PositionArray = getPositionArray(MAIN_ROUTE_DATA);
      //getPlace(PositionArray);
    }
    //setOnce(false);
  }, [])

  const [myLatitudeDelta, setMyLatitudeDelta] = useState(1.2);

  return (
    <View style={styles.container}>

      {/*浮動視窗-------------------------------------------------------------------------------*/}
      <DetailForMap
        entry={modalEntry}//傳進去的資料參數
        modalVisible={modalVisible}//可不可見
        onClose={() => { setModalVisible(false); }}//關閉函式
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


      <MapView //todo:初始化位置 
        moveOnMarkerPress={false}
        //rotateEnabled
        //zoomEnabled
        onRegionChangeComplete={(e) => { setMyLatitudeDelta(e.latitudeDelta); console.log(e.latitudeDelta) }}
        //customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        //to do 取起終的中點
        initialRegion={{
          //23.8269823,120.737534
          latitude: 23.8269823,
          longitude: 120.737534,
          latitudeDelta: myLatitudeDelta, //數字越小 地圖道路越大
          longitudeDelta: 0,
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
          >
            <Image source={require('../../assets/pin/green.png')} />
          </Marker>
        ))}
        <MapViewDirections
          //optimizeWaypoints={true}
          //24.1365593,120.6835935
          origin={{ latitude: 24.1365593, longitude: 120.6835935 }} //to do抓當前位置
          destination={{ latitude: 23.517405, longitude: 120.7914543 }} //to do抓最遠目的地
          apikey={API_key}
          strokeWidth={3}
          strokeColor="#5f695d"
          onReady={(result) => {
            console.log("pol ready");
            if (once) {
              //console.log("nono");
              SetData(result.coordinates);
            }
            setOnce(false);
          }}
        />

        {(hotPress ? hotData : ORI_DATA).map((marker, index) => {
          if (marker.del >= myLatitudeDelta) {
            //console.log(myLatitudeDelta);
            return (
              <Marker
                tracksViewChanges={false}
                key={index}
                coordinate={{ latitude: marker.location.lat, longitude: marker.location.lng }}
                pinColor='red'
                //todo 簡介 按下變色
                onPress={(e) => {
                  setModalVisible(!modalVisible);
                  setModalEntry({
                    id: marker.place_id,
                    name: marker.name,
                    info: marker.info,
                    address: marker.myAddr,
                    star: marker.rating,
                    time: marker.opening_hours.map((i) => {
                      return i + '\n';
                    }),
                    city: marker.city,
                    region: marker.reg,
                    source: {
                      uri:
                        `https://maps.googleapis.com/maps/api/place/photo?photoreference=${marker.photo.photo_reference}&sensor=false&maxheight=${marker.photo.height}&maxwidth=${marker.photo.width}&key=${API_key}`
                    }
                  });
                  //marker.pinColor = 'green';  todo:他不是即時更新 method redraw
                  //console.log(marker.pinColor);
                }}
              >
                <View style={styles.markerCss}>
                  <Text style={styles.markerText}>{marker.name}</Text>
                  <Image style={styles.markerImg} source={require('../../assets/pin/red.png')} />
                </View>
              </Marker>)
          }
        })}

{(holPress ? holData : ORI_DATA).map((marker) => {
          if (marker.del >= myLatitudeDelta) {
          //  {
            return(
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.location.lat, longitude: marker.location.lng }}
            onPress={(e) => {
              console.log(marker.location.lat,",",marker.location.lng);
              setModalVisible(!modalVisible);
              setModalEntry({
                id: marker.place_id,
                name: marker.name,
                address: marker.myAddr,
                // star: marker.rating,
                info: marker.name,
                time: marker.opening_hours.map((i) => {
                  return i + '\n';
                }),
                city: marker.city,
                region: marker.reg,
                source: {
                  uri: marker.photo
                }
              });
            }}
          >
            <View style={styles.markerCss}>
              <Text style={styles.markerText}>{marker.name}</Text>
              <Image style={styles.markerImg} source={require('../../assets/pin/yellow.png')} />
            </View>
          </Marker>
            )}
          })}

        {(shopPress ? shopData : ORI_DATA).map((marker) => {
          if (marker.del >= myLatitudeDelta) {
            return (
              <Marker
                key={marker.id}
                coordinate={{ latitude: marker.location.lat, longitude: marker.location.lng }}
                pinColor='blue'
                title={marker.name}
                onPress={(e) => {
                  setModalVisible(!modalVisible);
                  setModalEntry({
                    id: marker.place_id,
                    name: marker.name,
                    address: marker.myAddr,
                    star: marker.rating,
                    info: marker.name,
                    time: marker.opening_hours.map((i) => {
                      return i + '\n';
                    }),
                    city: marker.city,
                    region: marker.reg,
                    source: {
                      uri:
                        `https://maps.googleapis.com/maps/api/place/photo?photoreference=${marker.photo.photo_reference}&sensor=false&maxheight=${marker.photo.height}&maxwidth=${marker.photo.width}&key=${API_key}`
                    }
                  });
                }}
              >
                <View style={styles.markerCss}>
                  <Text style={styles.markerText}>{marker.name}</Text>
                  <Image style={styles.markerImg} source={require('../../assets/pin/blue.png')} />
                </View>
              </Marker>
            )
          }
        }
        )}

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

      </MapView>
      <Callout>
        {/* <Back /> */}
        {/* <Refresh onPress={() => {
          console.log('refresh');
        }}></Refresh> */}
      </Callout>
    </View>
  );
}
const initialState = {
  "id": {},
  "name": {},
  "img": {},
  "address": {},
  "info": {},
}
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
export default Map; 