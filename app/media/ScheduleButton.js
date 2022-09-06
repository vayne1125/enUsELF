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
        style={styles.ChanceText} 
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
    borderTopWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  ChanceContainer: {
    backgroundColor: '#ffffff',
    flex: 0.55,
    alignItems:'flex-start',
    justifyContent:'center',
    padding:2,
    left:-8,
   // top:10,
  },
  ChanceText: {
    //left: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    letterSpacing: 5,
  },
  OkContainer: {
    backgroundColor: '#88bd80',
    flex: 0.45,
    padding:5,
    alignItems:'center',
    justifyContent:'center',
  },
  OkText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 10,
  },
});

export default ScheduleButton;
