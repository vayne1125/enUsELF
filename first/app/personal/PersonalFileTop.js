import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Entypo';
//import Icon from 'react-native-vector-icons/FontAwesome';

const PersonalFileTop = ({userdata}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <View style={styles.iconContainer}/>
        <Text style={styles.textStyle}>編輯個人檔案</Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => {navigation.goBack();}} style={{flex: 1}}>
                <Text style={styles.buttonText}>關閉</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin:20,
    left:0,
  },
  iconContainer: {
   // right: 340,
   // top: 8,
    //backgroundColor: '#D1DED7',
    flex:1,
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 30,
  },
  textStyle: {
    right:40,
    //top: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5f695d',
    letterSpacing: 2,
    //flex:1,
  },
  buttonContainer: {
    //flex:0.5,
    backgroundColor: '#5f695d',
    //flex: 1,
    width: 65,
    //alignSelf: 'flex-end',
   // left:320,
    //bottom: 10,
    borderRadius: 3,
    height: 25,
   // top:13,
    //flexDirection: 'row',
  },
  buttonText: {
    fontWeight: '800',
    fontSize: 17,
    color: 'white',
   // top: 1,
   //alignItems:'center', 
   //alignContent:'center',
   letterSpacing: 2,
    left: 15,
  },
});

export default PersonalFileTop;