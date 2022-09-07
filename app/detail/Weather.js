import React, {Component, useState, useEffect} from 'react';
import {Get} from 'react-axios';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import Moment from 'moment';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';

const initialState = {
  max_tem: [, , , , , ,],
  min_tem: [, , , , , ,],
  time: [, , , , , ,],
  icon_num: [, , , , , ,],
};

const icon = {
  "00": require('../../assets/weatherIcon/01.png'),//無
  "01": require('../../assets/weatherIcon/01.png'),
  "02":require('../../assets/weatherIcon/02.png'),
  "03":require('../../assets/weatherIcon/03.png'),
  "04":require('../../assets/weatherIcon/04.png'),
  "05":require('../../assets/weatherIcon/05.png'),
  "06":require('../../assets/weatherIcon/06.png'),
  "07":require('../../assets/weatherIcon/07.png'),
  "08":require('../../assets/weatherIcon/08.png'),
  "09":require('../../assets/weatherIcon/09.png'),
  "10":require('../../assets/weatherIcon/10.png'),
  "11":require('../../assets/weatherIcon/11.png'),
  "12":require('../../assets/weatherIcon/12.png'),
  "13":require('../../assets/weatherIcon/13.png'),
  "14":require('../../assets/weatherIcon/14.png'),
  "15":require('../../assets/weatherIcon/15.png'),
  "16":require('../../assets/weatherIcon/16.png'),
  "17":require('../../assets/weatherIcon/17.png'),
  "18":require('../../assets/weatherIcon/18.png'),
  "19":require('../../assets/weatherIcon/19.png'),
  "20":require('../../assets/weatherIcon/20.png'),
  "21":require('../../assets/weatherIcon/21.png'),
  "22":require('../../assets/weatherIcon/22.png'),
  "23":require('../../assets/weatherIcon/23.png'),
  "24":require('../../assets/weatherIcon/24.png'),
  "25":require('../../assets/weatherIcon/25.png'),
  "26":require('../../assets/weatherIcon/26.png'),
  "27":require('../../assets/weatherIcon/27.png'),
  "28":require('../../assets/weatherIcon/28.png'),
  "29":require('../../assets/weatherIcon/29.png'),
  "30":require('../../assets/weatherIcon/30.png'),
  "31":require('../../assets/weatherIcon/31.png'),
  "32":require('../../assets/weatherIcon/32.png'),
  "33":require('../../assets/weatherIcon/33.png'),
  "34":require('../../assets/weatherIcon/34.png'),
  "35":require('../../assets/weatherIcon/35.png'),
  "36":require('../../assets/weatherIcon/36.png'),
  "37":require('../../assets/weatherIcon/37.png'),
  "38":require('../../assets/weatherIcon/38.png'),
  "39":require('../../assets/weatherIcon/39.png'),
  "40":require('../../assets/weatherIcon/41.png'),//無
  "41":require('../../assets/weatherIcon/41.png'),
};
const day={
  "Mon":"週一",
  "Tue":"週二",
  "Wed":"週三",
  "Thu":"週四",
  "Fri":"週五",
  "Sat":"週六",
  "Sun":"週日",
}
const test = ({city, region}) => {
  const [result, setResult] = useState(initialState);
  const headers = {
    'Content-Type': 'application/json',
  };
  const url = 'http://10.0.2.2:8000/weather';
  const message = async () => {
    try {
      let res = await axios.get(url, {
        headers,
        params: {City: city, Region: region},
      });
      let result_ = res.data;
      setResult(result_);
      //console.log(result_);
      //console.log(result_['icon_num'][0]);
      //console.log(icon[result_['icon_num'][0]].src);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    message();
  }, []);

  return (
    <View style={styles.weatherContainer}>
      <View style={styles.container}>
        <Text>{day[Moment(result['time'][0]).format('ddd')]}</Text>
        <Image source={icon[result.icon_num[0]]} style={styles.image} />
        <Text>{result['max_tem'][0]}</Text>
        <Text>{result['min_tem'][0]}</Text>
      </View>
      <View style={styles.container}>
        <Text>{day[Moment(result['time'][1]).format('ddd')]}</Text>
        <Image source={icon[result.icon_num[1]]} style={styles.image} />
        <Text>{result['max_tem'][1]}</Text>
        <Text>{result['min_tem'][1]}</Text>
      </View>
      <View style={styles.container}>
        <Text>{day[Moment(result['time'][2]).format('ddd')]}</Text>
        <Image source={icon[result.icon_num[2]]} style={styles.image} />
        <Text>{result['max_tem'][2]}</Text>
        <Text>{result['min_tem'][2]}</Text>
      </View>
      <View style={styles.container}>
        <Text>{day[Moment(result['time'][3]).format('ddd')]}</Text>
        <Image source={icon[result.icon_num[3]]} style={styles.image} />
        <Text>{result['max_tem'][3]}</Text>
        <Text>{result['min_tem'][3]}</Text>
      </View>
      <View style={styles.container}>
        <Text>{day[Moment(result['time'][4]).format('ddd')]}</Text>
        <Image source={icon[result.icon_num[4]]} style={styles.image} />
        <Text>{result['max_tem'][4]}</Text>
        <Text>{result['min_tem'][4]}</Text>
      </View>
      <View style={styles.container}>
        <Text>{day[Moment(result['time'][5]).format('ddd')]}</Text>
        <Image source={icon[result.icon_num[5]]} style={styles.image} />
        <Text>{result['max_tem'][5]}</Text>
        <Text>{result['min_tem'][5]}</Text>
      </View>
      <View style={styles.container}>
        <Text>{day[Moment(result['time'][6]).format('ddd')]}</Text>
        <Image source={icon[result.icon_num[6]]} style={styles.image} />
        <Text>{result['max_tem'][6]}</Text>
        <Text>{result['min_tem'][6]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});
export default test;
