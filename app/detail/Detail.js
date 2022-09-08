import React, {Component, useState, useContext, useEffect} from 'react';
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
  ScrollView,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import Notice from '../theme/Notice';
import Weather from './Weather';
import Image_link from '../theme/Image';

import { AuthContext } from '../routes/AutoProvider';

const width = Dimensions.get('screen').width - 50;
const height = Dimensions.get('screen').height / 1.15;

const Detail = ({entry, modalVisible, onClose}) => {
  const [noticeVisible, setNoticeVisible] = useState(false);
  const [noticeEntry, setNoticeEntry] = useState(entry);
    const {user} = useContext(AuthContext);
  const Stars = score => {
    var tp = parseFloat(score.starsNum);
    var starsIcon = [];
    let cnt = 0;
    for (let i = 0; i < 5; i++) {
      if (tp >= 1) {
        starsIcon.push(
          <Icon key={cnt} name={'star'} color={'#ffc56b'} size={24} />,
        );
        tp = tp - 1;
      } else if (tp == 0) {
        starsIcon.push(
          <Icon key={cnt} name={'star-o'} color={'#ffc56b'} size={24} />,
        );
      } else {
        starsIcon.push(
          <Icon
            key={cnt}
            name={'star-half-empty'}
            color={'#ffc56b'}
            size={24}
          />,
        );
        tp = 0;
      }
      cnt += 1;
    }
    return (
      <View style={styles.starStyle}>
        <Text style={{fontSize:20,bottom:2}}>{score.starsNum} </Text>
        {starsIcon}
      </View>
    );
  };
  return (
    (
      <Modal transparent={true} visible={modalVisible}>
        <Notice
          entry={noticeEntry} //傳進去的資料參數
          noticeVisible={noticeVisible} //可不可見
          onClose={() => {
            //console.log('1.3s --2');
            setNoticeVisible(false);
            onClose();
          }} //關閉函式
        />
        <View style={styles.modalBackGround}>
          <View style={styles.modalContainer}>
            {/* <View style={styles.header}>
              <TouchableOpacity onPress={() => onClose()} style={{flex: 1}}>
                <View style={styles.iconContainer}>
                  <Icons name="cross" size={45} color={'#5f695d'} />
                </View>
              </TouchableOpacity>
            </View> */}
            <View style={styles.topContainer}>
            <View style={styles.imageContainer}>
            <Image style={styles.image} source={Image_link[entry['name']]} />
            <Icons name="cross" size={42} color={'#5f695d'} onPress={() => onClose()} style={styles.iconStyle}/>
            </View>
            <View style={styles.spaceContainer}></View>
            </View>
            <View style={styles.infoBack}>
            <View style={styles.infoContainer}>
              <ScrollView>
                <View style={styles.infoStyle}>
                <Text style={styles.textStyle2}>{entry['name']}</Text>
                  <Stars starsNum={entry['star']} />
                  <Text style={styles.infoTitle}>
                    {'\n'}
                    <Icon name="map-marker" size={25} color={'#5f695d'} />
                    地址
                  </Text>
                  <Text style={styles.infoTextStyle}>
                    {entry['address']}
                    {'\n'}
                  </Text>
                  <Text style={styles.infoTitle}>
                    <Icon name="clock-o" size={23} color={'#5f695d'} />
                    營業時間
                  </Text>
                  <Text style={styles.infoTextStyle}>
                    {entry['time']}
                    {'\n'}
                  </Text>
                  <Text style={styles.infoTitle}>
                    <Icon name="info-circle" size={23} color={'#5f695d'} />
                    簡介
                  </Text>
                  <Text style={styles.infoTextStyle}>
                    {entry['info']}
                    {'\n'}
                  </Text>
                  <Text style={styles.infoTitle}>
                    <Icon3 name="weather-cloudy" size={23} color={'#5f695d'} />
                    天氣
                  </Text>
                  <Weather 
                    city={entry['city']}
                    region={entry['region']}/>
                </View>
              </ScrollView>
            </View>
            </View>
            {
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                    if(user){
                        const users = firestore().collection('users').doc(user.uid);
                        users.collection('list').doc(entry['name'])
                        .set({
                            id: entry['id'],
                            type: entry['type'],
                            place_id: entry['place_id'],
                            check: false,
                        })
                        //console.log(entry['name']);
                    }
                  setNoticeVisible(!noticeVisible);
                  setNoticeEntry(entry);
                  //console.log('plus2');
                }}
                style={{flex: 1}}>
                  <View style={styles.buttonTextContainer}>
                  <Text style={styles.buttonText}>加</Text>
                  <Text style={styles.buttonText}>入</Text>
                  <Text style={styles.buttonText}>清</Text>
                  <Text style={styles.buttonText}>單</Text>
                  </View>
                
              </TouchableOpacity>
            </View>
            }
          </View>
        </View>
      </Modal>
    )
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    width: '100%',
    backgroundColor: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '95%',
    height,
    //height: 600,
    backgroundColor: 'white',
    //paddingHorizontal: 20,
    //paddingVertical: 20,
    //padding: 5,
    borderRadius: 20,
    elevation: 20,
    //flex:1,
  },
  header: {
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  iconContainer: {
    //position: 'absolute',
    top: 2,
    //backgroundColor: '#D1DED7',
    width: 48,
    height: 48,
    alignSelf: 'flex-end',
    //justifycontent: 'flex-start',
    //justifyContent:'left',
    borderRadius: 30,
    right: 2,
  },
  iconStyle:{
    position:'absolute',
    top: '2%',
    right: '2%',
    backgroundColor:'rgba(255,255,255,0.6)',
    borderRadius:20,
  },
  topContainer:{
    flex:9,
    //backgroundColor:'#ffc56b',
    backgroundColor:'#D1DED7',
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageContainer:{
    backgroundColor:'#ffc56b',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 50,
    flex:9,
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'center',
  },
  spaceContainer:{
    backgroundColor:'rgba(0,0,0,0)',
    //bottom:'10%',
    flex:1,
  },
  space:{
    //borderBottomRightRadius: 50,
    //backgroundColor:'#ffc56b',
    //borderTopLeftRadius:50,
    //borderTopRightRadius:10,
    flex:1,
  },
  textStyle: {
    fontSize: 26,
    fontWeight: 'bold',
    left: 20,
    top: 1,
  },
  textStyle2: {
    fontSize: 26,
    fontWeight: 'bold',
    //alignSelf: 'center',
    letterSpacing:2,
  },
  infoStyle: {
    flex: 1,
    width: 335,
    alignSelf: 'center',
    marginTop: 20,
    //backgroundColor:'#000000',
  },
  infoTitle: {
    fontSize: 22,
    //alignSelf: 'center',
    letterSpacing: 10,
    //textAlign: 'center',
  },
  infoTextStyle: {
    fontSize: 18,
    //alignSelf: 'center',
    letterSpacing: 4,
    //textAlign: 'center',
    paddingTop:10,
  },
  buttonContainer: {
    backgroundColor:'#D1DED7',
    //backgroundColor: '#ffc56b',//較淺黃
    //width: 150,
    //height: 45,
    //flexDirection: 'row',
    //flex: 1.2,
    //borderRadius: 25,
    alignSelf: 'center',
    flex:2,
    width:'100%',
    borderTopLeftRadius:50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  infoBack:{
    flex: 14,
    //backgroundColor:'#ffc56b',
    backgroundColor:'#D1DED7',
  },
  infoContainer: {
    backgroundColor:'white',
    borderBottomRightRadius:50,
    borderTopLeftRadius:50,
    padding:5,
  },
  buttonTextContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    paddingLeft:'18%',
    paddingRight:'18%',
  },
  buttonText: {
    fontWeight: '800',
    fontSize: 24,
    color: '#6b5238',
    top: 9,
    alignSelf: 'center',
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  starStyle: {
    flex: 1,
    flexDirection: 'row',
    //alignSelf: 'center',
    top:8,
    //color:'#f5f6a3',
  },
});

export default Detail;
