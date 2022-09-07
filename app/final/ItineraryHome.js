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

  const [south,setSouth] = useState(route.params.origin.latitude);
  const [north,setNorth] = useState(route.params.origin.latitude);
  const [west,setWest] = useState(route.params.origin.longitude);
  const [east,setEast] = useState(route.params.origin.longitude); 

  const [tripname, setTripname] = useState(route.params.tripname);

  const [size, setSize] = useState(0);
  const { user, logout } = useContext(AuthContext);//user uid

  const navToHistory = (tripname) => {
    setModalVisibleForName(false);
    //菁蕙 刪資料庫
    for(let i=0;i<markers.length;++i)
    {
        firestore()
        .collection('users')
        .doc(user.uid)
        .collection('list')
        .doc(markers[i].name)
        .delete()
        .then(() => {
        console.log('User deleted!');
        }).catch(e=>
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
    }).catch(e=>
    console.log('error'))
    const users = firestore().collection('users').doc(user.uid);
    users.collection('trip').doc()
      .set({
        name: tripname,
        origin: route.params.origin,
        desSite: route.params.desSite,
        site: route.params.site,
        postTime:firestore.Timestamp.fromDate(new Date()),
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

  useEffect(()=>{
    
    setEast(()=>{
      var rt = east;
      markers.map((i)=>{
        if(i.lng < rt) rt = i.lng;
      })
      if(destination.lng < rt) rt = destination.lng;
      return rt;
    })

    setWest(()=>{
      var rt = west;
      markers.map((i)=>{
        if(i.lng > rt) rt = i.lng;
      })
      if(destination.lng > rt) rt = destination.lng;
      return rt;
    })

    setNorth(()=>{
      var rt = north;
      markers.map((i)=>{
        if(i.lat > rt) rt = i.lat;
      })
      if(destination.lat > rt) rt = destination.lat;
      return rt;
    })

    setSouth(()=>{
      var rt = south;
      markers.map((i)=>{
        if(i.lat < rt) rt = i.lat;
      })
      if(destination.lat < rt) rt = destination.lat;
      return rt;
    })

  },[markers,destination])

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
      console.log("long="+longestDis+" tp= ",tp);
      return {
        latitude: (south+north) / 2.0,
        longitude: (east+west) / 2.0,
        latitudeDelta: tp, //數字越小 地圖道路越大
        longitudeDelta: 0,
      }
    });
  }, [north,south,west,east])

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
            waypoints={waypoints}
            apikey={API_key}
            strokeWidth={3}
            strokeColor="#5f695d"
            onError={(res)=>{console.log(err)}}
            onReady={
              ()=>{
                //if(print == false)
                //setPrint(true)
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
          
          

        {(markers).map((marker) => (
            <Marker
              pinColor='green'
              // pinColor={
              //   (marker.type === 'hot')?'red':((marker.type === "shop")?'blue':'yellow')
              // }
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
                  {/* {(marker.type === "hot") && <Image source={require('../../assets/pin/red.png')} />}
                  {(marker.type === "hol") && <Image source={require('../../assets/pin/yellow.png')} />}
                  {(marker.type === "shop") && <Image source={require('../../assets/pin/blue.png')} />} */}
                  <Image source={require('../../assets/pin/green.png')} />
                </View>)
              }
            </Marker>
          ))}
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