import React, { useEffect, useState,useContext} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  DeviceEventEmitter,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import {AuthContext} from '../../routes/AutoProvider';
import ChooseTripTop from './ChooseTripTop';
import ChooseTripCard from './ChooseTripCard';
import Notice from '../../theme/Notice';

const initialState = {
  id: {},
  name: {},
  address: {},
  city: {},
  region: {},
  info: {},
  time: {},
};

const ChooseTrip = () => {
  const [noticeVisible, setNoticeVisible] = useState(false);
  const [noticeEntry, setNoticeEntry] = useState(initialState);

  const navigation = useNavigation();
  const {user, logout} = useContext(AuthContext);
  const [trip,setTrip]=useState(null);
    //todo:這裡要讀取資料庫的資料
    const fetchTrip = async()=>{
      const temp=[];
      try{           
          await firestore()
          .collection('users')
          .doc(user.uid)
          .collection('trip')
          .get()
          .then((querySnapshot)=>{
            querySnapshot.forEach(doc=>{
                const {desSite,name,origin,site} =doc.data();
                temp.push({
                  name,
                  desSite ,
                  origin,
                  site,
                  });
                })
            })
            }catch(e){
              //console.log(e);
          };
          setTrip(temp);
          console.log('here trip',trip);
      }

    useEffect(()=>{
      fetchTrip();
    },[]);


    const navToMap = (data) =>{
      navigation.navigate("ItineraryHome", {
        tripname:data.name,
        origin:data.origin,
        desSite:data.desSite,
        site:data.site,
        from:"history",
      });
    }


  return (
    <View style={styles.container}>
      {/*頂部*/}
      <View style={styles.topbar}>
       <ChooseTripTop/>
      </View>
       {/*通知視窗-------------------------------------------------------------------------------*/}
       <Notice
        entry={noticeEntry} //傳進去的資料參數
        noticeVisible={noticeVisible} //可不可見
        onClose={() => {
          setNoticeVisible(false);
        }} //關閉函式
      />
      {/*通知視窗-------------------------------------------------------------------------------*/}
      <View style={{flex:11.8}}>
      {/*內容*/}
      <FlatList
        //columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: '3%',
          paddingBottom: '5%',
        }}
        numColumns={1}
        data={trip}
        initialNumToRender={5}
        renderItem={({item}) => 
        <ChooseTripCard 
          trip={item}
          onPress1={() => {
            //todo從這裡跳轉去清單
            console.log("choose ",item);
            navigation.navigate("TripForhistory",item);            
          }}
          onPress2={() => {
            navToMap(item);
          }}
          onPress3={() => {
            setNoticeVisible(true);
            DeviceEventEmitter.emit('addSchedule',item);
            console.log("addSchedule ",item);
            navigation.goBack();  
          }}
        />}
        >
        </FlatList>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topbar: {
    backgroundColor: '#ffffff',
    flex:1,
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
  },
  buttonContainer: {
    backgroundColor: '#fbb856',
    width: 120,
    alignSelf: 'flex-end',
    right: 7,
    bottom: 4,
    borderRadius: 25,
    height: 32,
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
    backgroundColor: '#E3E3E3',
    width: 120,
    alignSelf: 'flex-end',
    right: 7,
    bottom: 10,
    borderRadius: 25,
    height: 32,
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
  },
});

export default ChooseTrip;
