import React, {Component, useEffect, useState,useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  Modal,
  ActivityIndicator,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../routes/AutoProvider';
import firestore from '@react-native-firebase/firestore';
import Card from './Card';

import HistoryTop from './HistoryTop';
//import Card from './Card';
const width = Dimensions.get('screen').width;
  
const HistoryHome = () => {
  const navigation = useNavigation();
  const {user, logout} = useContext(AuthContext);
  const [trip,setTrip]=useState(null);
  const [loading, setLoading] = useState(true);
  const[deleted,setDeleted]=useState(false);
    //todo:這裡要讀取資料庫的資料
    const fetchTrip = async()=>{
      const temp=[];
      try{           
            //console.log('123 ',list);
          await firestore()
          .collection('users')
          .doc(user.uid)
          .collection('trip')
          .orderBy('postTime','desc')//照時間排
          .get()
          .then((querySnapshot)=>{
            //console.log('Total Posts:',querySnapshot.size);
            querySnapshot.forEach(doc=>{
                const {desSite,name,origin,site,} =doc.data();
                temp.push({
                  name,
                  desSite ,
                  origin,
                  site,
                  tripId:doc.id
                  });
                })
              //console.log('doc.id ',doc.id);
            })
            }catch(e){
              //console.log(e);
          };
          if(loading)
          setLoading(false);
          setTrip(temp);
          //嘉羽
          //console.log('here temp',temp);
          //console.log('here trip',trip);
      }

    useEffect(()=>{
      fetchTrip();
    },[]);

    useEffect(()=>{
      fetchTrip();
      setDeleted(false);
    },[deleted]);

    const navToMap = (data) =>{
      navigation.navigate("ItineraryHome", {
        tripname:data.name,
        origin:data.origin,
        desSite:data.desSite,
        site:data.site,
        from:"history",
      });
    }

    const deleteTrip=async (data)=>{
     //console.log('ss = ',data.tripId);
     setDeleted(true);
     await firestore()
      .collection('users')
      .doc(user.uid)
      .collection('trip')
      .doc(data.tripId)
      .delete()
      .then(() => {
      console.log('Trip deleted!');
      }).catch(e=>
        console.log('error'))
      }

  return (
    <View style={styles.container}>
      {/*頂部*/}
      <View style={styles.topbar}>
        <HistoryTop/>
      </View>

      {/*內容*/}
      {loading?
            <View style={{justifyContent:'center',flex:1}}>
                <ActivityIndicator
                    animating = {true}
                    color = {'#BEBEBE'}
                    size = {50}
                />
            </View>:
            <View style={{flex:11.8}}>
      <FlatList
        //columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 25,
          paddingBottom: 80,
        }}
        numColumns={1}
        data={trip}
        initialNumToRender={5}
        renderItem={({item}) => 
        <Card 
          trip={item}
          onPress1={() => {
            //todo從這裡跳轉去清單
            //this.props.navigation.navigate('TripForhistory' , item);
            //console.log("顯示清單1 ",item);
            navigation.navigate("TripForhistory",item);            
            //console.log("顯示清單2 ",item);
          }}
          onPress2={() => {
            navToMap(item);
            //console.log("顯示地圖");
          }}
          onPress3={() => {
            deleteTrip(item);
            //console.log("顯示地圖");
          }}
        />}
        >
        </FlatList></View>}
    </View>
  );
};

const styles = StyleSheet.create({
    topbar: {
      backgroundColor: '#ffffff',
      flex:1,
      //height: 63,
      //borderBottomLeftRadius: 20,
      //borderBottomRightRadius: 20,
      //opacity: 0.9,
    },
    container: {
      hight: '100%',
      backgroundColor: '#F2F2F2',
      flex: 1,
    },
    textStyle: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 19,
      color: '#5f695d',
      top: 8,
      letterSpacing: 10,
    },
    image: {
      width: 230,
      height: 140,
      top: 6,
      borderRadius: 10,
      left: 2,
    },
    textContainer: {
      flex: 2,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      alignSelf: 'center',
      alignItems: 'center',
      top: 13,
      right: 8,
      //position:'relative',
    },
    buttonContainer: {
      backgroundColor: '#fbb856', //較深黃
      //backgroundColor: '#ffc56b',//較淺黃
      //flex: 1,
      width: 120,
      alignSelf: 'flex-end',
      right: 7,
      bottom: 4,
      borderRadius: 25,
      height: 32,
      //flexDirection: 'row',
    },
    buttonText: {
      fontWeight: '800',
      fontSize: 16,
      color: '#6b5238',
      top: 6,
      letterSpacing: 10,
      left: 7,
    },
    buttonContainer2: {
      backgroundColor: '#E3E3E3', //較淺黃
      //flex: 1,
      width: 120,
      alignSelf: 'flex-end',
      right: 7,
      bottom: 10,
      borderRadius: 25,
      height: 32,
      //flexDirection: 'row',
    },
    buttonText2: {
      fontWeight: '800',
      fontSize: 16,
      top: 6,
      letterSpacing: 10,
      left: 7,
    },
    imageContainer: {
      flex: 3,
      alignItems: 'center',
      padding: 3,
    },
    nameStyle: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      color: '#5f695d',
      left: 15,
      letterSpacing: 1,
    },
    info: {
      flex: 2,
    },
    starStyle: {
      flex: 2,
      flexDirection: 'row',
      alignSelf: 'center',
      left: 5,
      top: 4,
      //color:'#f5f6a3',
    },
  });
  

export default HistoryHome;
