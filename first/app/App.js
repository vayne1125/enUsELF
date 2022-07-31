import React, {Component} from 'react';
import {View,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Launcher from './launcher/Launcher';
//import Nav from './nav/Nav';
import Home from './nav/Home';
import Map from './map/Map';
import ListScreen from './list/List';

import Icons from 'react-native-vector-icons/Ionicons';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowLauncher: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isShowLauncher: false,
      });
    }, 2000);
  }

  render() {
    return (
       <NavigationContainer style={styles.container}>
      {
        this.state.isShowLauncher ? 
        <Launcher /> :
        <Home />
      }
      </NavigationContainer> 
    )  
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  }
})

