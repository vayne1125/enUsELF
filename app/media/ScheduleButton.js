import React, {Component,useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Entypo';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Notice from '../theme/Notice';
import { CheckBox } from '@rneui/themed';

const initialState = {
  id: {},
  name: {},
  address: {},
  city: {},
  region: {},
  info: {},
  time: {},
};

const ScheduleButton = (navigation) => {
  const [noticeVisible, setNoticeVisible] = useState(false);
  const [noticeEntry, setNoticeEntry] = useState(initialState);
  const [check, setCheck] = useState(false);
  
  useEffect(() => {
    const listen = DeviceEventEmitter
    .addListener('scheduleItemcheck',(check) => {
      setCheck(check);
    });
    return () => listen.remove();
  },[]);

  const change=async()=>{
    setCheck(!check);
    DeviceEventEmitter.emit('scheduleCheck',!check);
  }
  return (
    <View style={styles.Container}>
      {/*通知視窗-------------------------------------------------------------------------------*/}
      <Notice
        entry={noticeEntry} //傳進去的資料參數
        noticeVisible={noticeVisible} //可不可見
        onClose={() => {
          setNoticeVisible(false);
        }} //關閉函式
      />
      {/*通知視窗-------------------------------------------------------------------------------*/}
      <View style={styles.ChanceContainer}>
       <CheckBox
        textStyle={styles.ChanceText} 
        center
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={check}
        /*onPress={()=>{
          change
         
        }
        }*/
        onPress={change}
        title="全選"/>
      </View>
      <View style={styles.OkContainer}>
        <TouchableOpacity
          onPress={() => {
            setNoticeVisible(!noticeVisible);
            DeviceEventEmitter.emit('sendToDatabase');
          }}>
          <Text style={styles.OkText}>加入清單</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'row',
    //borderTopWidth: 1,
    borderColor: '#AAAAAA',
    backgroundColor: '#ffffff',
    borderTopLeftRadius:50,
    borderTopRightRadius:40,
  },
  ChanceContainer: {
    backgroundColor: '#ffffff',
    flex: 0.55,
    alignItems:'flex-start',
    justifyContent:'center',
    padding:2,
    borderTopLeftRadius:40,
    borderTopRightRadius:20,
    //left:-8,
   // top:10,
  },
  ChanceText: {
    //left: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
    letterSpacing: 6,
  },
  OkContainer: {
    backgroundColor: '#6E877B',
    flex: 0.4,
    padding:5,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    height:'75%',
    borderRadius:30,

    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3,
  },
  OkText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 10,
  },
});

export default ScheduleButton;
