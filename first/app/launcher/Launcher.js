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
import Signup from './Signup';
import Login from './Login';
import Forget from './Forget';

const Stack=createStackNavigator();

export default class Launcher extends Component {
  render() {
    return (
        <Stack.Navigator initialRouteName="LauncherHome" screenOptions={{header: () => null}} >
            <Stack.Screen name="Login" component={Login} />
            {/*<Stack.Screen name="Signup" component={Signup}/>*/}
            <Stack.Screen name="Forget" component={Forget}/>
        </Stack.Navigator>
    );
  }
}
