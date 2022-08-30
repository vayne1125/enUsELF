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
import MapHome from './MapHome';

const Stack = createStackNavigator();

export default class Theme extends Component {
  render() {
    console.log("map: ",this.props.route.params);
    return (
        <Stack.Navigator initialRouteName = "MapHome" screenOptions={{header: () => null}} >
          <Stack.Screen name = "MapHome" component={MapHome} >{props=>(navigation.param)}</Stack.Screen>
          {/* <Stack.Screen name="Map" component={Map}/> */}
        </Stack.Navigator>
    );
  }
}
