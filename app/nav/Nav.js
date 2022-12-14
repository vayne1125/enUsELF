// import {Component} from 'react';
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';
//import {TabNavigator} from '@react-navigation/native'
//import TabNavigator from 'react-native-tab-navigator';
//import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';

import Theme from '../theme/Theme'
import Media from '../media/Media';
import Personal from '../personal/Personal';

const Tab = createBottomTabNavigator();

const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      })
      : 0
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                0, // Fully focused
                screen.width * -0.3, // Fully unfocused
              ],
              extrapolate: 'clamp',
            }),
            inverted
          ),
        },
      ],
    },
  };
};

const config = {
  duration: 300,
  easing: Easing.out(Easing.poly(4)),
  timing: Animated.timing,
};

const Nav = () => {
  return (
    //----底下bar------------------------------------
    <Tab.Navigator
      //initialRouteName="login"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          //let iconName = 'home';
          let iconName;
          if (route.name === 'Theme') {
            iconName = focused ? 'apps' : 'apps-outline';
            size = focused ? size + 8 : size + 3;
          } else if (route.name === 'Media') {
            iconName = focused ? 'people' : 'people-outline';
            size = focused ? size + 8 : size + 3;
          }
          else if (route.name === 'Personal') {
            iconName = focused ? 'settings' : 'settings-outline';
            size = focused ? size + 8 : size + 3;
          }
          else {
            size = 0;
          }
          if (focused)
            return (//<View style={styles.choose}>
              <Icons name={iconName} size={size} color={color} />
              //</View>
            )
          else
            return <Icons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#88bd80',//按下:灰色9/14
        //tabBarActiveTintColor: 'white',//按下
        tabBarInactiveTintColor: '#5f695d',//沒按9/14
        //tabBarInactiveTintColor: '#ffc56b',//沒按
        headerShown: false,//不顯示在標頭
        tabBarStyle: {  //底下bar的圓弧和陰影設計
          //backgroundColor: '#88bd80',
          //backgroundColor: '#6E877B',//9/14改
          backgroundColor: '#ffffff',
          //position: 'absolute',
          //bottom: 18,
          //left: 8,
          //right: 10,
          elevation: 0,
          //borderRadius: 20,
          //hight: 100,
          //width:380,
          width: '100%',
          ...styles.shadow,
        },
        tabBarShowLabel: false,
        cardStyleInterpolator: forSlide
      })}>
      <Tab.Screen name="Theme" component={Theme} options={{
        transitionSpec: {
          open: config,
          close: config,
        },
        cardStyleInterpolator: forSlide
      }} />
      <Tab.Screen name="Media" component={Media} options={{
        transitionSpec: {
          open: config,
          close: config,
        },
        cardStyleInterpolator: forSlide
      }} />
      <Tab.Screen name="Personal" component={Personal} options={{
        transitionSpec: {
          open: config,
          close: config,
        },
        cardStyleInterpolator: forSlide
      }} />
    </Tab.Navigator>

  );
};
const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    currend.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0]
  });

  return {
    leftButtonStyle: { opacity }
  };
}
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  choose: {
    flexDirection: 'row',
    backgroundColor: '#D1DED7',
    width: '70%',
    //height:'50%',
    //borderWidth:5,
    //borderColor:'#ffc56b',
    borderRadius: 20,
    justifyContent: 'center',
  }
});

export default Nav;
