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

const ListTop = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
      <Text style={styles.textStyle}>清單</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
            navigation.goBack();
        }}
        style={{flex: 1}}>
        <View style={styles.iconContainer}>
          <Icons
            name="cross"
            size={40}
            color={'#5f695d'}
            style={styles.iconStyle}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex:1,
    borderBottomWidth:1,
    borderColor:'#AAAAAA',
  },
  textContainer:{
    flex:4,
    // alignContent:'center',
    // alignSelf:'center',
    // justifyContent:'center',  
    //position:'absolute',
  },
  textStyle: {
    //alignContent:'center',
    //justifyContent:'center',
    bottom:'12%',
    left:'5%',
    fontSize: 26,
    //fontWeight: 'bold',
    //color: '#ffffff',
    color:'#5f695d',
    fontFamily:'NotoSerifTC-Bold',
    letterSpacing:10,
  },
  iconStyle: {
    //top: 5,
    //left: 8,
    top:'15%',
  },
  iconContainer: {
    flex:1,
    position: 'absolute',
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 30,
  },
});

export default ListTop;