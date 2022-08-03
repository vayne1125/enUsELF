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

const sites = [
    {
      id: 1,
      name: '阿里山',
      img: require('../../assets/site6.jpg'),
      address: '嘉義縣阿里山鄉59號',
     },
    {
      id: 2,
      name: '日月潭',
      img: require('../../assets/site2.webp'),
      address: '南投縣魚池鄉日月村',
      star: 4.6,
    },
    {
      id: 3,
      name: '高美濕地',
      img: require('../../assets/site3.jpg'),
      address: '台中市清水區美堤街',
      star: 4.5,
    },
    {
      id: 4,
      name: '野柳地質公園',
      img: require('../../assets/site4.jpg'),
      address: '新北市萬里區野柳里港東路167-1號',
      star: 4.4,
    },
    {
      id: 5,
      name: '雪霸國家公園',
      img: require('../../assets/site5.webp'),
      address: '苗栗縣大湖鄉富興村水尾坪100號',
      star: 4.5,
    },
];

const Scheduleitem = () => {
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
                <View style={{flex: 2}}>
                    <TouchableOpacity
                        onPress={()=>{CheckDel()}}>
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.nameStyle}>{site.name}</Text>
                    </View>
                    <View style={styles.textContainer}>
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
  text: {
    left: -200,
    //right:,
    top: 20,
    fontSize:20,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 10,
  },
  container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  card: {
    height: 170,
    //backgroundColor:'#D1DED7',
    backgroundColor: '#ffffff',
    width:400,
    //marginHorizontal: 10,
    //borderRadius: 10,
    marginBottom: 15,
    //paddingTop:5,
    padding: 5,
    //right: 2,
    //borderColor: '#D1DED7',
    //borderWidth: 3,
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderBottomColor:'#D1DED7',
    borderRightWidth:3,
    borderRightColor:'#ffffff',
  },
  textStyle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 19,
    color: '#5f695d',
    top: 8,
    letterSpacing: 10,
  },
  image: {
    width: 160,
    height: 110,
    left:-35,
    borderRadius: 10,
  },
  textContainer: {
    flex: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    top: 13,
    right: 8,
    //position:'relative',
  },
  imageContainer: {
    flex: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  boxContainer:{
      flexDirection: 'column',
      flex:0.8,
      right:10,
      alignSelf: 'center',
      justifyContent:'center',
  },
  nameStyle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#5f695d',
    left: -20,
    top:20,
    letterSpacing: 1,
  },
  addressStyle: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 12,
      color: 'gray',
      left: -20,
      top:-15,
      letterSpacing: 1,
  },
});

export default Scheduleitem;