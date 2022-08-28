import React, { useState, useEffect } from 'react';
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
//import Back from './Back';
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
const ItineraryHome = ({ navigation, route }) => {
  const API_key = 'AIzaSyDHq53RuJ511QN4rLqFmwLWiXA1_-nR7vY'
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState({}); //initialState
  const [modalIsMain,setModalIsMain] = useState(false); 
 
  const [region,setRegion] = useState({ latitude: 24.1365593, longitude: 120.6835935, latitudeDelta: 4, longitudeDelta: 0 });
  const [origin,setOrigin] = useState(route.params.origin);
  const [destination,setDestination] = useState({ lat: 24.1365593, lng: 120.6835935});
  const [waypoints,setWaypoints] = useState([]);
  const [markers,setMarkers] = useState([]);
  /*---------這些參數全都要存---------*/
  // const mainRoute = route.params.mainRoute;
  // const origin = route.params.origin;
  // const destination = route.params.destination;
  // const waypoints = route.params.waypoints;
  // const endRoute = route.params.endRoute;
  // const region = route.params.region;
  // origin:origin,
  // desSite:desSite,
  // site:site
  /*---------這些參數全都要存---------*/
  const getDis = (pos, place) => {
    rt = (pos.lat - place.lat) * (pos.lat - place.lat) + (pos.lng - place.lng) * (pos.lng - place.lng);
    return Math.sqrt(rt)
  }

  useEffect(()=>{
    setDestination(()=>{
      var desSite = route.params.desSite;
      var tp = Food[0];
      //console.log(desSite);
      if(desSite.type === "food"){
        tp = (Food[desSite.id]);
      }else if(desSite.type === "nature"){
        tp = (Nature[desSite.id]);
      }else if(desSite.type === "kol"){
        tp = (KOL[desSite.id]);
      }else if(desSite.type === "monuments"){
        tp = (Monuments[desSite.id]);
      }else if(desSite.type === "hotel"){
        tp = (Hotel[desSite.id]);
      }
      //console.log("tp: ",tp);
      return tp;
    })
  },[])


  useEffect(()=>{
    setRegion(() => {
      var longestDis = getDis({ lat: origin.latitude, lng: origin.longitude }, destination);
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
      //console.log("des: ",destination);
      //console.log("l: ",longestDis,"   ,tp = ",tp);
      return {
        latitude: (destination.lat + origin.latitude) / 2.0,
        longitude: (destination.lng + origin.longitude) / 2.0,
        latitudeDelta: tp, //數字越小 地圖道路越大
        longitudeDelta: 0,
      }
    });
  },[destination])

  useEffect(()=>{
    setMarkers(()=>{           
      var data = [];
      (route.params.site).map((param)=>{
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
        }else if(param.type === "hol"){
          data.push(Holplace[param.id]);
        }else if(param.type === "hot"){
          data.push(Hotplace[param.id]);
        }else if(param.type === "shop"){
          data.push(Shopplace[param.id]);
        }
      })
      return data;
    })

    setWaypoints(()=>{           
      var data = [];
      //console.log("route.params.site: ",route.params.site);
      (route.params.site).map((param)=>{
        if(param.type === "food"){
          data.push({latitude: Food[param.id].lat,longitude: Food[param.id].lng});
        }else if(param.type === "nature"){
          data.push({latitude: Nature[param.id].lat,longitude: Nature[param.id].lng});
        }else if(param.type === "kol"){
          data.push({latitude: KOL[param.id].lat,longitude: KOL[param.id].lng});
        }else if(param.type === "monuments"){
          data.push({latitude: Monuments[param.id].lat,longitude: Monuments[param.id].lng});
        }else if(param.type === "hotel"){
          data.push({latitude: Hotel[param.id].lat,longitude: Hotel[param.id].lng});
        }else if(param.type === "hol"){
          data.push({latitude: Holplace[param.id].location.lat,longitude: Holplace[param.id].location.lng});
        }else if(param.type === "hot"){
          data.push({latitude: Hotplace[param.id].location.lat,longitude: Hotplace[param.id].location.lng});
        }else if(param.type === "shop"){
          data.push({latitude: Shopplace[param.id].location.lat,longitude: Shopplace[param.id].location.lng});
        }
      })
      //console.log("data: ",data);
      return data;
    })

  },[])


  return (
    <View style={styles.container}>
      {/*浮動視窗-------------------------------------------------------------------------------*/}
      <DetailForFinal
        entry={modalEntry}//傳進去的資料參數
        modalVisible={modalVisible}//可不可見
        onClose={() => { setModalVisible(false);}}//關閉函式
        isMain = {modalIsMain}
      />
    {/*浮動視窗-------------------------------------------------------------------------------*/}
      <MapView //todo:初始化位置 
        loadingEnabled = {true}
        moveOnMarkerPress={false}
        //rotateEnabled = {false}
        //zoomEnabled = {false}
        //zoomControlEnabled = {false}
        //scrollEnabled = {false}
        //customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        //to do 取起終的中點
        region={region}
        mapType="standard" 
  >
        <MapViewDirections
          origin={origin} //to do抓當前位置
          destination={{
            latitude: destination.lat,
            longitude: destination.lng
          }}
          waypoints = {waypoints}
          apikey={API_key}
          strokeWidth={3}
          strokeColor="#5f695d"
        >
        </MapViewDirections>

        <Marker
          key={'origin'}
          pinColor='tan'
          tracksViewChanges={false}
          coordinate={origin}
          title="你的位置"
        />

            <Marker
              key={'destination'}
              coordinate={{ 
                latitude: destination.lat,
                longitude: destination.lng
              }}
              onPress={(e) => {
                setModalIsMain(true);
                setModalVisible(!modalVisible);
                setModalEntry({
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
              <View style={styles.markerCss}>
                <Text style={styles.markerText}>{destination.name}</Text>
                <Image style={styles.markerImg} source={require('../../assets/pin/green.png')} />
              </View>
            </Marker>



        {(markers).map((marker) => {
          return (
            <Marker
              key={marker.type + (marker.id).toString()}
              coordinate={
                (marker.type === "hot" || marker.type === "hol" || marker.type === "shop")?
                {
                  latitude:marker.location.lat,
                  longitude:marker.location.lng
                }:{
                  latitude:marker.lat,
                  longitude:marker.lng
                }
              }
              onPress={(e) => {
                setModalIsMain(
                  (marker.type === "hot" || marker.type === "hol" || marker.type === "shop")?
                  false:true
                );
                setModalVisible(!modalVisible);
                setModalEntry({
                  name: marker.name,
                  address: marker.address,
                  star: marker.star,
                  info: marker.info,
                  time: (
                    (marker.type === "hot" || marker.type === "hol" || marker.type === "shop")?
                     marker.time.map((i) => {
                      return i + '\n';
                    }):marker.time
                  ),
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

      <View style={styles.topbar}>
        <ItineraryTop></ItineraryTop>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  mapStyle: {
    position:'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  topbar: {
    zIndex:2,
    backgroundColor: '#5f695d',
    //flex:1,
    height: 63,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
});
export default ItineraryHome;
