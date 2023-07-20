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
import Icons3 from 'react-native-vector-icons/FontAwesome5';
//FontAwesome
const Stack = createNativeStackNavigator();

const ItineraryTop = props => {
 const navigation = useNavigation();
 const aurInfo = props;
 //console.log("jjjjjjjjjjj:",aurInfo);
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
            color={'#5f695d'}
            style={styles.iconStyle}
          />
        </View>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 26,
    color:'#5f695d',
    fontFamily:'NotoSerifTC-Bold',
    letterSpacing:10,
    marginLeft:'12%',
    bottom:'1%',
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
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 30,
  },
  iconContainer2:{
    position: 'absolute',
    right: 75,
    top: 10,
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 30,
  },
  iconContainer: {
    position: 'absolute',
    right: 24,
    top: 6,
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 30,
  },
});

export default ItineraryTop;
