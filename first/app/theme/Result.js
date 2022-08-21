import React, {Component, useState} from 'react';
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

import ResultTop from './ResultTop';
import Detail from '../detail/Detail';
import Notice from './Notice';
import NatureData from './Nature';
import KOLData from './KOL';
import FoodData from './Food';
import HotelData from './Hotel';
import MonumentsData from './Monuments';
import Image_link from './Image';
import Card from './Card';
const Stack = createNativeStackNavigator();
const width = Dimensions.get('screen').width;

const initialState = {
  id: {},
  name: {},
  address: {},
  city:{},
  region:{},
  info: {},
  time:{},
};
const themeData=
{
  "自然":NatureData,
  "網美景點":KOLData,
  "美食":FoodData,
  "住宿":HotelData,
  "古蹟":MonumentsData
};
const Result = ({navigation, route}) => {
  const theme = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState(initialState);
  //-------------------------------------------------------------------------
  const [noticeVisible, setNoticeVisible] = useState(false);
  const [noticeEntry, setNoticeEntry] = useState(initialState);
  //--------------------------------------------------------------------------

  return (
    <View style={styles.container}>
      {/*浮動視窗-------------------------------------------------------------------------------*/}
      <Detail
        entry={modalEntry} //傳進去的資料參數
        modalVisible={modalVisible} //可不可見
        onClose={() => {
          setModalVisible(false);
        }} //關閉函式
      />
      {/*浮動視窗-------------------------------------------------------------------------------*/}

      {/*通知視窗-------------------------------------------------------------------------------*/}
      <Notice
        entry={noticeEntry} //傳進去的資料參數
        noticeVisible={noticeVisible} //可不可見
        onClose={() => {
          setNoticeVisible(false);
        }} //關閉函式
      />
      {/*通知視窗-------------------------------------------------------------------------------*/}

      {/*頂部*/}
      <View style={styles.topbar}>
        <ResultTop theme={theme} />
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
        data={themeData[theme["name"]]}
        initialNumToRender={5}
        renderItem={({item}) => 
        <Card 
          sites={item} 
          onPress1={(site) => {
            setModalVisible(!modalVisible);
            setModalEntry(site);
          }}
          onPress2={(site) => {
            setNoticeVisible(!noticeVisible);
            setNoticeEntry(site);
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

export default Result;
