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
  ScrollView,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Notice from '../theme/Notice';
import Weather from './Weather';
import Image_link from '../theme/Image';

const width = Dimensions.get('screen').width - 50;
const height = Dimensions.get('screen').height / 1.3;

const DetailForMap = ({entry, modalVisible, onClose,onPress1}) => {
  const [noticeVisible, setNoticeVisible] = useState(false);
  const [noticeEntry, setNoticeEntry] = useState(entry);
  const Stars = score => {
    var tp = parseFloat(score.starsNum);
    var starsIcon = [];
    let cnt = 0;
    for (let i = 0; i < 5; i++) {
      if (tp >= 1) {
        starsIcon.push(
          <Icon key={cnt} name={'star'} color={'#ffb129'} size={24} />,
        );
        tp = tp - 1;
      } else if (tp == 0) {
        starsIcon.push(
          <Icon key={cnt} name={'star-o'} color={'#ffb129'} size={24} />,
        );
      } else {
        starsIcon.push(
          <Icon
            key={cnt}
            name={'star-half-empty'}
            color={'#ffb129'}
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
            setNoticeVisible(false);
            onClose();
          }} //關閉函式
        />
        <View style={styles.modalBackGround}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => onClose()} style={{flex: 1}}>
                <View style={styles.iconContainer}>
                  <Icons name="cross" size={45} color={'#5f695d'} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
              <ScrollView>
                <Image style={styles.image} source={entry['source']} />
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
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  setNoticeVisible(!noticeVisible);
                  setNoticeEntry(entry);
                  //console.log(entry);
                  onPress1(entry);
                }}
                style={{flex: 1}}>
                <Text style={styles.buttonText}>加入行程表</Text>
              </TouchableOpacity>
            </View>
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
    padding: 5,
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
  image: {
    width: 335,
    height: 195,
    top: 6,
    borderRadius: 10,
    alignSelf: 'center',
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
    alignSelf: 'center',
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
    alignSelf: 'center',
    letterSpacing: 10,
    textAlign: 'center',
  },
  infoTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    letterSpacing: 4,
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: '#fbb856', //較深黃
    //backgroundColor: '#ffc56b',//較淺黃
    width: 150,
    alignSelf: 'center',
    borderRadius: 25,
    //height: 45,
    //flexDirection: 'row',
    flex: 1.2,
  },
  infoContainer: {
    flex: 14,
    //backgroundColor:'#000000',
  },
  buttonText: {
    fontWeight: '800',
    fontSize: 18,
    color: '#6b5238',
    top: 9,
    letterSpacing: 10,
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
    alignSelf: 'center',
    top:8,
    //color:'#f5f6a3',
  },
});

export default DetailForMap;
