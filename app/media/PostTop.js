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

const PostTop = ({userdata}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
     <View style={styles.iconContainer}>
         <TouchableOpacity
          //返回建X
           onPress={() => {
             navigation.goBack();
          }}
          style={{flex: 1}}>
           <Icons
               name="cross"
               size={40}
                color={'#5f695d'}
                style={styles.iconStyle}
            />
         </TouchableOpacity>
        </View>
        <Text style={styles.textStyle}>分享旅途</Text>
        <View style={styles.buttonContainer2}>
              <TouchableOpacity
                //回到社群
                onPress={() => {navigation.navigate("MediaHome");
               }}
               style={{flex: 1}}>
               <Text style={styles.buttonText}>發布</Text>
             </TouchableOpacity>
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    //left:150,
    //top: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5f695d',
    letterSpacing: 2,
    flex:1,
  },
  container: {
    flexDirection: 'row',
    margin:20,
    left:0,
  },
  iconStyle: {
    top: -6,
    left: -6,
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
  buttonContainer: {
    backgroundColor: '#fbb856',//較深黃
    //backgroundColor: '#ffc56b',//較淺黃
  //  flex: 1,
    width: 120,
    //alignSelf: 'flex-end',
    right: 7,
    bottom: 10,
    borderRadius: 20,
  },
  buttonContainer2: {
    flex:0.5,
    backgroundColor: '#D9D9D9', //較淺黃
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
    color: '#AAAAAA',
   // top: 1,
   //alignItems:'center', 
   //alignContent:'center',
   letterSpacing: 2,
    left: 15,
  },
});

export default PostTop;