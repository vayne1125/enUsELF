import React, { useState, useEffect,useContext, useLayoutEffect } from 'react';
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
import Settripname from './Settripname';
import Back from './Back';
import MapViewDirections from 'react-native-maps-directions';
import Hotplace from './Hotplace'
import Shopplace from './Shopplace'
import Holplace from './Holplace'
import Food from '../theme/Food'
import Hotel from '../theme/Hotel'
import KOL from '../theme/KOL'
import Monuments from '../theme/Monuments'
import Nature from '../theme/Nature'
import {AuthContext} from '../routes/AutoProvider';
import firestore from '@react-native-firebase/firestore';

//import Hotplace from './tp'
const MapHome = ({ navigation, route }) => {
  ////console.log(route.params);
  const API_key = 'AIzaSyDHq53RuJ511QN4rLqFmwLWiXA1_-nR7vY'
  const [once, setOnce] = useState(true);    //控制只會一次線
  //顯示detail
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState(initialState);
  const [modalCanPress, setModalCanPress] = useState(true);
  //顯示取名字
  const [modalVisibleForName,setModalVisibleForName] = useState(false);
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
  const [destination, setDes] = useState({ latitude: 24.1365593, longitude: 120.6835935 });
  const [initRegion, setInitRegion] = useState({ latitude: 24.1365593, longitude: 120.6835935, latitudeDelta: 4, longitudeDelta: 0 });
  const [myLatitudeDelta, setMyLatitudeDelta] = useState(3.8); //地圖縮放程度的變數
  
  const [desSite,setDesSite] = useState({}); //終點
  const [size,setSize]=useState(0);
  const {user, logout} = useContext(AuthContext);//user uid
  //伸蓉這個事件
  const onPressHandlerForComlete = () => {
    setCompletePress(true);
    //-----------------------------不重要的
    // setHotData(ORI_DATA);
    // setHolData(ORI_DATA);
    // setShopData(ORI_DATA);
    // setWaypoints(addWaypoint);
    // console.log(addWaypoint);
    // console.log(initRegion);
    // console.log(endData);
    // console.log(route.params);
    // console.log("距離: ", Math.sqrt((origin.latitude - destination.latitude) * (origin.latitude - destination.latitude) + (origin.longitude - destination.longitude) * (origin.longitude - destination.longitude)));
    //-----------------------------
    firestore()
        .collection('users')
        .doc(user.uid)
        .collection('trip')
        .get()
        .then((querySnapshot)=>{
        setSize(querySnapshot.size);
          })
    console.log('size= ',size);
    setModalVisibleForName(true);
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
  const navToFinal = (tripname) =>{
    var rt = [];
    for(i = 0;i<mainRoute.length;i++){
      if(destination.latitude == mainRoute[i].lat && destination.longitude == mainRoute[i].lng){
        continue;
      }
      rt.push({
        place_id: mainRoute[i].place_id,
        id: mainRoute[i].id,
        type: mainRoute[i].type
      });
    }
    endData.map((i)=>{
      rt.push({
        place_id: i.place_id,
        id: i.id,
        type: i.type
      });
    })
    //伸蓉這邊是要的
    console.log("tripname: ",tripname);
    console.log("origin: ",origin);
    console.log("desSite: ",desSite);
    console.log("site: ",rt);
<<<<<<< HEAD
    const users = firestore().collection('users').doc(user.uid);
    users.collection('trip').doc(tripname)
    .set({
        name: tripname,
        origin:origin,
        desSite: desSite,
        site:rt,
    }).then(()=>{
        console.log('trip add !');
        //Alert.alert("成功發布");
        
      }).catch((error)=>{
        console.log('trip Failed!',error);
      });

  //下面註解是跳轉
=======
    //下面註解是跳轉
>>>>>>> 0d1642a1c560279f37996f116e25227a0d02e3b1
    
    navigation.navigate("ItineraryHome", {
      tripname:tripname,
      origin:origin,
      desSite:desSite,
      site:rt
    });
    
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
        for (var i = 0; i < Holplace.length; i++) {
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
        for (var i = 0; i < Hotplace.length; i++) {
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
  useEffect(() => {
    //從theme的json抓取主路線資料
    setMainRoute(()=>{           
      var data = [];
      (route.params).map((param)=>{
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
    //設置自己的位子
    var positionOption = { timeout: 50000, enableHighAccuracy: true };  //抓當前位置
    Geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log(lat);
      console.log(lng);
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
          ////console.log("in");
          des = { latitude: mainRoute[i].lat, longitude: mainRoute[i].lng };
          maxDis = nowDis;
        }
      }
      return des;
    });
    setDesSite(()=>{
      for(var i = 0;i<mainRoute.length;i++){
        if(destination.latitude == mainRoute[i].lat && destination.longitude == mainRoute[i].lng){
          return {
            place_id: mainRoute[i].place_id,
            id: mainRoute[i].id,
            type: mainRoute[i].type
          }
        }
      }
    })
  }, [origin,mainRoute])
  useEffect(()=>{
    setWaypoints(() => {
      let way = [];
      for (var i = 0; i < mainRoute.length; i++) {
        if (destination.latitude == mainRoute[i].lat && destination.longitude == mainRoute[i].lng) continue;
        way.push({ latitude: mainRoute[i].lat, longitude: mainRoute[i].lng });
      }
      return way;
    });
    setInitRegion(() => {
      var longestDis = getDis({ lat: origin.latitude, lng: origin.longitude }, { lat: destination.latitude, lng: destination.longitude });
      var tp = 0;
      if (longestDis >= 2) {
        tp = 3.8;
      } else if (longestDis >= 1.5) {
        tp = 2.8;
      } else if(longestDis >= 1){
        tp = 1.8;
      }else if (longestDis >= 0.5) {
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
  },[destination])

  return (
    <View style={styles.container}>

      <Settripname
        modalVisible = {modalVisibleForName}
        size = {size}
        onClose = {() => { setModalVisibleForName(false); }}
        completePress = { (tripname) => {navToFinal(tripname)}}
      />

      {/*浮動視窗-------------------------------------------------------------------------------*/}
      <DetailForMap
        entry={modalEntry}//傳進去的資料參數
        modalVisible={modalVisible}//可不可見
        onClose={() => { setModalVisible(false); }}//關閉函式
        onPress1={(data) => {
          //console.log(data);
          var tp = {};
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
          addWaypoint.push({ latitude: data.lat, longitude: data.lng });
          endData.push(tp);
        }}
        canPress={modalCanPress}
      />
      {/*浮動視窗-------------------------------------------------------------------------------*/}


      <MapView
        moveOnMarkerPress={false}
        loadingEnabled={true}
        onRegionChangeComplete={(e) => { setMyLatitudeDelta(e.latitudeDelta); }}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        region={initRegion}
        mapType="standard"
      >
        {(mainRoute).map((marker, index) => (
          <Marker
            //pinColor='green'
            tracksViewChanges={false}
            key={marker.type + (marker.id).toString()}
            coordinate={{ latitude: marker.lat, longitude: marker.lng }}
            onPress={(e) => {
              setModalCanPress(false);
              setModalVisible(!modalVisible);
              setModalEntry({
                name: marker.name,
                info: marker.info,
                address: marker.address,
                star: marker.star,
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
        ))}


        <MapViewDirections
          optimizeWaypoints={true}
          origin={origin}
          destination={destination}
          apikey={API_key}
          strokeWidth={3}
          strokeColor="#5f695d"
          onReady={(result) => {
            //console.log("pol ready");
            if (once) {
              ////console.log("nono");
              SetData(result.coordinates);
            }
            setOnce(false);
            ////console.log("way: ", waypoints);
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
            ////console.log(myLatitudeDelta);
            return (
              <Marker
                tracksViewChanges={false}
                key={marker.type + (marker.id).toString()}
                coordinate={{ latitude: marker.location.lat, longitude: marker.location.lng }}
                onPress={(e) => {
                  setModalCanPress(true);
                  setModalVisible(!modalVisible);
                  setModalEntry({
                    type: marker.type,
                    id: marker.id,
                    name: marker.name,
                    info: marker.info,
                    address: marker.address,
                    star: marker.star,
                    time: marker.time.map((ti) => {
                      return ti + '\n';
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
              key={marker.type + (marker.id).toString()}
                coordinate={{ latitude: marker.location.lat, longitude: marker.location.lng }}
                onPress={(e) => {
                  setModalCanPress(true);
                  setModalVisible(!modalVisible);
                  setModalEntry({
                    type: marker.type,
                    id: marker.id,
                    name: marker.name,
                    address: marker.address,
                    id: marker.id,
                    star: 5,
                    info: marker.name,
                    time: marker.time.map((ti) => {
                      return ti + '\n';
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
              key={marker.type + (marker.id).toString()}
                coordinate={{ latitude: marker.location.lat, longitude: marker.location.lng }}
                pinColor='blue'
                onPress={(e) => {
                  setModalCanPress(true);
                  setModalVisible(!modalVisible);
                  setModalEntry({
                    type: marker.type,
                    id: marker.id,
                    name: marker.name,
                    address: marker.address,
                    star: marker.star,
                    info: marker.name,
                    time: marker.time.map((ti) => {
                      return ti + '\n';
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
              key={marker.type + (marker.id).toString()}
              coordinate={{ latitude: marker.location.lat, longitude: marker.location.lng }}
              onPress={(e) => {
                setModalVisible(!modalVisible);
                setModalEntry({
                  type: marker.type,
                  id: marker.id,
                  name: marker.name,
                  address: marker.address,
                  star: marker.star,
                  info: marker.info,
                  time: marker.data + (
                  marker.time.map((ti) => {
                    return ti + '\n';
                  })),
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