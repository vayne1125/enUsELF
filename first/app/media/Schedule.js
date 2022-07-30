import React, {Component} from 'react';
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
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';

import ScheduleTop from './ScheduleTop';
import ScheduleButton from './ScheduleButton';
const Stack = createNativeStackNavigator();
const width = Dimensions.get('screen').width;

export default class Media extends Component {
  render() {
    return (
      <View style={styles.Container}>
            <View style={styles.topbar}>
                <ScheduleTop/>
            </View>
              <View style={styles.items}>
                <Text style={styles.textStyle}>目前是空的</Text>
                <Icons name="person" size={300} color={'#a0522d'}/>
               
            </View>

            <View style={styles.buttonbar}>
                <ScheduleButton/>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  topbar: {
    backgroundColor: '#5f695d',
    //flex:1,
    height: 63,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    //opacity: 0.9,
  },
  Container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  
  image: {
    width: 230,
    height: 140,
    top: 6,
    borderRadius: 10,
    left: 2,
  },
  items: {
    flex: 1.5,
    alignItems:'center',
    justifyContent:'center',
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
  imageContainer: {
    flex: 3,
    alignItems: 'center',
    padding: 3,
  },
  buttonbar: {
     backgroundColor: '#5f695d',
     flex:0.2,
     height: 200,
      //opacity: 0.9,
  },
});
