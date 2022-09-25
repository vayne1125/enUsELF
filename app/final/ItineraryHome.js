import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableHighlight,
  Image,
  TouchableOpacity
} from 'react-native';
import CustomMarkerComponent from '../map/CustomMarkerComponent';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import DetailForFinal from './DetailForFinal';
import Back from './Back';
import Share from './Share';
import { mapStyle } from '../map/mapStyle';
import MapViewDirections from 'react-native-maps-directions';
import { AuthContext } from '../routes/AutoProvider';
import firestore from '@react-native-firebase/firestore';
import Icons2 from 'react-native-vector-icons/FontAwesome';
import Icons3 from 'react-native-vector-icons/FontAwesome5';

import ItineraryTop from './ItineraryTop';
import Hotplace from '../data/Hotplace'
import Shopplace from '../data/Shopplace'
import Holplace from '../data/Holplace'
import Food from '../data/Food'
import Hotel from '../data/Hotel'
import KOL from '../data/KOL'
import Monuments from '../data/Monuments'
import Nature from '../data/Nature'
import Settripname from './Settripname';

const ItineraryHome = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState({}); //initialState
  const [modalIsMain, setModalIsMain] = useState(true);
  //顯示取名字
  const [modalVisibleForName, setModalVisibleForName] = useState(false);
  const [print, setPrint] = useState(true);
  const [region, setRegion] = useState({ latitude: 24.1365593, longitude: 120.6835935, latitudeDelta: 4, longitudeDelta: 0 });
  const [origin, setOrigin] = useState(route.params.origin);
  const [destination, setDestination] = useState({ lat: 24.1365593, lng: 120.6835935 });
  const [waypoints, setWaypoints] = useState([]);
  const [markers, setMarkers] = useState([]);

  const [south, setSouth] = useState(route.params.origin.latitude);
  const [north, setNorth] = useState(route.params.origin.latitude);
  const [west, setWest] = useState(route.params.origin.longitude);
  const [east, setEast] = useState(route.params.origin.longitude);

  const [tripname, setTripname] = useState(route.params.tripname);

  const [wayTime, setWayTime] = useState([]);
  const [time, setTime] = useState([]);
  const [order, setOrder] = useState([]);
  const [place, setPlace] = useState([]);
  const [mode,setMode] = useState('DRIVING');
  const [changeMode,setChangeMode] = useState('DRIVING');
  const [size, setSize] = useState(0);
  const { user, logout } = useContext(AuthContext);//user uid

  const onPressHandlerForDriving = () =>{
    setChangeMode('DRIVING');
  }

  const onPressHandlerForWalking = () =>{
    setChangeMode('WALKING');
  }

  useEffect(()=>{
    //console.log(changeMode);
    setMode(changeMode);
  },[changeMode])

  const navToHistory = (tripname) => {
    setModalVisibleForName(false);
    //菁蕙 刪資料庫
    for (let i = 0; i < markers.length; ++i) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .collection('list')
        .doc(markers[i].name)
        .delete()
        .then(() => {
          console.log('User deleted!');
        }).catch(e =>
          console.log('error'))
    }
    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('list')
      .doc(destination.name)
      .delete()
      .then(() => {
        console.log('User deleted!');
      }).catch(e =>
        console.log('error'))
    const users = firestore().collection('users').doc(user.uid);
    users.collection('trip').doc()
      .set({
        name: tripname,
        origin: route.params.origin,
        desSite: route.params.desSite,
        site: route.params.site,
        postTime: firestore.Timestamp.fromDate(new Date()),
      }).then(() => {
        console.log('trip add !');
      }).catch((error) => {
        console.log('trip Failed!', error);
      });

    navigation.navigate("HistoryHome");
  }

  const navToBack = () => {
    navigation.goBack();
  }

  const pressOk = () => {
    setModalVisibleForName(true);
  }

  const getDis = (pos, place) => {
    rt = (pos.lat - place.lat) * (pos.lat - place.lat) + (pos.lng - place.lng) * (pos.lng - place.lng);
    return Math.sqrt(rt)
  }

  useEffect(() => {
    setMarkers(() => {
      const data = [];
      (route.params.site).map((param) => {
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
        } else if (param.type === "hol") {
          data.push(Holplace[param.id]);
        } else if (param.type === "hot") {
          data.push(Hotplace[param.id]);
        } else if (param.type === "shop") {
          data.push(Shopplace[param.id]);
        }
      })
      //console.log(data);
      return data;
    })

    setWaypoints(() => {
      const data = [];
      (route.params.site).map((param) => {
        if (param.type === "food") {
          data.push({ latitude: Food[param.id].lat, longitude: Food[param.id].lng });
        } else if (param.type === "nature") {
          data.push({ latitude: Nature[param.id].lat, longitude: Nature[param.id].lng });
        } else if (param.type === "kol") {
          data.push({ latitude: KOL[param.id].lat, longitude: KOL[param.id].lng });
        } else if (param.type === "monuments") {
          data.push({ latitude: Monuments[param.id].lat, longitude: Monuments[param.id].lng });
        } else if (param.type === "hotel") {
          data.push({ latitude: Hotel[param.id].lat, longitude: Hotel[param.id].lng });
        } else if (param.type === "hol") {
          data.push({ latitude: Holplace[param.id].lat, longitude: Holplace[param.id].lng });
        } else if (param.type === "hot") {
          data.push({ latitude: Hotplace[param.id].lat, longitude: Hotplace[param.id].lng });
        } else if (param.type === "shop") {
          data.push({ latitude: Shopplace[param.id].lat, longitude: Shopplace[param.id].lng });
        }
      })
      //console.log("data: ",data);
      return data;
    })
  }, [])

  useEffect(() => {
    setDestination(() => {
      var desSite = route.params.desSite;
      var tp = Food[0];
      //console.log(desSite);
      if (desSite.type === "food") {
        tp = (Food[desSite.id]);
      } else if (desSite.type === "nature") {
        tp = (Nature[desSite.id]);
      } else if (desSite.type === "kol") {
        tp = (KOL[desSite.id]);
      } else if (desSite.type === "monuments") {
        tp = (Monuments[desSite.id]);
      } else if (desSite.type === "hotel") {
        tp = (Hotel[desSite.id]);
      } else if (desSite.type === "hot") {
        tp = (Hotplace[desSite.id]);
      } else if (desSite.type === "shop") {
        tp = (Shopplace[desSite.id]);
      } else if (desSite.type === "hol") {
        tp = (Holplace[desSite.id]);
      }
      //console.log("tp: ",tp);
      return tp;
    })

  }, [])

  useEffect(() => {

    setEast(() => {
      var rt = east;
      markers.map((i) => {
        if (i.lng < rt) rt = i.lng;
      })
      if (destination.lng < rt) rt = destination.lng;
      return rt;
    })

    setWest(() => {
      var rt = west;
      markers.map((i) => {
        if (i.lng > rt) rt = i.lng;
      })
      if (destination.lng > rt) rt = destination.lng;
      return rt;
    })

    setNorth(() => {
      var rt = north;
      markers.map((i) => {
        if (i.lat > rt) rt = i.lat;
      })
      if (destination.lat > rt) rt = destination.lat;
      return rt;
    })

    setSouth(() => {
      var rt = south;
      markers.map((i) => {
        if (i.lat < rt) rt = i.lat;
      })
      if (destination.lat < rt) rt = destination.lat;
      return rt;
    })

  }, [markers, destination])

  useEffect(() => {
    setRegion(() => {
      var longestDis = getDis({ lat: south, lng: east }, { lat: north, lng: west });
      var tp = 0;
      if (longestDis >= 2) {
        tp = 4.3;
      } else if (longestDis >= 1.5) {
        tp = 3.3;
      } else if (longestDis >= 0.9) {
        tp = 2.3;
      } else if (longestDis >= 0.5) {
        tp = 1.4;
      } else {
        tp = 0.9;
      }
      //console.log("long=" + longestDis + " tp= ", tp);
      return {
        latitude: (south + north) / 2.0,
        longitude: (east + west) / 2.0,
        latitudeDelta: tp, //數字越小 地圖道路越大
        longitudeDelta: 0,
      }
    });
  }, [north, south, west, east])

  useEffect(() => {
    // console.log("order = ",order);
    // console.log("route.params.site = ",route.params.site)
    // console.log(time);
    setPlace(()=>{
      var data = [];
      var tp = {};
      for(var i = 0;i<order.length;i++){
        tp = route.params.site[order[i]];
        data.push(tp);
      }
      data.push(route.params.desSite);
      return data;
    })
    setTime(()=>{
      var rt = [];
      wayTime.map((t)=>{
        rt.push({distance:t.distance.text,duration:t.duration.text});
      })
      return rt;
    })
  }, [order])


  return (
    <View style={styles.container}>

      <Settripname
        modalVisible={modalVisibleForName}
        size={size}
        onClose={() => { setModalVisibleForName(false); }}
        completePress={(tripname) => { navToHistory(tripname) }}
      />

      {/*浮動視窗-------------------------------------------------------------------------------*/}
      <DetailForFinal
        entry={modalEntry}//傳進去的資料參數
        modalVisible={modalVisible}//可不可見
        onClose={() => { setModalVisible(false); }}//關閉函式
        isMain={modalIsMain}
      />
      {/*浮動視窗-------------------------------------------------------------------------------*/}
      <MapView
        loadingEnabled={true}
        moveOnMarkerPress={false}
        //customMapStyle={mapStyle}
        //rotateEnabled = {false}
        //zoomEnabled = {false}
        //zoomControlEnabled = {false}
        //scrollEnabled = {false}
        //customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        region={region}
        mapType="standard"
        onMapReady={() => {
          //if(print == false)setPrint(true);
          console.log('map ok');
        }
        }
      >
        <MapViewDirections
          optimizeWaypoints={true}
          origin={origin}
          destination={{
            latitude: destination.lat,
            longitude: destination.lng
          }}
          mode={mode}
          waypoints={waypoints}
          apikey={API_key}
          strokeWidth={3}
          strokeColor="#5f695d"
          onError={(res) => { console.log(err) }}
          onReady={
            (result) => {
              console.log(result.legs);
              //console.log(result.legs[0].steps);
              setOrder(result.waypointOrder[0]);
              setWayTime(result.legs);
              // console.log("legs: ",result.legs);
              // console.log("steps: ",result.legs.steps)
              // console.log("way: ",result.waypointOrder);
              console.log("dir ok");
            }
          }
        />

        <Marker
          key={'origin'}
          pinColor='tan'
          tracksViewChanges={false}
          coordinate={origin}
          title="你的位置"
        />

        <CustomMarkerComponent
          key={'des'}
          data={destination}
          color='green'
          onPressHandler={(e) => {
            setModalIsMain(true);
            setModalVisible(!modalVisible);
            setModalEntry({
              id: destination.id,
              type: destination.type,
              name: destination.name,
              address: destination.address,
              star: destination.star,
              info: destination.info,
              time: destination.time,
              city: destination.city,
              region: destination.region,
            });
          }}
        />

        {(markers).map((marker) => {
          return (
            <CustomMarkerComponent
              key={marker.type + (marker.id).toString()}
              data={marker}
              color='green'
              onPressHandler={(e) => {
                setModalIsMain(
                  (marker.type === "hot" || marker.type === "hol" || marker.type === "shop") ?
                    false : true
                );
                setModalVisible(!modalVisible);
                setModalEntry({
                  id: marker.id,
                  type: marker.type,
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
        })}
      </MapView>

      <Callout style={styles.callout}>


        <View style={styles.topbar}>
          <ItineraryTop
            mode = {mode} 
            tripname = {tripname} 
            time = {time} 
            place = {place}
          ></ItineraryTop>
        </View>

        <View style={styles.buttonContainer}>
        <TouchableOpacity
           onPress={onPressHandlerForDriving}>
        <View style={styles.iconContainer2}>
          <Icons2
            name="car"
            size={28}
            color={'#5f695d'}
          />
        </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onPressHandlerForWalking}
        >
        <View style={styles.iconContainer3}>
          <Icons3
            name="walking"
            size={28}
            color={'#5f695d'}
          />
        </View>

      </TouchableOpacity>
          </View>
        {(route.params.from === "map") && <Back style={styles.back} />}
        <View style={styles.btnContainner}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              (route.params.from === "map") ?
                pressOk() :
                navToBack()
            }}
            underlayColor='#ddddd'
          >
            {
              (route.params.from === "map") ?
                <Text style={styles.text}>確認</Text> :
                <Text style={styles.text}>返回</Text>
            }
          </TouchableHighlight>
          <Share />

        </View>
      </Callout>

    </View>
  )
};

const styles = StyleSheet.create({
  callout: {
    position: 'absolute',
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
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  btnContainner: {
    flexDirection: "row",
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topbar: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    left: -Dimensions.get('window').width / 2,
    top: -Dimensions.get('window').height / 2,
    height: Dimensions.get('window').height / 11,
    width: Dimensions.get('window').width,
    position: 'absolute',
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
  button: {
    top: Dimensions.get('window').height / 2 - 60,
    left: -Dimensions.get('window').width*3 / 8,
    backgroundColor: 'rgba(95,105,93,0.8)',
    width: 130,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 10,
    borderWidth:2,
    borderColor:'#badecb',
    // width: 100,
    // height: 40,
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderRadius: 10,
    // marginBottom: 10,
    //position: 'absolute',
  },
  text: {
    fontSize: 17,
    color: '#F2F2F2',
  },
  back:{
    backgroundColor:'black',
  },
  buttonContainer: {
    width: 65,
    height: 100,
    right: -Dimensions.get('window').width*5/11,
    bottom: -Dimensions.get('window').height*8/21,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
  },
});
export default ItineraryHome;
