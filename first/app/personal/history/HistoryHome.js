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
  TouchableOpacity,
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

const data = [
    {tripname:"我與伸蓉的蜜月之旅"},
    {tripname:"嘿嘿trip"},
    {tripname:"pupupupupu"}]
  
const HistoryHome = () => {
  const navigation = useNavigation();
  const {user, logout} = useContext(AuthContext);
  const [trip,setTrip]=useState(null);
    //todo:這裡要讀取資料庫的資料
    const fetchTrip = async()=>{
      const temp=[];
      try{           
            //console.log('123 ',list);
          await firestore()
          .collection('users')
          .doc(user.uid)
          .collection('trip')
          .get()
          .then((querySnapshot)=>{
            //console.log('Total Posts:',querySnapshot.size);
            querySnapshot.forEach(doc=>{
                const {desSite,name,origin,site} =doc.data();
                temp.push({
                  name,
                  desSite ,
                  origin,
                  site,
                  });
                })
                console.log('temp ',temp);
            })
            }catch(e){
              console.log(e);
          };
          setTrip(temp);
          //嘉羽
          console.log('here temp',temp);
          console.log('here trip',trip);
      }

useEffect(()=>{
          fetchTrip();
    },[]);


    //todo: 對資料庫的資料作處理
    useEffect(()=>{

    },[])


  return (
    <View style={styles.container}>
      {/*頂部*/}
      <View style={styles.topbar}>
        <HistoryTop/>
      </View>

      {/*內容*/}
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
            console.log("顯示清單1 ",item);
            navigation.navigate("TripForhistory",item);            
            console.log("顯示清單2 ",item);
          }}
          onPress2={() => {
            //嘉羽 todo從這裡跳轉去地圖
            console.log("顯示地圖");
          }}
        />}
        >
        </FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  topbar: {
    backgroundColor: '#5f695d',
    //flex:1,
    height: 63,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    //opacity: 0.9,
  },
  container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  card: {
    height: 170,
    //backgroundColor:'#D1DED7',
    backgroundColor: '#ffffff',
    width,
    //marginHorizontal: 10,
    //borderRadius: 10,
    marginBottom: 15,
    //paddingTop:5,
    padding: 5,
    //right: 2,
    //borderColor: '#D1DED7',
    //borderWidth: 3,
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderBottomColor: '#D1DED7',
    borderRightWidth: 3,
    borderRightColor: '#ffffff',
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
