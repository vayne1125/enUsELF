import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Signup from './Signup';
import LauncherHome from './LauncherHome';
import Forget from './Forget';

const Stack = createStackNavigator();

export default class Launcher extends Component {
  render() {
    return (
        <Stack.Navigator initialRouteName="LauncherHome" screenOptions={{header: () => null}} >
            <Stack.Screen name="LauncherHome" component={LauncherHome} />
            <Stack.Screen name="Forget" component={Forget}/>
        </Stack.Navigator>
    );
  }
}

