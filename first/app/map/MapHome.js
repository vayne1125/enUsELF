import React, { useState, useEffect, useLayoutEffect } from 'react';
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
//import { MAIN_ROUTE_DATA } from './MainRoute'; //主路線的資料
import { ORI_DATA } from './OriData'; //空資料 -> 初始化
import DetailForMap from '../detail/DetailForMap';
import Back from './Back';
import MapViewDirections from 'react-native-maps-directions';
import Hotplace from './Hotplace'
import Shopplace from './Shopplace'
import Holplace from './Holplace'
import { useNavigation } from '@react-navigation/native';
import { max } from 'date-fns';
//import Hotplace from './tp'
const MapHome = ({ navigation, route }) => {
  const API_key = 'AIzaSyDHq53RuJ511QN4rLqFmwLWiXA1_-nR7vY'
  const [once, setOnce] = useState(true);
  //顯示detail
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState(initialState);
  //各式按鈕
  const [completePress, setCompletePress] = useState(false);
  const [hotPress, setHotPress] = useState(false);
  const [shopPress, setShopPress] = useState(false);
  const [holPress, setHolPress] = useState(false);
  //要顯示的資料marker
  const [hotData, setHotData] = useState([]);
  const [holData, setHolData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [endData, setEndData] = useState([]);
  const [waypoints, setWaypoints] = useState([]);
  //當前位置
  let currentPlace = {};
  const [origin, setOri] = useState({ latitude: 24.1365593, longitude: 120.6835935 })
  const [addWaypoint, setAdd] = useState([]);
  const [mainRoute, setMainRoute] = useState([]);
  const [destination, setDes] = useState({ latitude: 0, longitude: 0 });
  const onPressHandlerForComlete = () => {
    setCompletePress(true);
    setHotData(ORI_DATA);
    setHolData(ORI_DATA);
    setShopData(ORI_DATA);
    setWaypoints(addWaypoint);
    console.log(addWaypoint);
    navigation.navigate("ItineraryHome");
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

  //過濾導航線的點 最多抓20個點
  const getPositionArray = (array) => {
    const rt = [];
    const sz = array.length;
    var a = 1;
    if (sz > 30)
      a = Math.floor(sz / 20);
    var cnt = 0;
    array.map((i) => {
      cnt += 1;
      //rt.push({ lat: i.latitude, long: i.longitude })
      (cnt % a == 0) ? rt.push({ lat: i.latitude, lng: i.longitude }) : 1;
    })
    //console.log("getPositionArray ",rt);
    return rt;
  }

  //避免重複抓景點
  const mySet = new Set();

  //找距離
  const getDis = (pos, place) => {
    rt = (pos.lat - place.lat) * (pos.lat - place.lat) + (pos.lng - place.lng) * (pos.lng - place.lng);
    return Math.sqrt(rt)
  }

  //算出附近的點
  const getPlace = (array) => {

    mainRoute.map((place) => {
      mySet.add(place.place_id);
    })
    //1 -> 111km  0.1 -> 11km
    array.map((pos) => {
      for (i = 0; i < Holplace.length; i++) {
        if (mySet.has(Holplace[i].place_id))
          continue;
        if (getDis(pos, Holplace[i].location) <= 0.2) {
          holData.push(Holplace[i]);
          mySet.add(Holplace[i].place_id);
        }
      }
      for (i = 0; i < Hotplace.length; i++) {
        if (mySet.has(Hotplace[i].place_id))
          continue;
        if (getDis(pos, Hotplace[i].location) <= 0.2) {
          hotData.push(Hotplace[i]);
          mySet.add(Hotplace[i].place_id);
        }
      }
      for (i = 0; i < Shopplace.length; i++) {
        if (mySet.has(Shopplace[i].place_id))
          continue;
        if (getDis(pos, Shopplace[i].location) <= 0.2) {
          shopData.push(Shopplace[i]);
          mySet.add(Shopplace[i].place_id);
        }
      }
    })
    console.log('ok')
  }

  //得到中間有哪些點後去找附近的景點
  const SetData = (array) => {
    //console.log("array ",array);
    const PositionArray = getPositionArray(array);  //一般的fun
    //console.log(PositionArray);
    getPlace(PositionArray);
  }

  //重新渲染畫面也不會改的
  useEffect(() => {
    var positionOption = { timeout: 50000, enableHighAccuracy: true };
    Geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      console.log(lat);
      console.log(long);
      setOri(position.coords);
      //currentPlace = { lat: lat, lng: long };
    }, console.log("wait second..."), positionOption)

    let data = route.params;        //購物車的參數
    let maxDis = -1, index = 0;
    let des = {};
    let way = [];
    for (i = 0; i < data.length; i++) {
      var tp = { lat: data[i].pos[0], lng: data[i].pos[1] };
      var nowDis = getDis({ lat: origin.latitude, lng: origin.longitude }, tp);
      if (nowDis > maxDis) {
        des = { latitude: data[i].pos[0], longitude: data[i].pos[1] };
        index = i;
        maxDis = nowDis;
      }
    }
    for (i = 0; i < data.length; i++) {
      if (i == index) continue;
      way.push({ latitude: data[i].pos[0], longitude: data[i].pos[1] });
    }
    console.log("des: ", des); //destination 
    console.log("way: ", way);   //destination

    setDes(des);
    setMainRoute(route.params);
    setWaypoints(way);

    console.log("des: ", des); //destination 
    console.log("way: ", way);   //destination
  }, [route.params])

  const [myLatitudeDelta, setMyLatitudeDelta] = useState(1.2); //to do根據起終點決定數值
  return (
    <View style={styles.container}>

      {/*浮動視窗-------------------------------------------------------------------------------*/}
      <DetailForMap
        entry={modalEntry}//傳進去的資料參數
        modalVisible={modalVisible}//可不可見
        onClose={() => { setModalVisible(false); }}//關閉函式
        onPress1={(data) => {
          if (data.id.substr(0, 3) === 'hot') {
            for (i = 0; i < hotData.length; i++) {
              if (hotData[i].id === data.id) {
                hotData.splice(i, 1);
                break;
              }
            }
          } else if (data.id.substr(0, 3) === 'hol') {
            for (i = 0; i < holData.length; i++) {
              if (holData[i].id === data.id) {
                holData.splice(i, 1);
                break;
              }
            }
          } else {
            for (i = 0; i < shopData.length; i++) {
              if (shopData[i].id === data.id) {
                shopData.splice(i, 1);
                break;
              }
            }
          }
          addWaypoint.push({ latitude: data.location.lat, longitude: data.location.lng });
          endData.push(data);
        }}
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
        onRegionChangeComplete={(e) => { setMyLatitudeDelta(e.latitudeDelta); }}
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
        {(mainRoute).map((marker, index) => (
          <Marker
            tracksViewChanges={false}
            key={index}
            coordinate={{ latitude: marker.pos[0], longitude: marker.pos[1] }}
            onPress={(e) => {
              console.log("k");
              //setModalVisible(!modalVisible);
              // setModalEntry({
              //   location: marker.location,
              //   id: marker.id,
              //   name: marker.name,
              //   info: marker.info,
              //   address: marker.myAddr,
              //   star: marker.rating,
              //   time: marker.opening_hours.map((i) => {
              //     return i + '\n';
              //   }),
              //   city: marker.city,
              //   region: marker.reg,
              //   source: {
              //     uri:
              //       `https://maps.googleapis.com/maps/api/place/photo?photoreference=${marker.photo.photo_reference}&sensor=false&maxheight=${marker.photo.height}&maxwidth=${marker.photo.width}&key=${API_key}`
              //   }
              // });
            }}
          >
            <View style={styles.markerCss}>
              <Text style={styles.markerText}>{marker.name}</Text>
              <Image style={styles.markerImg} source={require('../../assets/pin/green.png')} />
            </View>
          </Marker>
        ))}


        <MapViewDirections
          //optimizeWaypoints={true}
          //24.1365593,120.6835935
          //{ latitude: 24.1365593, longitude: 120.6835935 }
          //{ latitude: 23.517405, longitude: 120.7914543 }
          origin={origin} //to do抓當前位置
          destination={destination}
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
          waypoints={waypoints}
        />
        <Marker
          pinColor='tan'
          tracksViewChanges={false}
          coordinate={origin}
          title="你的位置"
        />

        {(hotPress ? hotData : ORI_DATA).map((marker, index) => {
          if (marker.del >= myLatitudeDelta) {
            //console.log(myLatitudeDelta);
            return (
              <Marker
                tracksViewChanges={false}
                key={marker.id}
                coordinate={{ latitude: marker.location.lat, longitude: marker.location.lng }}
                onPress={(e) => {
                  setModalVisible(!modalVisible);
                  setModalEntry({
                    location: marker.location,
                    id: marker.id,
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
            return (
              <Marker
                key={marker.id}
                coordinate={{ latitude: marker.location.lat, longitude: marker.location.lng }}
                onPress={(e) => {
                  setModalVisible(!modalVisible);
                  setModalEntry({
                    id: marker.id,
                    name: marker.name,
                    address: marker.myAddr,
                    location: marker.location,
                    id: marker.id,
                    star: 0,
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
            )
          }
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
                    location: marker.location,
                    id: marker.id,
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

        {(endData).map((marker) => {
          if (1) {
            return (
              <Marker
                key={marker.id}
                coordinate={{ latitude: marker.location.lat, longitude: marker.location.lng }}
                title={marker.name}
                onPress={(e) => {
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
                    source: marker.source,
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

        }
        )}

      </MapView>
      <Callout>
        <Back />
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
export default MapHome; 