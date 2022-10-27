import React, {Component, useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  Alert,
  DeviceEventEmitter,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
//import Iconcamera from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { vi } from 'date-fns/locale';

import Card from './Card';
import MediaTop from './MediaTop';
import {AuthContext} from '../routes/AutoProvider';


import Collect from './Collect';
import All from './All';
import Mypost from './Mypost';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height/5;

const MediaHome = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [Posts, setPosts] = useState(null);
  const [collect, setCollect] = useState([]);
  const [my, setMy] = useState([]);
  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(true);
  //const [addcollected, setDeleted] = useState(false);
  const [userdata, setuserdata] = useState(null);
  const [all, setAll] = useState([]);
  const [choose, setChoose] = useState('all');
  const array = [];
   
  return (
    <View style={styles.container}>
      {/*頂部*/}
      <View style={styles.topbar}>
        <MediaTop />
      </View>
      {/* <LinearGradient
        start={{x: 0.8, y: 0.0}}
        end={{x: 1.0, y: 1.0}}
        locations={[0, 0.5, 1.0]}
        colors={['#F2F2F2', '#D1DED7', '#6E877B']}
        style={styles.linearGradient}> */}
      <View style={styles.chooseContainer}>
        {choose === 'all' ? (
          <View style={styles.chooseed}>
            {/* <LinearGradient
              start={{x: 1.0, y: 0.0}}
              end={{x: 1.0, y: 1.0}}
              locations={[0, 0.45, 0.55, 1.0]}
              colors={['#BECFC3', '#F2F2F2', '#F2F2F2', '#BECFC3']}
              style={styles.linearGradient}> */}
              <TouchableOpacity
                onPress={() => {
                  setChoose('all');
                }}>
                <Text style={styles.textStyle2}>全 部</Text>
              </TouchableOpacity>
            {/* </LinearGradient> */}
          </View>
        ) : (
          <View style={styles.unchoose}>
            <TouchableOpacity
              onPress={() => {
                setChoose('all');
              }}>
              <Text style={styles.textStyle}>全 部</Text>
            </TouchableOpacity>
          </View>
        )}
        {choose === 'collect' ? (
          <View style={styles.chooseed}>
            {/* <LinearGradient
              start={{x: 1.0, y: 0.0}}
              end={{x: 1.0, y: 1.0}}
              locations={[0, 0.45, 0.55, 1.0]}
              colors={['#BECFC3', '#F2F2F2', '#F2F2F2', '#BECFC3']}
              style={styles.linearGradient}> */}
              <TouchableOpacity
                onPress={() => {
                  setChoose('collect');
                }}>
                <Text style={styles.textStyle2}>收 藏</Text>
              </TouchableOpacity>
            {/* </LinearGradient> */}
          </View>
        ) : (
          <View style={styles.unchoose}>
            <TouchableOpacity
              onPress={() => {
                setChoose('collect');
              }}>
              <Text style={styles.textStyle}>收 藏</Text>
            </TouchableOpacity>
          </View>
        )}
        {choose === 'mypost' ? (
          <View style={styles.chooseed}>
            {/* <LinearGradient
              start={{x: 1.0, y: 0.0}}
              end={{x: 1.0, y: 1.0}}
              locations={[0, 0.45, 0.55, 1.0]}
              colors={['#BECFC3', '#F2F2F2', '#F2F2F2', '#BECFC3']}
              style={styles.linearGradient}> */}
              <TouchableOpacity
                onPress={() => {
                  setChoose('mypost');
                }}>
                <Text style={styles.textStyle2}>我的貼文</Text>
              </TouchableOpacity>
            {/* </LinearGradient> */}
          </View>
        ) : (
          <View style={styles.unchoose}>
            <TouchableOpacity
              onPress={() => {
                setChoose('mypost');
              }}>
              <Text style={styles.textStyle}>我的貼文</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.info}>
        {/*內容*/}
        {choose==='all'? <All />:
            (choose==='collect'? <Collect />:
            <Mypost />)
        }
      </View>
      {/* </LinearGradient> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    hight: '100%',
    backgroundColor: '#ffffff',
    flex: 1,
  },
  topbar: {
    flex: 1,
  },
  imageContainer: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#D1DED7',
    //borderColor: '#D1DED7',
    //borderWidth: 3,
    //borderBottomWidth:10,
  },
  chooseContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    alignSelf: 'center',
    paddingLeft: '2%',
    paddingRight: '2%',
    // borderBottomWidth:1,
    // borderColor:'#AAAAAA',
  },
  unchoose: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    alignSelf: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#92A18F',
    letterSpacing: 5,
  },
  textStyle2: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#88bd80',
    letterSpacing: 5,
  },
  chooseed: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    //backgroundColor: '#D1DED7',
    borderBottomWidth:5,
    borderColor:'#88bd80',
    height: '100%',
    //borderRadius: 20,
  },
  info: {
    flex: 10.8, //last:11.8
    backgroundColor:'#f2f2f2',
  },
  nameContainer: {
    flexDirection: 'row',
    backgroundColor: '#D1DED7',
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    //position:'relative',
  },
  icon: {
    left: 8,
    top: 5,
  },
  buttonText: {
    fontWeight: '800',
    fontSize: 17,
    color: '#6b5238',
    top: 8,
    letterSpacing: 10,
    left: 7,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    //flex: 11.8,
    //paddingLeft: 15,
    //paddingRight: 15,
    //borderRadius: 5
    alignItems: 'center',
    alignSelf: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});

export default MediaHome;
