import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Feather';

import {AuthContext} from '../routes/AutoProvider';

const MediaTop = () => {
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const [userdata,setuserdata]=useState(null);
  const fetchPosts = async()=>{
    try{
    await firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then(documentSnapshot => {
      const data =documentSnapshot.data();
      setuserdata(data);
    })  
      }catch(e){
        console.log(e);
      };
    }

  useEffect(()=>{
        fetchPosts();
  },[]);
  
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>社群</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            console.log('11 ',userdata);
            navigation.navigate('Post',userdata);
          }}
          style={{flex: 1}}>
          <Icon3
            name="plus-circle"
            size={33}
            color={'#5f695d'}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
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
  },
  textContainer: {
    flex: 3,
  },
  textStyle: {
    bottom: '15%',
    left: '5%',
    fontSize: 26,
    color: '#5f695d',
    fontFamily: 'NotoSerifTC-Bold',
    letterSpacing: 10,
  },
  iconStyle: {
    top: '5%',
  },
  iconContainer: {
    right:'0.8%',
    flex:1,
    flexDirection: 'row',
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'space-around',
    borderRadius: 30,
  },
});

export default MediaTop;
