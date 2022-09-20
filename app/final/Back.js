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

const Back = () => {
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
            name="chevron-left"
            size={60}
            color={'#5f695d'}
            style={styles.iconStyle}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
    left: -Dimensions.get('window').width / 2,
    top: -Dimensions.get('window').height / 2+15,
  },
  iconStyle: {
    top: -4,
    left: -2,
    fontSize:45,
  },
  iconContainer: {
    //zIndex:3,
    position: 'absolute',
    flex:1,
    width: 40,
    height: 40,
    borderRadius: 30,
  },
});
export default Back;