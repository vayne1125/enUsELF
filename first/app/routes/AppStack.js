import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Home from '../nav/Home';

const Stack = createStackNavigator();

export default class AppStack extends Component {
  render() {
    return (
        <Stack.Navigator initialRouteName = "AppStack" screenOptions={{header: () => null}} >
          <Stack.Screen name = "Home" component={Home}/>
        </Stack.Navigator>
    );
  }
}
