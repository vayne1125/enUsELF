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
//import {ViewPropTypes} from 'deprecated-react-native-prop-types';
//import Schedule from './Schedule';
import MediaHome from './MediaHome';
//import List from '../list/List';
import Post from './Post';

const Stack=createStackNavigator();

export default class Theme extends Component {
  render() {
    return (
        <Stack.Navigator initialRouteName="MediaHome" screenOptions={{header: () => null}} >
          <Stack.Screen name="MediaHome" component={MediaHome}/>
          {/*<Stack.Screen name="Post" component={Post}>*/}
          {/* <Stack.Screen name="Schedule" component={Schedule}/> */}
          {/* <Stack.Screen name="List" component={List}/> */}
        </Stack.Navigator>
    );
  }
}
