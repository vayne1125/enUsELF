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
import Icon from 'react-native-vector-icons/FontAwesome5';

const ScheduleTop = props => {
  const navigation = useNavigation();
  const aurInfo = props;
  const sites = props.sites;

  const navToMap = (data) =>{
    navigation.navigate("ItineraryHome", {
      tripname:data.name,
      origin:data.origin,
      desSite:data.desSite,
      site:data.site,
      from:"history",
    });
  }

  //嘉羽sites
  //console.log('資料 ',sites);
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{flex:2,top:2,}}>
        <View style={styles.iconContainer2}>
          <Icons
            name="chevron-back-circle-outline"
            size={28}
            color={'white'}
            style={styles.iconStyle2}
          />
        </View>
        </TouchableOpacity>
        <View style={{flex:10,justifyContent:'center',top:12,}}>
        <Text style={styles.textStyle}>{aurInfo.name}的行程</Text>
        </View>
        {(sites!=null)?
        <TouchableOpacity 
          onPress={()=>{
            navToMap(sites);
            //console.log('嘉羽地圖')
          }}
          style={{flex:3,top:2,}}>
        <View style={styles.iconContainer2}>
          <Icon
            name="map-marked-alt"
            size={28}
            color={'white'}
            style={styles.iconStyle2}
          />
        </View>
        </TouchableOpacity>:null
        }
      </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    //position: 'absolute',
   // top: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing:4,
  },
  container: {
    flexDirection: 'row',
  },
  iconStyle: {
    top: 5,
    left: 8,
  },
  iconContainer2:{
    //position: 'absolute',
    //left: 11,
    top: 14,
    width: 50,
    height: 35,
    alignSelf: 'center',
    borderRadius: 10,
    flew:1,
  },
  iconStyle2: {
    left: 8,
  },
});

export default ScheduleTop;
