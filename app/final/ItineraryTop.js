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
const Stack = createNativeStackNavigator();

const ItineraryTop = props => {
 const navigation = useNavigation();
 const aurInfo = props;
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{aurInfo.tripname}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Time',props.time);
        }}
        style={{flex: 1}}>
        {/* <View style={styles.iconContainer}>
          <Icons
            name="calendar-outline"
            size={33}
            color={'#5f695d'}
            style={styles.iconStyle}
          />
        </View> */}
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
  iconContainer: {
    position: 'absolute',
    right: 24,
    top: 6,
    backgroundColor: '#D1DED7',
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 30,
  },
});

export default ItineraryTop;
