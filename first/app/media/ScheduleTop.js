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

const ScheduleTop = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      
      <TouchableOpacity
        onPress={() => {
            navigation.goBack();
        }}
        style={{flex: 1}}>
        <View style={styles.iconContainer}>
          <Icons
             name="chevron-back-circle-outline"
              size={50}
            color={'#5f695d'}
            style={styles.iconStyle}
          />
        </View>
      </TouchableOpacity>

      <Text style={styles.text}>abc123的行程</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    //left: 15,
    right:100,
    top: 20,
    fontSize:20,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 10,
  },
  container: {
    flexDirection: 'row',
  },
  
  iconStyle: {
    top: -3,
    //left: 7,
  },
  iconContainer: {
    position: 'absolute',
    left:10,
    top: 8,
    backgroundColor: '#D1DED7',
    width: 48,
    height: 48,
    //alignSelf: 'left',
    //justifycontent: 'flex-start',
    //justifyContent:'left',
    borderRadius: 30,
  },
});

export default ScheduleTop;