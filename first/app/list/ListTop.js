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

const ListTop = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>清單</Text>
      <TouchableOpacity
        onPress={() => {
            navigation.goBack();
        }}
        style={{flex: 1}}>
        <View style={styles.iconContainer}>
          <Icons
            name="cross"
            size={56}
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
    position: 'absolute',
    left: 15,
    top: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 10,
  },
  container: {
    flexDirection: 'row',
  },
  iconStyle: {
    top: -4,
    left: -4,
  },
  iconContainer: {
    position: 'absolute',
    right: 24,
    top: 6,
    backgroundColor: '#D1DED7',
    width: 48,
    height: 48,
    alignSelf: 'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 30,
  },
});

export default ListTop;