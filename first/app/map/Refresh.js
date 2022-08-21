import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/Entypo';

const Refresh = () => {
  return (
      <TouchableOpacity
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
  );
};
const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
  },
  iconStyle: {
    top: -4,
    left: -2,
    fontSize:45,
  },
  iconContainer: {
    position: 'absolute',
    left: -180,
    top: -350,
    backgroundColor: '#D1DED7',
    width: 40,
    height: 40,
    borderRadius: 30,
  },
});

export default Refresh;