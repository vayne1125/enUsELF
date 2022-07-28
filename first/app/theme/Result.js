// import {Component} from 'react';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';

const Result = ({navigation, route}) => {
  const themeName = route.params;
  return (
    <View tyle={{flex:1,}}>
      <Text>{themeName.name}123</Text>
    </View>
  );
};
export default Result;
