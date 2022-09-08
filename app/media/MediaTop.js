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
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Feather';
const Stack = createNativeStackNavigator();

const MediaTop = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>社群</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('List');
          }}
          style={{flex: 1}}>
          <Icon3
            name="plus-circle"
            size={33}
            color={'#5f695d'}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('List');
          }}
          style={{flex: 1}}>
          <Icon2
            name={'heart'}
            size={24}
            size={33}
            color={'#5f695d'}
            style={styles.iconStyle}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('List');
          }}
          style={{flex: 1}}>
          <Icons
            name="calendar-outline"
            size={33}
            color={'#5f695d'}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    //backgroundColor:'black'
    borderBottomWidth:1,
    borderColor:'#AAAAAA',
  },
  textContainer: {
    flex: 3,
    //backgroundColor:'yellow',
    // alignContent:'center',
    // alignSelf:'center',
    // justifyContent:'center',
  },
  textStyle: {
    //position: 'absolute',
    bottom: '25%',
    left: '3%',
    fontSize: 30,
    //fontWeight: 'bold',
    //color: '#ffffff',
    color: '#5f695d',
    fontFamily: 'NotoSerifTC-Bold',
    letterSpacing: 10,
  },
  iconStyle: {
    //top: 5,
    //left: 8,
    //top: '30%',
    //left: '86%',
  },
  iconContainer: {
    //flex: 2, //last
    flex:1,
    flexDirection: 'row',
    //backgroundColor:'black',
    //position: 'absolute',
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'space-around',
    //width: 48,
    //height: 48,
    borderRadius: 30,
    
  },
});

export default MediaTop;
