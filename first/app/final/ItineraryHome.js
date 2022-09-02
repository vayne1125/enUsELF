import React, { useState, useEffect, useContext } from 'react';
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
import Back from './Back';
import Share from './Share';
import { mapStyle } from '../map/mapStyle';
import MapViewDirections from 'react-native-maps-directions';
import ItineraryTop from './ItineraryTop';
import Hotplace from '../map/Hotplace'
import Shopplace from '../map/Shopplace'
import Holplace from '../map/Holplace'
import Food from '../theme/Food'
import Hotel from '../theme/Hotel'
import KOL from '../theme/KOL'
import Monuments from '../theme/Monuments'
import Nature from '../theme/Nature'
import Settripname from './Settripname';
import { AuthContext } from '../routes/AutoProvider';
import firestore from '@react-native-firebase/firestore';
import { Directions } from 'react-native-gesture-handler';

const ItineraryHome = ({ navigation, route }) => {
  const API_key = 'AIzaSyDHq53RuJ511QN4rLqFmwLWiXA1_-nR7vY'
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState({}); //initialState
  const [modalIsMain, setModalIsMain] = useState(true);
  //顯示取名字
  const [modalVisibleForName, setModalVisibleForName] = useState(false);
  const [print, setPrint] = useState(false);
  const [region, setRegion] = useState({ latitude: 24.1365593, longitude: 120.6835935, latitudeDelta: 4, longitudeDelta: 0 });
  const [origin, setOrigin] = useState(route.params.origin);
  const [destination, setDestination] = useState({ lat: 24.1365593, lng: 120.6835935 });
  const [waypoints, setWaypoints] = useState([]);
  const [markers, setMarkers] = useState([]);

  const [tripname, setTripname] = useState(route.params.tripname);

  const [size, setSize] = useState(0);
  const { user, logout } = useContext(AuthContext);//user uid

  //伸蓉
  const navToHistory = (tripname) => {
    setModalVisibleForName(false);
    //console.log("his");
    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('trip')
      .get()
      .then((querySnapshot) => {
        setSize(querySnapshot.size);
      })
    //console.log('size= ',size);

    const users = firestore().collection('users').doc(user.uid);
    users.collection('trip').doc()
      .set({
        name: tripname,
        origin: route.params.origin,
        desSite: route.params.desSite,
        site: route.params.site,
      }).then(() => {
        console.log('trip add !');
      }).catch((error) => {
        console.log('trip Failed!', error);
      });
    navigation.navigate("HistoryHome");
  }

  //todo:返回
  //這邊存資料
  const navToBack = () => {
    //console.log("goback");
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
      }
      //console.log("tp: ",tp);
      return tp;
    })
  }, [])

  useEffect(() => {
    setRegion(() => {
      var longestDis = getDis({ lat: origin.latitude, lng: origin.longitude }, destination);
      var tp = 0;
      if (longestDis >= 2) {
        tp = 4.2;
      } else if (longestDis >= 1.5) {
        tp = 3.2;
      } else if (longestDis >= 1) {
        tp = 2.2;
      } else if (longestDis >= 0.5) {
        tp = 1.3;
      } else {
        tp = 0.8;
      }
      //console.log("desInfinal: ",destination);
      //console.log("l: ",longestDis,"   ,tp = ",tp);
      /*console.log({
        latitude: (destination.lat + origin.latitude) / 2.0,
        longitude: (destination.lng + origin.longitude) / 2.0,
        latitudeDelta: tp, //數字越小 地圖道路越大
        longitudeDelta: 0,
      });*/
      return {
        latitude: (destination.lat + origin.latitude) / 2.0,
        longitude: (destination.lng + origin.longitude) / 2.0,
        latitudeDelta: tp, //數字越小 地圖道路越大
        longitudeDelta: 0,
      }
    });
  }, [destination])

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
      return data;
    })

    setWaypoints(() => {
      const data = [];
      //console.log("route.params.site: ",route.params.site);
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
          data.push({ latitude: Holplace[param.id].location.lat, longitude: Holplace[param.id].location.lng });
        } else if (param.type === "hot") {
          data.push({ latitude: Hotplace[param.id].location.lat, longitude: Hotplace[param.id].location.lng });
        } else if (param.type === "shop") {
          data.push({ latitude: Shopplace[param.id].location.lat, longitude: Shopplace[param.id].location.lng });
        }
      })
      //console.log("data: ",data);
      return data;
    })

  }, [])


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
        customMapStyle={mapStyle}
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
        }
        }
      >

        <Marker
          key={'origin'}
          pinColor='tan'
          tracksViewChanges={false}
          coordinate={origin}
          title="你的位置"
        />

        <Marker
          key={'destination'}
          pinColor='green'
          coordinate={{
            latitude: destination.lat,
            longitude: destination.lng
          }}
          onPress={(e) => {
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
        >


          {(print) && (
            <View style={styles.markerCss}>
              <Text style={styles.markerText}>{destination.name}</Text>
              <Image source={require('../../assets/pin/green.png')} />
            </View>)
          }
          </Marker>
          
          <MapViewDirections
            optimizeWaypoints={true}
            origin={origin}
            destination={{
              latitude: destination.lat,
              longitude: destination.lng
            }}
            waypoints={waypoints}
            apikey={API_key}
            strokeWidth={3}
            strokeColor="#5f695d"
          />

        {(markers).map((marker) => {
          return(
            <Marker
              pinColor='green'
              key={marker.type + (marker.id).toString()}
              coordinate={
                (marker.type === "hot" || marker.type === "hol" || marker.type === "shop") ?
                  {
                    latitude: marker.location.lat,
                    longitude: marker.location.lng
                  } : {
                    latitude: marker.lat,
                    longitude: marker.lng
                  }
              }
              onPress={(e) => {
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
                  time: (
                    (marker.type === "hot" || marker.type === "hol" || marker.type === "shop") ?
                      marker.time.map((i) => {
                        return i + '\n';
                      }) : marker.time
                  ),
                  city: marker.city,
                  region: marker.region,
                });
              }}
            >
              {(print) && (
                <View style={styles.markerCss}>
                  <Text style={styles.markerText}>{marker.name}</Text>
                  <Image source={require('../../assets/pin/green.png')} />
                </View>)
              }
            </Marker>
          )
        }
        )}
      </MapView>

        <Callout style={styles.callout}>
          
          <View style={styles.topbar}>
        <ItineraryTop tripname = {tripname}></ItineraryTop>
      </View>
      {(route.params.from === "map") && <Back style={styles.back} />}
      <View style={styles.btnContainner}>
      <TouchableHighlight
          style={styles.button}
          onPress={()=>{
            (route.params.from === "map")?
            pressOk():
            navToBack()
          }}
          underlayColor='#ddddd'
        >
          {
          (route.params.from === "map")?
          <Text style={styles.text}>確認</Text>:
          <Text style={styles.text}>返回</Text>
          }
      </TouchableHighlight>
      <Share/>
      </View>
        </Callout>

    </View>
  )
};

const styles = StyleSheet.create({
  callout:{
    position:'absolute',
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
  btnContainner:{
    flexDirection: "row",
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topbar: {
    //zIndex: 3,
    backgroundColor: '#5f695d',
    //flex:1,
    left:-Dimensions.get('window').width/2,
    top:-Dimensions.get('window').height/2,
    height: 63,
    width:Dimensions.get('window').width,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position:'absolute',
    //opacity: 0.9,
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
    top: Dimensions.get('window').height/2 - 60,
    left: -Dimensions.get('window').width/4 - 10,
    backgroundColor: '#5f695d',
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 17,
    color: '#F2F2F2',
  },
});
export default ItineraryHome;
