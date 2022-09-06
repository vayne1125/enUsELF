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
const Stack = createNativeStackNavigator();

const ResultTop = (props) => {
  const navigation = useNavigation();
  const themeInfo=props;
    return (
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{flex:1,}}>
        <View style={styles.iconContainer2}>
          <Icons
            name="chevron-back-circle-outline"
            size={33}
            color={'white'}
            style={styles.iconStyle2}
          />
        </View>
        </TouchableOpacity> */}
        <View style={{flex:4,}}>
        {/* <Text style={styles.textStyle}>{themeInfo.theme.name}</Text> */}
          <Text style={styles.textStyle}>主題分類</Text>
        </View>
        <TouchableOpacity onPress={()=>{navigation.navigate("List")}} style={{flex:1,}}>
        <View style={styles.iconContainer}>
          <Icons
            name="calendar-outline"
            size={33}
            color={'#5f695d'}
            style={styles.iconStyle}
          />
        </View>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  textStyle: {
    position: 'absolute',
    top: -10,
    left:10,
    fontSize: 30,
    //fontWeight: 'bold',
    //color: '#ffffff',
    color:'#5f695d',
    fontFamily:'NotoSerifTC-Bold',
    letterSpacing:10,
  },
  container: {
    flexDirection: 'row',
  },
  iconStyle: {
    top: 5,
    left: 8,
  },
  iconContainer: {
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
  iconContainer2:{
    position: 'absolute',
    left: 11,
    top: 14,
    width: 50,
    height: 35,
    alignSelf: 'center',
    borderRadius: 10,
  },
  iconStyle2: {
    left: 8,
  },
});

export default ResultTop;