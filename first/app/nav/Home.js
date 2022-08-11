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
import Schedule from '../media/Schedule';
import Post from '../media/Post';
import Nav from './Nav';
import List from '../list/List';

const Stack=createStackNavigator();

export default class Home extends Component {
  render() {
    return (
        <Stack.Navigator initialRouteName="Nav" screenOptions={{header: () => null}} >
          <Stack.Screen name="Nav" component={Nav}/>
          <Stack.Screen name="Schedule" component={Schedule}/>
          <Stack.Screen name="Post" component={Post}/>
          <Stack.Screen name="List" component={List}/>
        </Stack.Navigator>
    );
  }
}
