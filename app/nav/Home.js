import React, { Component } from 'react';
import {
  Animated,
  Easing
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Schedule from '../media/Schedule';
import Post from '../media/Post';
import Nav from './Nav';
import List from '../list/List';
import PersonalFile from '../personal/PersonalFile';
import HistoryHome from '../personal/history/HistoryHome';
import TripForhistory from '../personal/history/TripForhistory';
import ItineraryHome from '../final/ItineraryHome'
import ChooseTrip from '../media/choose/ChooseTrip';
import Time from '../final/time/Time';

const Stack = createStackNavigator();

const forSlideX = ({ current, next, inverted, layouts: { screen } }) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next? next.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }) : 0
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


const forSlideY = ({ current, next, inverted, layouts: { screen } }) => {
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
          translateY: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.height, // Focused, but offscreen in the beginning
                0, // Fully focused
                screen.height * -0.3, // Fully unfocused
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


export default class Home extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Home" screenOptions={{ header: () => null }} >
        <Stack.Screen name="Nav" component={Nav} />
        <Stack.Screen name="Schedule" component={Schedule} options={{
          transitionSpec: {
            open: config,
            close: config,
          },
          cardStyleInterpolator: forSlideX
        }} />
        <Stack.Screen name="PersonalFile" component={PersonalFile} />
        <Stack.Screen name="Post" component={Post} options={{
          transitionSpec: {
            open: config,
            close: config,
          },
          cardStyleInterpolator: forSlideY
        }} />
        <Stack.Screen name="List" component={List} options={{
          transitionSpec: {
            open: config,
            close: config,
          },
          cardStyleInterpolator: forSlideY
        }} />
        <Stack.Screen name="HistoryHome" component={HistoryHome} />
        <Stack.Screen name="TripForhistory" component={TripForhistory} />
        <Stack.Screen name="ItineraryHome" component={ItineraryHome} />
        <Stack.Screen name="ChooseTrip" component={ChooseTrip} />
        <Stack.Screen name="Time" component={Time} options={{
          transitionSpec: {
            open: config,
            close: config,
          },
          cardStyleInterpolator: forSlideX
        }} />
      </Stack.Navigator >
    );
  }
}
