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
import Result from './Result';
import ThemeHome from './ThemeHome';
import List from '../list/List';

const Stack=createStackNavigator();

export default class Theme extends Component {
  render() {
    return (
      //<NavigationContainer>
        <Stack.Navigator initialRouteName="ThemeHome" screenOptions={{header: () => null}} >
          <Stack.Screen name="ThemeHome" component={ThemeHome}/>
          <Stack.Screen name="Result" component={Result}/>
          <Stack.Screen name="List" component={List}/>
        </Stack.Navigator>
      //</NavigationContainer>
      //   <Button
      //     onPress={()=>this.props.navigation.navigate()}
      //   />
    );
  }
}
