import React, { useState, useContext, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  DeviceEventEmitter,
  Linking,
  ToastAndroid,
} from 'react-native';
import Icons from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

import Notice from './Notice';
import Weather from '../data/Weather';
import ThemeImg from '../data/ThemeImg';
import { AuthContext } from '../routes/AutoProvider';

const height = Dimensions.get('screen').height / 1.15;

const Detail = ({entry, modalVisible, onClose, uncheck, check}) => {
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


  const OpenURLButton = ({url}) => {
    const handlePress = useCallback(async () => {
      
      const supported = await Linking.openURL(url);

      if (supported) {
        ToastAndroid.show("正在開啟連結", ToastAndroid.SHORT);

        //await Linking.openURL(url);
      } else {
        ToastAndroid.show("該地點目前未提供即時影像", ToastAndroid.SHORT);
        console.error("Detail_openExternalLink: ", url);
      }
    }, [url]);                            
    return (
      <TouchableOpacity onPress={handlePress} style={{ flex: 1 }}>
        <Text style={styles.WeatherButText}>即時天氣影像</Text>
      </TouchableOpacity>
    );
  };
  
  const handleAddToList = () => {
    if (user) {
      const users = firestore().collection('users').doc(user.uid);
      users.collection('list').doc(entry['name']).set({
        id: entry['id'],
        type: entry['type'],
        place_id: entry['place_id'],
        check: false,
      }).then(() => {
        DeviceEventEmitter.emit('change', entry['name'], false);
      });
    }
    setNoticeVisible(true);
    setNoticeEntry(entry);
  };
  let URL = 'https://tw.live/alishan/';
  return (
    (
      <Modal transparent={true} visible={modalVisible}>
        <Notice
          entry={noticeEntry} //傳進去的資料參數
          noticeVisible={noticeVisible} //可不可見
          onClose={() => {
            setNoticeVisible(false);
            onClose();
          }} //關閉函式
        />
        <View style={styles.modalBackGround}>
          <View style={styles.modalContainer}>
            <View style={styles.topContainer}>
            <View style={styles.imageContainer}>
            <Image style={styles.image} source={ThemeImg[entry['name']]} />
            <Icons name="cross" size={42} color={'#5f695d'} onPress={() => {onClose()}} style={styles.iconStyle}/>
            </View>
            <View style={styles.spaceContainer}></View>
            </View>
            <View style={styles.infoBack}>
              <View style={styles.infoContainer}>
                <ScrollView>
                  <View style={styles.infoStyle}>
                    <Text style={styles.siteNameStyle}>{entry['name']}</Text>
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
                        <View style={styles.WeatherButContainer}>
                          <OpenURLButton url={URL} />
                        </View>
                      </Text>
                      <Weather 
                        city={entry['city']}
                        region={entry['region']}
                      />
                    </View>
                </ScrollView>
              </View>
            </View>
            {uncheck?
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleAddToList} style={{ flex: 1 }}>
                <View style={styles.buttonTextContainer}>
                  <Text style={styles.buttonText}>加</Text>
                  <Text style={styles.buttonText}>入</Text>
                  <Text style={styles.buttonText}>清</Text>
                  <Text style={styles.buttonText}>單</Text>
                </View>           
              </TouchableOpacity>
            </View>:
            <View style={styles.buttonContainer}>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>已</Text>
                <Text style={styles.buttonText}>加</Text>
                <Text style={styles.buttonText}>入</Text>
                <Text style={styles.buttonText}>清</Text>
                <Text style={styles.buttonText}>單</Text>
              </View>           
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
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 20,
  },
  topContainer:{
    flex:9,
    backgroundColor:'#D1DED7',
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageContainer:{
    backgroundColor:'#D1DED7',
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
  iconStyle:{
    position:'absolute',
    top: '2%',
    right: '2%',
    backgroundColor:'rgba(255,255,255,0.6)',
    borderRadius:20,
  },
  spaceContainer:{
    backgroundColor:'rgba(0,0,0,0)',
    flex:1,
  },
  infoBack:{
    flex: 14,
    backgroundColor:'#D1DED7',
  },
  infoContainer: {
    backgroundColor:'white',
    borderBottomRightRadius:50,
    borderTopLeftRadius:50,
    padding:5,
  },
  siteNameStyle: {
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing:2,
    color: "#000000"
  },
  starStyle: {
    flex: 1,
    flexDirection: 'row',
    top:8,
  },
  infoStyle: {
    flex: 1,
    width: 335,
    alignSelf: 'center',
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 20,
    letterSpacing: 10,
    color: "#000000",
  },
  infoTextStyle: {
    fontSize: 16,
    letterSpacing: 4,
    paddingTop:10,
    color: "#000000",
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  buttonContainer: {
    backgroundColor:'#D1DED7',
    alignSelf: 'center',
    flex:2,
    width:'100%',
    borderTopLeftRadius:50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    color: "#000000",
  },
  WeatherButText: {
    fontSize: 11, 
    color: '#606060', 
    paddingTop:15,
  },
});

export default Detail;
