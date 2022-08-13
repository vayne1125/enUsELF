import React,{Component,useState,createContext} from 'react';
import {View,StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './nav/Home';
import Signup from './launcher/Signup';
import Login from './launcher/Login';
import Forget from './launcher/Forget';

const Stack = createStackNavigator();
export default class App extends Component {
    render() {
      return (
        <NavigationContainer style={{flex:1}}>
            <Stack.Navigator initialRouteName="App" screenOptions={{header: () => null}}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup}/>
                <Stack.Screen name="Forget" component={Forget}/>
                <Stack.Screen name="Home" component={Home}/>
            </Stack.Navigator>
        </NavigationContainer>
      );
    }
}