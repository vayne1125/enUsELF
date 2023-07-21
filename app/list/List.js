import React, { Component } from 'react';
import {
  Animated,
  Easing
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import ListHome from './ListHome';
import MapHome from '../map/MapHome'
import ItineraryHome from '../final/ItineraryHome'

const Stack = createStackNavigator();
const forSlideX = ({ current, next, inverted, layouts: { screen } }) => {
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
export default class Theme extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="List" screenOptions={{ header: () => null }} >
        <Stack.Screen name="ListHome" component={ListHome} />
        <Stack.Screen 
          name="MapHome"
          component={MapHome}
          options={{
            transitionSpec: {
              open: config,
              close: config,
            },
            cardStyleInterpolator: forSlideX
          }}
        />
        <Stack.Screen 
          name="ItineraryHome" 
          component={ItineraryHome} 
          options={{
            transitionSpec: {
              open: config,
              close: config,
            },
            cardStyleInterpolator: forSlideX
          }}
        />
      </Stack.Navigator>
    );
  }
}
