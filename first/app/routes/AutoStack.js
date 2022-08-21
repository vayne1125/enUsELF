import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Home from '../nav/Home';
import Launcher from '../launcher/Launcher';

const Stack=createStackNavigator();

export default class AutoStack extends Component {
  render() {
    return (
        <Stack.Navigator initialRouteName="AutoStack" screenOptions={{header: () => null}} >
          <Stack.Screen name="Launcher" component={Launcher}/>
          <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>
    );
  }
}
