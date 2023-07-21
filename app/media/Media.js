import React,{ Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import MediaHome from './MediaHome';

const Stack=createStackNavigator();

export default class Theme extends Component {
  render() {
    return (
        <Stack.Navigator initialRouteName="MediaHome" screenOptions={{header: () => null}} >
          <Stack.Screen name="MediaHome" component={MediaHome}/>
        </Stack.Navigator>
    );
  }
}
