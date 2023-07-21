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
import Scheduleitem from './Scheduleitem';
const Stack = createNativeStackNavigator();
const width = Dimensions.get('screen').width;


const Schedule = ({navigation, route}) => {
  console.log('navigation ', navigation);
    const {userSchdule,username,sites} = route.params;
    return (
      <View style={styles.Container}>
        <View style={styles.topbar}>
          <ScheduleTop name={username} sites={sites}/>
        </View>
        {
          <View style={styles.items}>
            <Scheduleitem userSchdule={userSchdule}/>
          </View>
        }
        <View style={styles.buttonbar}>
          <ScheduleButton/>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  Container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  topbar: {
    backgroundColor: '#ffffff',
    flex:1,
  },
  items: {
    flex: 9.2,
    alignItems:'center',
    justifyContent:'center',
  },
  buttonbar: {
    flex:1.3,
  },
});
export default Schedule;
