import React, {Component} from 'react';
import {View,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Launcher from './launcher/Launcher';
import Nav from './nav/Nav';
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
        <Nav />
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


// import * as React from 'react';
// import { Button, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// function DetailsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Details!</Text>
//     </View>
//   );
// }

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }

// function SettingsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }

// const HomeStack = createNativeStackNavigator();

// function HomeStackScreen() {
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen name="Home" component={HomeScreen} />
//       <HomeStack.Screen name="Details" component={DetailsScreen} />
//     </HomeStack.Navigator>
//   );
// }

// const SettingsStack = createNativeStackNavigator();

// function SettingsStackScreen() {
//   return (
//     <SettingsStack.Navigator>
//       <SettingsStack.Screen name="Settings" component={SettingsScreen} />
//       <SettingsStack.Screen name="Details" component={DetailsScreen} />
//     </SettingsStack.Navigator>
//   );
// }

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeStackScreen} />
//         <Tab.Screen name="Settings" component={SettingsStackScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
