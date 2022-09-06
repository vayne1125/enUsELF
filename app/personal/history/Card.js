import React, {Component, useState, PureComponent, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  Modal,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const width = Dimensions.get('screen').width;
//const user = auth().currentUser;
export default class Card extends PureComponent  {
  render() {
    const trip = this.props.trip;
    console.log('tripname  ',trip);
    return (
      <View style={styles.card}>

        <View>
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.nameStyle}>
              {trip.name}
            </Text>
          </View>
          <View style={{flex:1,flexDirection:'row',marginBottom:8,}}>
          <View style={styles.buttonContainer2}>
            <TouchableOpacity
              onPress={() => {
                //this.props.navigation.navigate("TripForhistory",trip);
                this.props.onPress1();
              }}
              style={{flex: 2}}>
              <Text style={styles.buttonText2}>景點資訊</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.onPress2();
                console.log(this.props.name);
              }}
              style={{flex: 1}}>
              <Text style={styles.buttonText}>地圖顯示</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer3}>
          <TouchableOpacity
                    //返回建X
                    onPress={() => {
                      this.props.onPress3();
                    }}
                    style={{flex: 1}}>
                    <Icon
                        name="trash"
                        size={26}
                          color={'#BE2D23'}
                          style={styles.TopiconStyle}
                      />
                  </TouchableOpacity>
          </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    padding: 5,
    //flex: 2,
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderBottomColor: '#D1DED7',
    borderRightWidth: 3,
    borderRightColor: '#ffffff',
  },
  textContainer: {
    flex: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // alignSelf: 'center',
    // alignItems: 'center',
    top: 8,
  },
  nameStyle: {
    //alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#5f695d',
    left: 4,
    letterSpacing: 1,
  },
  buttonContainer: {
    backgroundColor: '#BEBEBE', //較深黃
    width: 120,
    alignSelf: 'flex-end',
    //left:5,
   // bottom: 4,
    marginLeft:8,
    borderRadius: 25,
    height: 32,
  },
  buttonText: {
    fontWeight: '800',
    fontSize: 16,
    color: '#6b5238',
    top: 6,
    letterSpacing: 10,
    left: 7,
  },
  buttonContainer2: {
  //  position: 'absolute',
    backgroundColor: '#CEFFCE', 
    width: 120,
    alignSelf: 'flex-end',
    //left:5,
   // bottom: 4,
    borderRadius: 25,
    height: 32,
  },
  buttonText2: {
    fontWeight: '800',
    fontSize: 16,
    top: 6,
    letterSpacing: 10,
    left: 7,
  },
  buttonContainer3: {
    alignSelf: 'flex-end',
    marginLeft:8,
    height: 30,
  },
});
