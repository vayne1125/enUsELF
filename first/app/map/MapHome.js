import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableHighlight,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Callout } from 'react-native-maps';
import { mapStyle } from './mapStyle';
import { HOL_DATA } from './HolData';  //shop景點的資料
import { MAIN_ROUTE_DATA } from './MainRoute'; //主路線的資料
import { ORI_DATA } from './OriData'; //空資料 -> 初始化
import { END_DATA } from './EndData';
import Detail from '../detail/Detail';
import Back from './Back';
import { element } from 'prop-types';
import { SensorType } from 'react-native-reanimated';
import MapViewDirections from 'react-native-maps-directions';
import { set } from 'date-fns';
const Map = () => {
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
    //console.log(hotData);
    setHotPress(!hotPress); //打開
  }
  const onPressHandlerForShop = () => {
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
  //取URL
  const getPlaceURL = (lat, long, keyword, radius, type, apiKey) => {
    const baseURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    const location = `location=${lat},${long}&radius=${radius}`;
    const typeData = `&types=${type}`
    const keyWord = `&keyword=${keyword}`
    const api = `&language=zh-TW&key=${apiKey}`;
    if (keyword === "")
      return `${baseURL}${location}${typeData}${api}`
    else
      return `${baseURL}${location}${keyWord}${typeData}${api}`
  }
  //取下一頁的資料
  const getPlaceURL_next_page = (next_page_token, apiKey) => {
    const baseURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    const api = `&language=zh-TW&key=${apiKey}`;
    const next = `pagetoken=${next_page_token}`;
    return `${baseURL}${next}${api}`
  }
  //過濾導航線的點
  const getPositionArray = (array) => {
    const rt = [];
    var cnt = 0;
    array.map((i) => (
      cnt += 1,
      (cnt % 10 == 0) ? rt.push({ lat: i.latitude, long: i.longitude }) : 1
    ))
    return rt;
  }
  //生成座標
  const genMarker = (element, color) => {
    const Obj = {};
    Obj.id = element.place_id;
    Obj.name = element.name;
    Obj.photos = element.photos;
    Obj.rating = element.rating;
    Obj.types = element.types;
    Obj.marker = {
      latitude: element.geometry.location.lat,
      longitude: element.geometry.location.lng
    };
    Obj.vicinity = element.vicinity;
    Obj.opening_hours = element.opening_hours.weekday_text;

    Obj.addr = element.plus_code.compound_code;
    Obj.pinColor = color;

    var tp = Obj.addr.trim().split(' ');
    tp[1] = tp[1].substr(0, 5);
    Obj.myAddr = tp[1] + Obj.vicinity;
    return Obj;
  }
  const getDetail = (who,place_id) =>{
    url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&language=zh-TW&key=AIzaSyDnwR27cx8SVopcsqtZ0nYfGXM_2LQbgGY`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        if(who == 0)
          hotData.push(genMarker(response.result,'red'));
        else if(who == 1)
          shopData.push(genMarker(response.result,'blue'));
      })
  }
  //取得更多資料 -- 待完成 一直出錯qq
  // const getNextPagePlace = async(next,tar)=>{
  //    if(next == undefined) return;
  //    console.log("next = ",next);
  //    await fetch(getPlaceURL_next_page(next,"AIzaSyDnwR27cx8SVopcsqtZ0nYfGXM_2LQbgGY"))
  //       .then((response) => response.json())
  //       .then((response) => {
  //         //console.log(response);
  //         if(response.next_page_token != undefined) getNextPagePlace(response.next_page_token,tar);
  //         console.log("response.next_page_token = ",response.next_page_token);
  //         response.results.map((element, index) => {
  //           if (element.rating > 4 && element.user_ratings_total > 5000){
  //             tar.push(genMarker(element));
  //           }
  //         })
  //       })
  //       .catch((error) => console.log(error));
  // }
  const hotSet = new Set();
  const shopSet = new Set();
  //取得熱門景點 條件:評論數6000 星級4
  const getHotMarker = (place) => {
    fetch(getPlaceURL(place.lat, place.long, "", 3000, "tourist_attraction", "AIzaSyDnwR27cx8SVopcsqtZ0nYfGXM_2LQbgGY"))
      .then((response) => response.json())
      .then((response) => {
        // getNextPagePlace(response.next_page_token,hotMarkers);
        response.results.map((element) => {
          if (element.rating > 4 && element.user_ratings_total > 6000) {
            if(hotSet.has(element.place_id) == false){
              getDetail(0,element.place_id);
              hotSet.add(element.place_id);
            }
          }
        })
      })
      .catch((error) => console.log(error));
  }

  //取得購物景點 關鍵字:伴手禮
  const getShopMarker = (place) => {
    //console.log(getPlaceURL(place.lat, place.long,"伴手禮", 3000, "store,","AIzaSyDnwR27cx8SVopcsqtZ0nYfGXM_2LQbgGY"));
    fetch(getPlaceURL(place.lat, place.long, "伴手禮名產", 3000, "store,", "AIzaSyDnwR27cx8SVopcsqtZ0nYfGXM_2LQbgGY"))
      .then((response) => response.json())
      .then((response) => {
        // getNextPagePlace(response.next_page_token,hotMarkers);
        response.results.map((element) => {
          if (element.rating > 4 && element.user_ratings_total > 1500) {
            if(shopSet.has(element.place_id) == false){
              getDetail(1,element.place_id);
              shopSet.add(element.place_id);
              //console.log(element.place_id);
            }
          }
        })
      })
      .catch((error) => console.log(error));
  }

  //算出附近的點
  const getPlace = (array) => {
    array.map((i) => (
      //25.040749,121.5719052
      //getPlaceURL(i.lat,i.long,1500,"store","AIzaSyDnwR27cx8SVopcsqtZ0nYfGXM_2LQbgGY")
      //department_store store shopping_mall supermarket
      //tourist_attraction,zoo,spa,museum,amusement_park,aquarium,art_gallery,bar,restaurant,night_club,park,rv_park
      //23.4487536,120.1281548
      //半徑最大50000m
      //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=24.9536339,121.2234045&radius=3000&types=tourist_attraction&language=%22en%22&key=AIzaSyDnwR27cx8SVopcsqtZ0nYfGXM_2LQbgGY
      getHotMarker(i),
      getShopMarker(i)
    ))
  }

  const SetData = (array) => {
    const PositionArray = getPositionArray(array);
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

  return (
    <View style={styles.container}>
      {/*浮動視窗-------------------------------------------------------------------------------*/}
      <Detail
        entry={modalEntry}//傳進去的資料參數
        modalVisible={modalVisible}//可不可見
        onClose={() => { setModalVisible(false); console.log("close") }}//關閉函式
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
        // customMapStyle={mapStyle}
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
        <MapViewDirections
          origin={{ latitude: 24.9536339, longitude: 121.2234045 }}
          destination={{ latitude: 23.517405, longitude: 120.7914543, }}
          apikey={"AIzaSyDnwR27cx8SVopcsqtZ0nYfGXM_2LQbgGY"}
          strokeWidth={3}
          strokeColor="#5f695d"
          onReady={(result) => {
            console.log("q");
            if (once) {
              SetData(result.coordinates);
            }
            setOnce(false);
          }}
        />
        {/* <Polyline
          coordinates={
            (completePress ? END_DATA : MAIN_ROUTE_DATA).map((data) => (
              { latitude: data.latitude, longitude: data.longitude }
            ))
          }
          strokeColor="#5f695d"
          //strokeColors={['#7F0000']}
          strokeWidth={3}
        /> */}

        {(hotPress ? hotData : ORI_DATA).map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.marker}
            pinColor={marker.pinColor}
            //todo 簡介 按下變色
            onPress={(e) => {
              setModalVisible(!modalVisible);
              setModalEntry({
                id: marker.place_id,
                name: marker.name,
                img: require('../../assets/site1.jpg'),
                address: marker.myAddr,
                star: marker.rating,
                info: marker.name,
                time: marker.opening_hours.map((i)=>{
                  return i + '\n';
                })
              });
              //marker.pinColor = 'green';  todo:他不是即時更新
              console.log(marker.pinColor);
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
              setModalEntry({
                id: marker.place_id,
                name: marker.name,
                img: require('../../assets/site1.jpg'),
                address: marker.myAddr,
                star: marker.rating,
                info: marker.name,
                time:marker.opening_hours
              });
            }}
          ></Marker>
        ))}

        {(shopPress ? shopData : ORI_DATA).map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.marker}
            pinColor={marker.pinColor}
            onPress={(e) => {
              setModalVisible(!modalVisible);
              setModalEntry({
                id: marker.place_id,
                name: marker.name,
                img: require('../../assets/site1.jpg'),
                address: marker.myAddr,
                star: marker.rating,
                info: marker.name,
                time: marker.opening_hours.map((i)=>{
                  return i + '\n';
                })
              });
            }}
            title={marker.name}
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

      </MapView>
      <Callout>
        {/* <Back /> */}
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
  iconContainer: {
    backgroundColor: '#D1DED7',
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  iconStyle: {
    fontSize: 45,
    top: -4,
    left: -2,
  },
});
export default Map; 