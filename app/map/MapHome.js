import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableHighlight,
  Image,
  alert
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { mapStyle } from './mapStyle';
import { ORI_DATA } from './OriData'; //空資料 -> 初始化
import DetailForMap from '../detail/DetailForMap';
import Back from './Back';
import CustomMarkerComponent from './CustomMarkerComponent';
import MapViewDirections from 'react-native-maps-directions';
import Hotplace from './Hotplace'
import Shopplace from './Shopplace'
import Holplace from './Holplace'
import Food from '../theme/Food'
import Hotel from '../theme/Hotel'
import KOL from '../theme/KOL'
import Monuments from '../theme/Monuments'
import Nature from '../theme/Nature'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
//import Hotplace from './tp'
//{ navigation, route }
const Stack = createNativeStackNavigator();

const MapHome = ({ navigation, route }) => {
  const NewNavigation = useNavigation();
  // console.log("haha:",route.params);
  const API_key = 'AIzaSyDHq53RuJ511QN4rLqFmwLWiXA1_-nR7vY'
  const [once, setOnce] = useState(true);    //控制只會一次線
  //顯示detail
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState(initialState);
  const [modalCanPress, setModalCanPress] = useState(true);
  const [modalIsAdd, setModalIsAdd] = useState(true);
  //各式按鈕
  const [hotPress, setHotPress] = useState(false);
  const [shopPress, setShopPress] = useState(false);
  const [holPress, setHolPress] = useState(false);
  //要顯示的資料marker
  const [hotData, setHotData] = useState([]);
  const [holData, setHolData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [endData, setEndData] = useState([]);
  //waypoint相關
  const [points, setPoints] = useState([]); //由direction產生的點
  const [waypoints, setWaypoints] = useState([]);
  //當前位置
  const [origin, setOri] = useState({ latitude: 24.1365593, longitude: 120.6835935 });
  const [mainRoute, setMainRoute] = useState([]);
  const [destination, setDes] = useState({ latitude: 24.1365593, longitude: 120.6835935 });
  const [initRegion, setInitRegion] = useState({ latitude: 24.1365593, longitude: 120.6835935, latitudeDelta: 4, longitudeDelta: 0 });
  const [myLatitudeDelta, setMyLatitudeDelta] = useState(3.8); //地圖縮放程度的變數
  const [south,setSouth] = useState(24.1365593);
  const [north,setNorth] = useState(24.1365593);
  const [west,setWest] = useState(120.6835935);
  const [east,setEast] = useState(120.6835935); 
  //console.log("選染 ",mySet);
  const onPressHandlerForComlete = () => {
    // console.log("距離: ", Math.sqrt((origin.latitude - destination.latitude) * (origin.latitude - destination.latitude) + (origin.longitude - destination.longitude) * (origin.longitude - destination.longitude)));
    try {
      var rt = [];
      var desSite;
      var ori = origin;
      (mainRoute).map((place) => {
        if (destination.latitude == place.lat) {
          desSite = {
            place_id: place.place_id,
            id: place.id,
            type: place.type
          };
        } else {
          rt.push({
            place_id: place.place_id,
            id: place.id,
            type: place.type
          });
        }
      })
      endData.map((i) => {
        rt.push({
          place_id: i.place_id,
          id: i.id,
          type: i.type
        });
      })
        NewNavigation.navigate("ItineraryHome", {
          tripname: "行程表",
          origin: ori,
          desSite: desSite,
          site: rt,
          from: "map",
        });
      
    } catch (error) {
      console.log(error);
      alert("伺服器發生錯誤，請檢查網路狀況或重新加載");
    }
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
  const addEndData = (data, isAdd) => {
    var tp = {};
    if (isAdd) {
      if (data.type === 'hot') {
        for (var i = 0; i < hotData.length; i++) {
          if (hotData[i].id === data.id) {
            tp = hotData[i];
            hotData.splice(i, 1);
            break;
          }
        }
      } else if (data.type === 'hol') {
        for (var i = 0; i < holData.length; i++) {
          if (holData[i].id === data.id) {
            tp = holData[i];
            holData.splice(i, 1);
            break;
          }
        }
      } else {
        for (var i = 0; i < shopData.length; i++) {
          if (shopData[i].id === data.id) {
            tp = shopData[i];
            shopData.splice(i, 1);
            break;
          }
        }
      }
      endData.push(tp);
    } else {
      for (var i = 0; i < endData.length; i++) {
        if (endData[i].id === data.id && endData[i].type === data.type) {
          if (data.type === "hot") hotData.push(endData[i]);
          else if (data.type === "hol") holData.push(endData[i]);
          else if (data.type === "shop") shopData.push(endData[i]);
          endData.splice(i, 1);
          break;
        }
      }
    }
  }

  //過濾導航線的點 最多抓20個點
  const getPositionArray = (array) => {
    const rt = [];
    const sz = array.length;
    var a = 1;
    if (sz > 30)
      a = Math.floor(sz / 20);
    var cnt = 0;
    array.map((ele) => {
      cnt += 1;
      (cnt % a == 0) ? rt.push({ lat: ele.latitude, lng: ele.longitude }) : 1;
    })
    return rt;
  }

  //找距離
  const getDis = (pos, place) => {
    var rt = (pos.lat - place.lat) * (pos.lat - place.lat) + (pos.lng - place.lng) * (pos.lng - place.lng);
    return Math.sqrt(rt)
  }
  //算出附近的點(範圍20km內) 1 -> 111km  0.1 -> 11km
  const getPlace = (array) => {
    const mySet = new Set(); //避免重複抓景點
    (mainRoute).map((mainR)=>{
      mySet.add(mainR.place_id);
      //console.log("0");
    })
    //console.log("1");
    setHolData(() => {
      //console.log("2");
      var tp = [];
      array.map((pos) => {
        for (var i = 0; i < Holplace.length; i++) {
          if (mySet.has(Holplace[i].place_id)) continue;
          if (getDis(pos, Holplace[i]) <= 0.2) {
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
        for (var i = 0; i < Hotplace.length; i++) {
          if (mySet.has(Hotplace[i].place_id)) continue;
          if (getDis(pos, Hotplace[i]) <= 0.2) {
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
        for (var i = 0; i < Shopplace.length; i++) {
          if (mySet.has(Shopplace[i].place_id)) continue;
          if (getDis(pos, Shopplace[i]) <= 0.2) {
            tp.push(Shopplace[i]);
            mySet.add(Shopplace[i].place_id);
          }
        }
      })
      return tp;
    })
  }
  //得到中間有哪些點後去找附近的景點(當導航線畫完才會觸發)
  // const SetData = (array) => {
  //   const PositionArray = getPositionArray(array);  //過濾島航線的點(回傳[{lat:  ,lng:  }])
  //   getPlace(PositionArray);  //用PositionArray去看附近有哪些景點
  // }

  useEffect(() => {
    //從theme的json抓取主路線資料
    //console.log("main,mypos useEffect");
    setMainRoute(() => {
      var data = [];
      const mySet = new Set();
      (route.params).map((param) => {
        if (!mySet.has(param.place_id)) {
          mySet.add(param.place_id);
          //console.log("param.place_id= "+param.place_id);
          if (param.type === "food") {
            data.push(Food[param.id]);
          } else if (param.type === "nature") {
            data.push(Nature[param.id]);
          } else if (param.type === "kol") {
            data.push(KOL[param.id]);
          } else if (param.type === "monuments") {
            data.push(Monuments[param.id]);
          } else if (param.type === "hotel") {
            data.push(Hotel[param.id]);
          }else if(param.type === "hot"){
            data.push(Hotplace[param.id]);
          }else if(param.type === "shop"){
            data.push(Shopplace[param.id]);
          }else if(param.type === "hol"){
            data.push(Holplace[param.id]);
          }
        }
      })
      //console.log(data);
      return data;
    })
    //設置自己的位子
    var positionOption = { timeout: 50000, enableHighAccuracy: true };  //抓當前位置
    Geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log(lat);
      console.log(lng);
      setEast(lng);
      setWest(lng);
      setSouth(lat);
      setNorth(lat);
      setOri({ latitude: lat, longitude: lng });
    }, console.log("wait second..."), positionOption);
  }, [])
  //當主路線或是ori改變時，更新最遠點和中間點還有初始視野
  useEffect(() => {
    //console.log("ori ", origin);
    setDes(() => {
      let des = { latitude: 24.1365593, longitude: 120.6835935 };
      let maxDis = -1;
      //console.log("main :",mainRoute.length);
      for (var i = 0; i < mainRoute.length; i++) {
        var nowDis = getDis({ lat: origin.latitude, lng: origin.longitude }, mainRoute[i]);
        if (nowDis > maxDis) {
          //console.log("in");
          des = { latitude: mainRoute[i].lat, longitude: mainRoute[i].lng };
          maxDis = nowDis;
        }
      }
      return des;
    });

    setEast(()=>{
      var rt = east;
      mainRoute.map((i)=>{
        if(i.lng < rt) rt = i.lng;
      })
      return rt;
    })

    setWest(()=>{
      var rt = west;
      mainRoute.map((i)=>{
        if(i.lng > rt) rt = i.lng;
      })
      return rt;
    })

    setNorth(()=>{
      var rt = north;
      mainRoute.map((i)=>{
        if(i.lat > rt) rt = i.lat;
      })
      return rt;
    })

    setSouth(()=>{
      try {
        var rt = south;
        mainRoute.map((i)=>{
          if(i.lat < rt) rt = i.lat;
        })
        return rt;
      } catch (error) {
        alert("伺服器發生錯誤，請檢查網路狀況或重新加載");
      }     
    })

  }, [origin, mainRoute])

  useEffect(() => {
    setWaypoints(() => {
      let way = [];
      for (var i = 0; i < mainRoute.length; i++) {
        if (destination.latitude == mainRoute[i].lat && destination.longitude == mainRoute[i].lng) continue;
        way.push({ latitude: mainRoute[i].lat, longitude: mainRoute[i].lng });
      }
      return way;
    });
  }, [destination])

  useEffect(()=>{
    setInitRegion(() => {
      //var longestDis = getDis({ lat: origin.latitude, lng: origin.longitude }, { lat: destination.latitude, lng: destination.longitude });
      //console.log(north," ",east," ",south," ",west);
      var longestDis = getDis({ lat: south, lng: east }, { lat: north, lng: west });
      var tp = 0;
      if (longestDis >= 2) {
        tp = 3.8;
      } else if (longestDis >= 1.5) {
        tp = 2.8;
      } else if (longestDis >= 0.9) {
        tp = 1.8;
      } else if (longestDis >= 0.5) {
        tp = 0.9;
      } else {
        tp = 0.4;
      }
      //console.log("long="+longestDis+" tp= ",tp);
      return {
        latitude: (south+north) / 2.0,
        longitude: (east+west) / 2.0,
        latitudeDelta: tp, //數字越小 地圖道路越大
        longitudeDelta: 0,
      }
    });
  },[north,south,west,east])

  useEffect(() => {
    //console.log("過濾島航線的點 useEffect");
    const PositionArray = getPositionArray(points);  //過濾島航線的點(回傳[{lat:  ,lng:  }])
    getPlace(PositionArray);  //用PositionArray去看附近有哪些景點
  }, [points])

  return (
    <View style={styles.container}>

      {/*浮動視窗-------------------------------------------------------------------------------*/}
      <DetailForMap
        entry={modalEntry}//傳進去的資料參數
        modalVisible={modalVisible}//可不可見
        onClose={() => { setModalVisible(false); }}//關閉函式
        onPress1={(data, isAdd) => {
          addEndData(data, isAdd);
          //console.log(data);
        }}
        canPress={modalCanPress}
        isAdd={modalIsAdd}
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
      >

        {(mainRoute).map((marker)=>{
          return( 
          <CustomMarkerComponent 
              key={marker.type + (marker.id).toString()}
              data = {marker}
              color = 'green'
              onPressHandler={(e) => {
                setModalCanPress(false);
                setModalVisible(!modalVisible);
                setModalEntry({
                  type: marker.type,
                  date: marker.date,
                  id: marker.id,
                  name: marker.name,
                  info: marker.info,
                  address: marker.address,
                  star: marker.star,
                  time: marker.time,
                  city: marker.city,
                  region: marker.region,
                });
              }}
          />
        )})}

        <MapViewDirections
          optimizeWaypoints={true}
          origin={origin}
          destination={destination}
          apikey={API_key}
          strokeWidth={3}
          strokeColor="#5f695d"
          onReady={(result) => {
            if (once) {
              setPoints(result.coordinates);
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
   {(hotPress ? hotData : ORI_DATA).map((marker) => {
          if (marker.del >= myLatitudeDelta) {
            return (
              <CustomMarkerComponent 
                key={marker.type + (marker.id).toString()}
                data = {marker}
                color = 'red'
                onPressHandler={(e) => {
                  setModalIsAdd(true);
                  setModalCanPress(true);
                  setModalVisible(!modalVisible);
                  setModalEntry({
                    type: marker.type,
                    id: marker.id,
                    name: marker.name,
                    info: marker.info,
                    address: marker.address,
                    star: marker.star,
                    time: marker.time,
                    city: marker.city,
                    region: marker.region,
                  });
                }}
          />
        )}
        })}
       

        {(holPress ? holData : ORI_DATA).map((marker) => {
          if (marker.del >= myLatitudeDelta) {
            return (
              <CustomMarkerComponent 
              key={marker.type + (marker.id).toString()}
              data = {marker}
              color = 'yellow'
              onPressHandler={(e) => {
                setModalIsAdd(true);
                setModalCanPress(true);
                setModalVisible(!modalVisible);
                setModalEntry({
                  type: marker.type,
                  id: marker.id,
                  name: marker.name,
                  address: marker.address,
                  id: marker.id,
                  star: 5,
                  info: marker.info,
                  date: marker.date,
                  time: marker.time,
                  city: marker.city,
                  region: marker.region,
                });
              }}
        />
            )
          }
        })}

        {(shopPress ? shopData : ORI_DATA).map((marker) => {
          if (marker.del >= myLatitudeDelta) {
            return (
              <CustomMarkerComponent 
              key={marker.type + (marker.id).toString()}
              data = {marker}
              color = 'blue'
              onPressHandler={(e) => {
                setModalIsAdd(true);
                  setModalCanPress(true);
                  setModalVisible(!modalVisible);
                  setModalEntry({
                    type: marker.type,
                    id: marker.id,
                    name: marker.name,
                    address: marker.address,
                    star: marker.star,
                    info: marker.info,
                    time: marker.time,
                    city: marker.city,
                    region: marker.region,
                  });
              }}
        />
            )
          }
        }
        )}

        {(endData).map((marker) => {
          return (
            <CustomMarkerComponent 
              key={marker.type + (marker.id).toString()}
              data = {marker}
              color = 'green'
              onPressHandler={(e) => {
                setModalIsAdd(false);
                setModalVisible(!modalVisible);
                setModalEntry({
                  type: marker.type,
                  id: marker.id,
                  name: marker.name,
                  address: marker.address,
                  star: marker.star,
                  info: marker.info,
                  date: marker.date,
                  time:marker.time,
                  city: marker.city,
                  region: marker.region,

                });
              }}
        />
            // <Marker
            //   key={marker.type + (marker.id).toString()}
            //   coordinate={{ latitude: marker.location.lat, longitude: marker.location.lng }}
            //   onPress={(e) => {
            //     setModalIsAdd(false);
            //     setModalVisible(!modalVisible);
            //     setModalEntry({
            //       type: marker.type,
            //       id: marker.id,
            //       name: marker.name,
            //       address: marker.address,
            //       star: marker.star,
            //       info: marker.info,
            //       date: marker.date,
            //       time:
            //         marker.time.map((ti) => {
            //           return ti + '\n';
            //         }),
            //       city: marker.city,
            //       region: marker.region,

            //     });
            //   }}
            // >
            //   <View style={styles.markerCss}>
            //     <Text style={styles.markerText}>{marker.name}</Text>
            //     <Image style={styles.markerImg} source={require('../../assets/pin/green.png')} />
            //   </View>
            // </Marker>
          )

        }
        )}

      </MapView>
      {/* 放在地圖的組件 */}
      <Callout style={styles.callout}>
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
          onPress={
            onPressHandlerForComlete
          }
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
  markerImg: {
    // width:40,
    // height:40,
  },
  callout: {
    flex: 1,
    flexDirection: "column"
  },
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
    //zIndex: 3,
    //position: 'absolute',
    top: Dimensions.get('window').height / 2 - 130,
    backgroundColor: '#5f695d',
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonForHot: {
    //zIndex: 2,
    left: -Dimensions.get('window').width / 2 + 70,
    //position: 'absolute',
    top: -Dimensions.get('window').height / 2 + 130,
    backgroundColor: '#FF9797',
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonHoliday: {
    //zIndex: 2,
    left: -Dimensions.get('window').width / 2 + 70,
    //position: 'absolute',
    top: -Dimensions.get('window').height / 2 + 130,
    backgroundColor: '#FFFFB9',
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonForShop: {
    //zIndex: 2,
    left: -Dimensions.get('window').width / 2 + 70,
    //position: 'absolute',
    top: -Dimensions.get('window').height / 2 + 130,
    backgroundColor: '#D9FFFF',
    //#C4E1FF
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