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
const Stack = createNativeStackNavigator();

const ThemeTop = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>主題分類</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('List');
        }}
        style={{flex: 1}}>
        <View style={styles.iconContainer}>
          <View style={styles.circle}>
            <Icons
              name="calendar-outline"
              size={33}
              /*color={'#5f695d'}*/
              color={'white'}
              style={styles.iconStyle}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 5,
    //backgroundColor:'black'
  },
  textStyle: {
    //position: 'absolute',
    //left: 15,
    //top: 10,
    fontSize: 30,
    //fontWeight: 'bold',
    fontFamily:'edukai-4.0',
    color: '#ffffff',
    letterSpacing: 10,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  iconStyle: {
    alignSelf: 'center',
  },
  circle:
  {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 3,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    //backgroundColor: '#D1DED7',
  },
  iconContainer: {
    //position: 'absolute',
    //right: 24,
    //top: 6,
    //backgroundColor: '#D1DED7',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default ThemeTop;
