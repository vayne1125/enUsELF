import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView,Dimensions} from 'react-native';
const{width,height}=Dimensions.get("window")

export default class Launcher extends Component {
  render() {
    return (
      <View>     
          <Image
            source={require('../../assets/login.png')}
            style={{width:width,height}}/>
      </View>
    );
  }
}