import React,{Component} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import PersonalHome from './PersonalHome';

const Stack=createStackNavigator();

export default class Personal extends Component {
  render() {
    return (
        <Stack.Navigator initialRouteName="PersonalHome" screenOptions={{header: () => null}} >
          <Stack.Screen name="PersonalHome" component={PersonalHome}/>
        </Stack.Navigator>
    );
  }
}