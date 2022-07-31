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

const ScheduleButton = () => {
    const navigation = useNavigation();
    return(
      <View style = {styles.Container}>
      <View style={styles.ChanceContainer}>
          <Text style={styles.ChanceText}>全選</Text>
      </View>
      <TouchableOpacity onPress={()=>{navigation.navigate("List")}}>
       <View  style={styles.OkContainer}>
         <Text style={styles.OkText}>完成</Text>
        </View>
      </TouchableOpacity>
  </View>
    );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,   
    backgroundColor:"#88bd80", 
    flexDirection: 'row',
  },
  ChanceContainer:{
    backgroundColor: '#ffffff',
    flex: 0.7,
  },
  ChanceText: {
    //position: 'absolute',
    left:10,
    top: 150,
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 4,
  },
  OkContainer: {
    backgroundColor: '#88bd80',
    flex: 0.3,
  },
  OkText: {
    position: 'absolute',
    left: 15,
    top: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 10,
  },
});

export default ScheduleButton;