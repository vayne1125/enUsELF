import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { CheckBox } from '@rneui/themed';

import Notice from '../theme/Notice';

const initialState = {
  id: {},
  name: {},
  address: {},
  city: {},
  region: {},
  info: {},
  time: {},
};

const ScheduleButton = ({}) => {
  const navigation = useNavigation();
  const [noticeVisible, setNoticeVisible] = useState(false);
  const [noticeEntry, setNoticeEntry] = useState(initialState);
  const [check, setCheck] = useState(false);
  const [empty, setEmpty] = useState(true);
  console.log('empty ',empty);
  
  useEffect(() => {
    const listen = DeviceEventEmitter
    .addListener('scheduleItemcheck',(check) => {
      setCheck(check);
    });
    return () => listen.remove();
  },[]);

  useEffect(() => {
    const listen = DeviceEventEmitter
    .addListener('hadAllCheck',() => {//傳來Ttrue，我要全勾
      setCheck(true);
    });
    return () => listen.remove();
  },[]);
  
  useEffect(() => {
    const listen = DeviceEventEmitter
    .addListener('ChooseCnt',(cnt) => {//傳來Ttrue，我要全勾
      console.log('look cnt ',cnt);
      if(cnt)
      setEmpty(false);
      else
      setEmpty(true);
    });
    return () => listen.remove();
  },[]);

  const change=async()=>{
    if(check)setEmpty(true);
    else setEmpty(false);
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
        onPress={change}
        title="全選"/>
      </View>
      {empty?
        <View style={styles.NoContainer}>
          <Text style={styles.OkText}>加入清單</Text> 
        </View>:
      <View style={styles.OkContainer}>
        <TouchableOpacity
          onPress={() => {
            setNoticeVisible(!noticeVisible);
            DeviceEventEmitter.emit('sendToDatabase');
            navigation.goBack();
          }}>
          <Text style={styles.OkText}>加入清單</Text>
        </TouchableOpacity>
      </View>
      }
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#AAAAAA',
    backgroundColor: '#ffffff',
    borderTopLeftRadius:50,
    borderTopRightRadius:40,
  },
  NoContainer:{
    backgroundColor: 'gray',
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
  ChanceContainer: {
    backgroundColor: '#ffffff',
    flex: 0.55,
    alignItems:'flex-start',
    justifyContent:'center',
    padding:2,
    borderTopLeftRadius:40,
    borderTopRightRadius:20,
  },
  ChanceText: {
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
