import React, {Component} from 'react';
import { useState } from "react";
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
//import  CheckBox  from 'react-native-checkbox';
import CheckBox from './CheckBox'


const Scheduleitem = (userSchdule) => {
  const sites=userSchdule;
  console.log(sites);
    const Card = ({site}) => {
        const [isSelected, setSelection] = useState(false);
        return (
            <View style={styles.card}>
                <View style={styles.boxContainer}>
                <CheckBox/>
                </View>
                <View style={styles.imageContainer}>
                    {/*<Image style={{flex: 1, resizeMode: 'center'}} source={site.img} />*/}
                    {<Image style={styles.image} source={site.img} />}
                </View>
                <View style={{flex: 4,justifyContent:'space-around',padding:5,}}>
                    <TouchableOpacity
                        onPress={()=>{CheckDel()}}>
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.nameStyle}>{site.name}</Text>
                    </View>
                    <View style={styles.textContainer2}>
                        <Text style={styles.addressStyle}>{site.address}</Text>
                    </View>
                </View>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                marginTop: 25,
                paddingBottom: 80,
            }}
            numColumns={1}
            data={sites}
            renderItem={({item}) => <Card site={item} />}>     
            </FlatList>
        </View>
    );
};
const styles = StyleSheet.create({
  container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  card: {
    height: 155,
    //backgroundColor:'#D1DED7',
    backgroundColor: '#ffffff',
    width:'100%',
    //marginHorizontal: 10,
    //borderRadius: 10,
    marginBottom: 12,
    //paddingTop:5,
    padding: 3,
    //right: 2,
    //borderColor: '#D1DED7',
    //borderWidth: 3,
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderBottomColor:'#D1DED7',
    borderRightWidth:3,
    borderRightColor:'#ffffff',
    justifyContent:'space-around'
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    resizeMode:'cover',
  },
  textContainer: {
    flex: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent:'center',
    padding:5,
  },
  textContainer2: {
    flex: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent:'flex-start',
    padding:5,
    //backgroundColor:'#000000'
  },
  imageContainer: {
    flex: 4,
    alignItems: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  boxContainer:{
      flexDirection: 'column',
      flex:1,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent:'center',
  },
  nameStyle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    //color: '#D1DED7',
    color:'#5f695d',
    letterSpacing: 3,
    backgroundColor:'#D1DED7',
    //backgroundColor:'#5f695d',
    borderRadius: 10,
    paddingLeft:8,
    paddingRight:8,
  },
  addressStyle: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 14,
      color: 'gray',
      letterSpacing: 1,
  },
});

export default Scheduleitem;