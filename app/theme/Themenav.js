import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    Button,
    Animated,
    Easing
    //TouchableOpacity,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
//import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createStackNavigator, StackViewTransitionConfigs } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { StackNavigator } from "react-navigation";
import 'react-native-gesture-handler';
//import {ViewPropTypes} from 'deprecated-react-native-prop-types';

import Nature from './Nature';
import KOL from './KOL';
import Food from './Food';
import Hotel from './Hotel';
import Monuments from './Monuments';

const Stack = createStackNavigator();
// const config = {
//   animation: 'sping ',
//   config: {
//     stiffness: 1000,
//     damping: 500,
//     mass: 3,
//     overshootClamping: true,
//     restDisplacementThreshold: 0.01,
//     restSpeedThreshold: 0.01,
//   },
// };

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


export default class Home extends Component {
    render() {

        return (
            <Stack.Navigator initialRouteName="Food" screenOptions={{ header: () => null }} >
                <Stack.Screen name="Food" component={Food} options={{
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                    cardStyleInterpolator: forSlide
                }} />
                <Stack.Screen name="Nature" component={Nature} options={{
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                    cardStyleInterpolator: forSlide
                }}
                />
                <Stack.Screen name="KOL" component={KOL} options={{
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                    cardStyleInterpolator: forSlide
                }} />
                <Stack.Screen name="Monuments" component={Monuments} options={{
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                    cardStyleInterpolator: forSlide
                }} />
                <Stack.Screen name="Hotel" component={Hotel} options={{
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                    cardStyleInterpolator: forSlide
                }} />
            </Stack.Navigator >
        );
    }
}

