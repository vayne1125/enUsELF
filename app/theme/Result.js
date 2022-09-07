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
  RefreshControl,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Foundation';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
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
const width = Dimensions.get('screen').width / 6;
const width2 = (Dimensions.get('screen').width * 49) / 50;
const height = width - 5;

const initialState = {
  id: {},
  name: {},
  address: {},
  city: {},
  region: {},
  info: {},
  time: {},
};
const themeData = {
  自然: NatureData,
  網美: KOLData,
  美食: FoodData,
  住宿: HotelData,
  古蹟: MonumentsData,
};
const Result = ({navigation, route}) => {
  //const theme = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState(initialState);
  const [noticeVisible, setNoticeVisible] = useState(false);
  const [noticeEntry, setNoticeEntry] = useState(initialState);
  const [theme, setTheme] = useState('美食');
  const [food, setFood] = useState(true);
  const [nature, setNature] = useState(false);
  const [kol, setKol] = useState(false);
  const [hotel, setHotel] = useState(false);
  const [monuments, setMonuments] = useState(false);
  const[refreshing,setRefreshing]=useState(false);
  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);
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
      <View style={styles.topBar}>
        <View style={styles.icons}>
          <View style={styles.theme}>
            <TouchableOpacity
              onPress={() => {
                setTheme('美食');
                setFood(true);
                setNature(false);
                setKol(false);
                setMonuments(false);
                setHotel(false);
                setRefreshing(true);
              }}>
              <Icons name={'fast-food'} color={'#5f695d'} size={40} />
            </TouchableOpacity>
          </View>
          {
            (food)?<View style={{flex:0.1}}></View>:<View style={styles.textContainer}>
            <Text style={styles.textStyle2}>美食</Text>
          </View>
          }
        </View>
        <View style={styles.icons}>
          <View style={styles.theme}>
            <TouchableOpacity
              onPress={() => {
                setTheme('自然');
                setFood(false);
                setNature(true);
                setKol(false);
                setMonuments(false);
                setHotel(false);
                setRefreshing(true);
              }}>
              <Icon2 name={'mountains'} color={'#5f695d'} size={44} />
            </TouchableOpacity>
          </View>
          {
            (nature)?<View style={{flex:0.1}}></View>:<View style={styles.textContainer}>
            <Text style={styles.textStyle2}>自然</Text>
          </View>
          }
        </View>
        <View style={styles.icons}>
          <View style={styles.theme}>
            <TouchableOpacity
              onPress={() => {
                setTheme('網美');
                setFood(false);
                setNature(false);
                setKol(true);
                setMonuments(false);
                setHotel(false);
                setRefreshing(true);
              }}>
              <Icon name={'camera-retro'} color={'#5f695d'} size={40} />
            </TouchableOpacity>
          </View>
          {
            (kol)?<View style={{flex:0.1}}></View>:<View style={styles.textContainer}>
            <Text style={styles.textStyle2}>網美</Text>
          </View>
          }
        </View>
        <View style={styles.icons}>
          <View style={styles.theme}>
            <TouchableOpacity
              onPress={() => {
                setTheme('古蹟');
                setFood(false);
                setNature(false);
                setKol(false);
                setMonuments(true);
                setHotel(false);
                setRefreshing(true);
              }}>
              <Icon3 name={'castle'} color={'#5f695d'} size={44} />
            </TouchableOpacity>
          </View>
          {
            (monuments)?<View style={{flex:0.1}}></View>:<View style={styles.textContainer}>
            <Text style={styles.textStyle2}>古蹟</Text>
          </View>
          }
        </View>
        <View style={styles.icons}>
          <View style={styles.theme}>
            <TouchableOpacity
              onPress={() => {
                setTheme('住宿');
                setFood(false);
                setNature(false);
                setKol(false);
                setMonuments(false);
                setHotel(true);
                setRefreshing(true);
              }}>
              <Icons name={'bed'} color={'#5f695d'} size={44} />
            </TouchableOpacity>
          </View>
          {
            (hotel)?<View style={{flex:0.1}}></View>:<View style={styles.textContainer}>
            <Text style={styles.textStyle2}>住宿</Text>
          </View>
          }   
        </View>
      </View>
      {/*內容*/}
      <View style={styles.info}>
        <FlatList
          //columnWrapperStyle={{justifyContent: 'space-around'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            //marginTop: 25,
            paddingBottom: 80,
          }}
          numColumns={1}
          data={themeData[theme]}
          initialNumToRender={5}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          renderItem={({item}) => (
            <Card
              sites={item}
              onPress1={site => {
                setModalVisible(!modalVisible);
                setModalEntry(site);
              }}
              onPress2={site => {
                setNoticeVisible(!noticeVisible);
                setNoticeEntry(site);
              }}
            />
          )}></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topbar: {
    //backgroundColor: '#5f695d',
    //flex:1,
    flex: 1,
    //borderBottomLeftRadius: 20,
    //borderBottomRightRadius: 20,
    //opacity: 0.9,
  },
  container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  info: {
    flex: 10,
    backgroundColor: '#D1DED7',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },

  topBar: {
    flex: 1.8,
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: width2,
    padding: 5,
  },
  icons: {
    flex: 1,
    //width:width,
    height: '100%',
    padding: 5,
  },
  theme: {
    borderRadius: 25,
    flex: 3,
    //height:height,
    backgroundColor: 'white',
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textContainer: {
    flex: 1,
    //backgroundColor:'#000000,
  },
  textStyle2: {
    letterSpacing: 4,
    //fontFamily:'NotoSerifTC-Bold',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    alignContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Result;
