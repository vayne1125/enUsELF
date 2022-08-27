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
import { ORI_DATA } from './OriData'; //空資料 -> 初始化
import DetailForMap from '../detail/DetailForMap';
import Back from './Back';
import MapViewDirections from 'react-native-maps-directions';
import Hotplace from './Hotplace'
import Shopplace from './Shopplace'
import Holplace from './Holplace'
import ThemedImage from '@rneui/themed/dist/Image';
//import Hotplace from './tp'
const MapHome = ({ navigation, route }) => {
  //console.log(route.params);
  const API_key = 'AIzaSyDHq53RuJ511QN4rLqFmwLWiXA1_-nR7vY'
  const [once, setOnce] = useState(true);    //控制只會一次線
  const [once2, setOnce2] = useState(true);  //控制地圖起點顯示
  //顯示detail
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState(initialState);
  const [modalCanPress, setModalCanPress] = useState(true);
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
  const [origin, setOri] = useState({ latitude: 24.1365593, longitude: 120.6835935 })
  const [addWaypoint, setAdd] = useState([]);
  const [mainRoute, setMainRoute] = useState([]);
  const [destination, setDes] = useState({ latitude: 0, longitude: 0 });
  const [initRegion, setInitRegion] = useState({ latitude: 24.1365593, longitude: 120.6835935, latitudeDelta: 4, longitudeDelta: 0 });
  const [myLatitudeDelta, setMyLatitudeDelta] = useState(3.8); //地圖縮放程度的變數


  //伸蓉這個事件
  const onPressHandlerForComlete = () => {
    setCompletePress(true);


    //-----------------------------不重要的
    // setHotData(ORI_DATA);
    // setHolData(ORI_DATA);
    // setShopData(ORI_DATA);
    // setWaypoints(addWaypoint);
    // console.log(addWaypoint);
    //console.log(initRegion);
    //console.log(endData);
    //console.log(route.params);
    //console.log("距離: ", Math.sqrt((origin.latitude - destination.latitude) * (origin.latitude - destination.latitude) + (origin.longitude - destination.longitude) * (origin.longitude - destination.longitude)));
    //-----------------------------




    //伸蓉看這裡!!!!!!!!!!!!!!!
    //存變數名稱用左邊的 <ex>mainRoute , endRoute .....
    console.log("mainRoute: ", mainRoute);
    console.log("endRoute: ", endData);
    console.log("waypoints: ", waypoints.concat(addWaypoint));
    console.log("origin: ", origin);
    console.log("destination: ", destination);
    console.log("region: ", initRegion);

    navigation.navigate("ItineraryHome", {
      mainRoute: mainRoute,  //[{},{},.....]
      /*
      {"city": "xxxxx", 
       "info": "xxxxx", 
       "location": {"lat": 25.0731088, "lng": 121.5155703}, 
       "address": "103台灣台北市大同區哈密街61號", 
       "name": "大龍峒保安宮", 
       "time": 
       ["星期一: 06:30 – 21:00
        星期二: 06:30 – 21:00
        星期三: 06:30 – 21:00
        星期四: 06:30 – 21:00
        星期五: 06:30 – 21:00
        星期六: 06:30 – 21:00
        星期日: 06:30 – 21:00"],  //這是字串陣列(只有一個字串的陣列)
      "place_id": "ChIJoWFCL2qpQjQRPOoT7nFV3YU", 
      "star": 4.6, 
      "reg": "大同區"
      }
      */
      endRoute: endData,//[{},{}]
      /*
      {
      "address": "台灣苗栗縣後龍鎮半天寮", 
      "city": "苗栗縣", 
      "id": "hot75", 
      "info": "xxxx", 
      "location": {"lat": 24.601974, "lng": 120.731191}, 
      "name": "後龍鎮半天寮休閒文化園區", 
      "region": "後龍鎮", 
      "source": 
        { 
          "uri": "https://maps.googleapis.com/maps/api/place/photo?photoreference=AeJbb3dAM2GC3nY_7mGglNkzLIFunFVnJgzGr65syILYMDuEqFEiVwgevgSpCRi-aKGvreH36gtrTFxt356_n7pM_dUK0g7m58lcVRwHJLGRgRRUu3yb_kz6MXzL1AwQWqne6graEwS8AiH1rGypEeTeomoK2SoSLTFgwBta7ZD81wJFhGDL&sensor=false&maxheight=1081&maxwidth=1440&key=AIzaSyDHq53RuJ511QN4rLqFmwLWiXA1_-nR7vY"
        },   
      "star": 4.3, 
      "time": 
        ["星期一: 24 小時營業", 
         "星期二: 24 小時營業",
         "星期三: 24 小時營業", 
         "星期四: 24 小時營業",
         "星期五: 24 小時營業",
         "星期六: 24 小時營業", 
         "星期日: 24 小時營業"]    //這是字串陣列(7個字串)
        }
      */
      waypoints: waypoints.concat(addWaypoint),//[{},{}]
      /*
        {
          "latitude": 24.49772399999999,
          "longitude": 121.5350318
        }
      */
      origin: origin,//{}
      /*
      {
          "latitude": 24.49772399999999,
          "longitude": 121.5350318
      }
      */
      destination: destination,//{}
      /*
      {
          "latitude": 24.49772399999999,
          "longitude": 121.5350318
      }
      */
      region: initRegion//{}
      /* 
      {
        "latitude": 23.867910433333336, 
        "latitudeDelta": 3.8, 
        "longitude": 120.98405048333333, 
        "longitudeDelta": 0}
      */
    });
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
      (cnt % a == 0) ? rt.push({ lat: i.latitude, lng: i.longitude }) : 1;
    })
    return rt;
  }

  //避免重複抓景點
  const mySet = new Set();

  //找距離
  const getDis = (pos, place) => {
    rt = (pos.lat - place.lat) * (pos.lat - place.lat) + (pos.lng - place.lng) * (pos.lng - place.lng);
    return Math.sqrt(rt)
  }

  //算出附近的點(範圍20km內) 1 -> 111km  0.1 -> 11km
  const getPlace = (array) => {

    setHolData(() => {
      var tp = [];
      array.map((pos) => {
        for (i = 0; i < Holplace.length; i++) {
          if (mySet.has(Holplace[i].place_id)) continue;
          if (getDis(pos, Holplace[i].location) <= 0.2) {
            tp.push(Holplace[i]);
            mySet.add(Holplace[i].place_id);
          }
        }
      })
      return tp;
    })

    setHotData(() => {
      var tp = [];
      array.map((pos) => {
        for (i = 0; i < Hotplace.length; i++) {
          if (mySet.has(Hotplace[i].place_id)) continue;
          if (getDis(pos, Hotplace[i].location) <= 0.2) {
            tp.push(Hotplace[i]);
            mySet.add(Hotplace[i].place_id);
          }
        }
      })
      return tp;
    })

    setShopData(() => {
      var tp = [];
      array.map((pos) => {
        for (i = 0; i < Shopplace.length; i++) {
          if (mySet.has(Shopplace[i].place_id)) continue;
          if (getDis(pos, Shopplace[i].location) <= 0.2) {
            tp.push(Shopplace[i]);
            mySet.add(Shopplace[i].place_id);
          }
        }
      })
      return tp;
    })
  }


  //得到中間有哪些點後去找附近的景點(當導航線畫完才會觸發)
  const SetData = (array) => {
    const PositionArray = getPositionArray(array);  //過濾島航線的點(回傳[{lat:  ,lng:  }])
    getPlace(PositionArray);  //用PositionArray去看附近有哪些景點
  }

  //重新渲染畫面也不會改的
  useEffect(() => {
    setMainRoute(route.params);

    mainRoute.map((place) => {       //購物車和我重複地點消除
      mySet.add(place.place_id);
    })

    var positionOption = { timeout: 50000, enableHighAccuracy: true };  //抓當前位置
    Geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log(lat);
      console.log(lng);
      setOri({ latitude: lat, longitude: lng });
    }, console.log("wait second..."), positionOption);

  }, [])


  useEffect(() => {
    console.log("ori ", origin);

    let data = route.params;
    let maxDis = -1, index = 0;

    setDes(() => {
      let des = {};
      for (i = 0; i < data.length; i++) {
        var nowDis = getDis({ lat: origin.latitude, lng: origin.longitude }, data[i].location);
        if (nowDis > maxDis) {
          des = { latitude: data[i].location.lat, longitude: data[i].location.lng };
          index = i;
          maxDis = nowDis;
        }
      }
      return des;
    });

    //找離當前位置最遠的點，並看中間經過誰，傳給map顯示
    setWaypoints(() => {
      let way = [];
      for (i = 0; i < data.length; i++) {
        if (i == index) continue;
        way.push({ latitude: data[i].location.lat, longitude: data[i].location.lng });
      }
      return way;
    });

    //console.log("way: ",waypoints);

    setInitRegion(() => {
      var longestDis = getDis({ lat: origin.latitude, lng: origin.longitude }, { lat: destination.latitude, lng: destination.longitude });
      var tp = 0;
      if (longestDis >= 2) {
        tp = 3.8;
      } else if (longestDis >= 1.5) {
        tp = 2.8;
      } else if (longestDis >= 0.5) {
        tp = 0.9;
      } else {
        tp = 0.4;
      }
      return {
        latitude: (destination.latitude + origin.latitude) / 2.0,
        longitude: (destination.longitude + origin.longitude) / 2.0,
        latitudeDelta: tp, //數字越小 地圖道路越大
        longitudeDelta: 0,
      }
    });
  }, [origin])

  return (
    <View style={styles.container}>

      {/*浮動視窗-------------------------------------------------------------------------------*/}
      <DetailForMap
        entry={modalEntry}//傳進去的資料參數
        modalVisible={modalVisible}//可不可見
        onClose={() => { setModalVisible(false); }}//關閉函式
        onPress1={(data) => {
          console.log(data);
          var tp = {};
          if (data.id.substr(0, 3) === 'hot') {
            for (i = 0; i < hotData.length; i++) {
              if (hotData[i].id === data.id) {
                tp = hotData[i];
                hotData.splice(i, 1);
                break;
              }
            }
          } else if (data.id.substr(0, 3) === 'hol') {
            for (i = 0; i < holData.length; i++) {
              if (holData[i].id === data.id) {
                tp = holData[i];
                holData.splice(i, 1);
                break;
              }
            }
          } else {
            for (i = 0; i < shopData.length; i++) {
              if (shopData[i].id === data.id) {
                tp = shopData[i];
                shopData.splice(i, 1);
                break;
              }
            }
          }
          addWaypoint.push({ latitude: data.location.lat, longitude: data.location.lng });
          endData.push(tp);
        }}
        canPress={modalCanPress}
      />
      {/*浮動視窗-------------------------------------------------------------------------------*/}


      <MapView
        moveOnMarkerPress={false}
        loadingEnabled={true}
        onRegionChangeComplete={(e) => { setMyLatitudeDelta(e.latitudeDelta); }}
        //customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        region={initRegion}
        mapType="standard"
        onMapReady={() => {

        }}
      >


        {/*market of main Route */}
        {(mainRoute).map((marker, index) => (
          <Marker
            //pinColor='green'
            tracksViewChanges={false}
            key={"main" + index.toString()}
            coordinate={{ latitude: marker.location.lat, longitude: marker.location.lng }}
            onPress={(e) => {
              setModalCanPress(false);
              setModalVisible(!modalVisible);
              setModalEntry({
                location: marker.location,
                name: marker.name,
                info: marker.info,
                address: marker.address,
                star: marker.star,
                time: marker.time.map((i) => {
                  return i + '\n';
                }),
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
        ))}


        <MapViewDirections
          optimizeWaypoints={true}
          origin={origin}
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
            console.log("way: ", waypoints);
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
                  setModalCanPress(true);
                  setModalVisible(!modalVisible);
                  setModalEntry({
                    location: marker.location,
                    id: marker.id,
                    name: marker.name,
                    info: marker.info,
                    address: marker.address,
                    star: marker.star,
                    time: marker.time.map((i) => {
                      return i + '\n';
                    }),
                    city: marker.city,
                    region: marker.region,
                    source: {
                      uri:
                        `https://maps.googleapis.com/maps/api/place/photo?photoreference=${marker.photo.photo_reference}&sensor=false&maxheight=${marker.photo.height}&maxwidth=${marker.photo.width}&key=${API_key}`
                    }
                  });
                }}
              >
                <View style={styles.markerCss}>
                  <Text style={styles.markerText}>{marker.name}</Text>
                  <Image source={require('../../assets/pin/red.png')} />
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
                  setModalCanPress(true);
                  setModalVisible(!modalVisible);
                  setModalEntry({
                    id: marker.id,
                    name: marker.name,
                    address: marker.address,
                    location: marker.location,
                    id: marker.id,
                    star: 0,
                    info: marker.name,
                    time: marker.time.map((i) => {
                      return i + '\n';
                    }),
                    city: marker.city,
                    region: marker.region,
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
                onPress={(e) => {
                  setModalCanPress(true);
                  setModalVisible(!modalVisible);
                  setModalEntry({
                    location: marker.location,
                    id: marker.id,
                    name: marker.name,
                    address: marker.address,
                    star: marker.star,
                    info: marker.name,
                    time: marker.time.map((i) => {
                      return i + '\n';
                    }),
                    city: marker.city,
                    region: marker.region,
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
          return (
            <Marker
              key={marker.id}
              coordinate={{ latitude: marker.location.lat, longitude: marker.location.lng }}
              onPress={(e) => {
                setModalVisible(!modalVisible);
                setModalEntry({
                  location: marker.location,
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
        )}

      </MapView>
      {/* 放在地圖的組件 */}
      <Callout>
        <Back />
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
    zIndex: 3,
    //position: 'absolute',
    top: 330,
    backgroundColor: '#5f695d',
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonForHot: {
    zIndex: 2,
    left: -120,
    position: 'absolute',
    top: -270,
    backgroundColor: '#FF9797',
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonHoliday: {
    zIndex: 2,
    left: -120,
    position: 'absolute',
    top: -220,
    backgroundColor: '#FFFFB9',
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonForShop: {
    zIndex: 2,
    left: -120,
    position: 'absolute',
    top: -170,
    backgroundColor: '#C4E1FF',
    width: 120,
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