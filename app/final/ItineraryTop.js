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
import Time from './time/Time';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Ionicons';
import Icons2 from 'react-native-vector-icons/FontAwesome';
import Icons3 from 'react-native-vector-icons/FontAwesome5'
//FontAwesome
const Stack = createNativeStackNavigator();

const ItineraryTop = props => {
 const navigation = useNavigation();
 const aurInfo = props;
 console.log("jjjjjjjjjjj:",aurInfo);
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{aurInfo.tripname}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Time',{
            time:aurInfo.time,
            place:aurInfo.place,
            mode:aurInfo.mode
          });
        }}
        style={{flex: 1}}>
        <View style={styles.iconContainer}>
          <Icons
            name="time-outline"
            size={40}
            color={'#D1DED7'}
            style={styles.iconStyle}
          />
        </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={props.onPressHandler1}
        >
        <View style={styles.iconContainer2}>
          <Icons2
            name="car"
            size={33}
            color={'#D1DED7'}
            style={styles.iconStyle}
          />
        </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={props.onPressHandler2}
        >
        <View style={styles.iconContainer3}>
          <Icons3
            name="walking"
            size={33}
            color={'#D1DED7'}
            style={styles.iconStyle}
          />
        </View>

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    position: 'absolute',
    left: '3%',
    top: 15,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    //letterSpacing: 10,
  },
  container: {
    flexDirection: 'row',
  },
  iconStyle: {
    top: 5,
    left: 8,
  },
  iconContainer3:{
    position: 'absolute',
    right: 115,
    top: 10,
    //backgroundColor: '#D1DED7',
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 30,
  },
  iconContainer2:{
    position: 'absolute',
    right: 75,
    top: 10,
    //backgroundColor: '#D1DED7',
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 30,
  },
  iconContainer: {
    position: 'absolute',
    right: 24,
    top: 6,
    //backgroundColor: '#D1DED7',
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 30,
  },
});

export default ItineraryTop;
