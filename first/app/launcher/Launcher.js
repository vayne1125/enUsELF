import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView,Dimensions} from 'react-native';
const{width,height}=Dimensions.get("window")

export default class Launcher extends Component {
  render() {
    return (
      <View>     
          <Image
            source={require('../../assets/login.png')}
            //source={require('.../assets/login.png')}
            style={{width:width,height}}/>
      </View>
    );
  }
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },

  image: {
    flex: 1,
    alignItems: 'center',
  },
  tt: {
    flex: 1,
    color: '#f44336',
    justifyContent: 'flex-end',
    backgroundColor: 'red',
  },
});*/
