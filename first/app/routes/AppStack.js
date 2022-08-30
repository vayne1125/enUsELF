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
import Home from '../nav/Home'
import Loading from '../launcher/Loading';

const Stack = createStackNavigator();

export default class AppStack extends Component {
  render() {
    return (
        <Stack.Navigator initialRouteName="AppStack" screenOptions={{header: () => null}} >
            <Stack.Screen name='Loading' component={Loading}/>
            <Stack.Screen name='Home' component={Home}/>
        </Stack.Navigator>
    );
  }
}
