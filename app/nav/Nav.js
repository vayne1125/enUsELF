import React from 'react';
import {
  StyleSheet,
  Animated,
  Easing
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === 'Theme') {
            iconName = focused ? 'apps' : 'apps-outline';
            size = focused ? size + 8 : size + 3;
          } else if (route.name === 'Media') {
            iconName = focused ? 'people' : 'people-outline';
            size = focused ? size + 8 : size + 3;
          } else if (route.name === 'Personal') {
            iconName = focused ? 'settings' : 'settings-outline';
            size = focused ? size + 8 : size + 3;
          } else {
            size = 0;
          }
          
          if (focused) {
            return <Icons name={iconName} size={size} color={color} />
          } else {
            return <Icons name={iconName} size={size} color={color} />
          }
        },
        tabBarActiveTintColor: '#88bd80',//按下:灰色9/14
        tabBarInactiveTintColor: '#5f695d',//沒按9/14
        headerShown: false,//不顯示在標頭
        tabBarStyle: {  //底下bar的圓弧和陰影設計
          backgroundColor: '#ffffff',
          elevation: 0,
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
    borderRadius: 20,
    justifyContent: 'center',
  }
});

export default Nav;
