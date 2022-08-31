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
import Schedule from '../media/Schedule';
import Post from '../media/Post';
import Nav from './Nav';
import List from '../list/List';
import PersonalFile from '../personal/PersonalFile';
import Collect from '../personal/Collect/Collect';
import HistoryHome from '../personal/history/HistoryHome';
import TripForhistory from '../personal/history/TripForhistory';
import ItineraryHome from '../final/ItineraryHome'
import PersonalHome from '../personal/PersonalHome';
import ChooseTrip from '../media/choose/ChooseTrip';
const Stack=createStackNavigator();

export default class Home extends Component {
  render() {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{header: () => null}} >
            <Stack.Screen name="Nav" component={Nav}/>
            <Stack.Screen name="Schedule" component={Schedule}/>
            <Stack.Screen name="PersonalFile" component={PersonalFile}/>
            <Stack.Screen name="Post" component={Post}/>
            <Stack.Screen name="List" component={List}/>
            <Stack.Screen name="Collect" component={Collect}/>
            <Stack.Screen name="HistoryHome" component={HistoryHome}/>
            <Stack.Screen name="TripForhistory" component={TripForhistory}/>
            <Stack.Screen name="ItineraryHome" component={ItineraryHome}/>
            {/* <Stack.Screen name="PersonalHome" component={PersonalHome}/> */}
            <Stack.Screen name="ChooseTrip" component={ChooseTrip}/>
        </Stack.Navigator>
    );
  }
}
