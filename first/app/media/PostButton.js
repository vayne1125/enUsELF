import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PostButton = () => {
  const showok =()=>{Alert.alert('已加入清單')  
    }
    return(
      <View style = {styles.Container}>
      {/*圖片*/}
      <View style={styles.iconContainer1}>
         <TouchableOpacity
           /*onPress={() => {
             navigation.goBack();
          }}*/
          style={{flex: 1}}>
           <Icons
               name="picture"
               size={40}
                color={'#5f695d'}
                style={styles.iconStyle}
            />
         </TouchableOpacity></View>

         <View style={styles.iconContainer2}>
        {/*旅遊行程表*/}
         <TouchableOpacity
           /*onPress={() => {
             navigation.goBack();
          }}*/
          style={{flex: 1}}>
           <Icon
               name="luggage"
               size={40}
                color={'#5f695d'}
                style={styles.iconStyle}
            />
         </TouchableOpacity></View>
  </View>
    );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,   
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    backgroundColor:"#e2e2e2", 
    flexDirection: 'row',
    justifyContent:'center',
    //borderColor: '#000000',
   // borderBottomWidth:3,
  },
  iconContainer1:{
      right:100,
      top:10,
  },
  iconContainer2:{
    right:-70,
    top:10,
    },
});

export default PostButton;