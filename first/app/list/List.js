import React,{Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  //TouchableOpacity,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
//import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigator } from "react-navigation";
import 'react-native-gesture-handler';
import ListHome from './ListHome';
import Map from '../map/Map'
import MapHome from '../map/MapHome'
import ItineraryHome from '../final/ItineraryHome'

const Stack=createStackNavigator();

export default class Theme extends Component {
  render() {
    return (
        <Stack.Navigator initialRouteName="List" screenOptions={{header: () => null}} >
          <Stack.Screen name="ListHome" component={ListHome}/>
          <Stack.Screen name="MapHome" component={MapHome}/>
          <Stack.Screen name="ItineraryHome" component={ItineraryHome}/>
          {/* <Stack.Screen name="Map" component={Map}/> */}
        </Stack.Navigator>
    );
  }
}
