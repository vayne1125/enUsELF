import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import MapHome from './MapHome';

const Stack = createStackNavigator();

export default class Theme extends Component {
  render() {
    console.log("map: ",this.props.route.params);
    return (
        <Stack.Navigator initialRouteName = "MapHome" screenOptions={{header: () => null}} >
          <Stack.Screen name = "MapHome" component={MapHome} >{props=>(navigation.param)}</Stack.Screen>
        </Stack.Navigator>
    );
  }
}
