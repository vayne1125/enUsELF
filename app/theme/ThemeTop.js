import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Icons from 'react-native-vector-icons/Ionicons';

export default class ThemeTop extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>主題分類</Text>
        {/* <View style={{alignSelf: 'flex-end',backgroundColor: 'pink'}}>
        <Icons name="calendar-outline" size={30} />
        </View> */}
        <View style={styles.iconContainer}>
          <Icons
            name="calendar-outline"
            size={33}
            color={'#5f695d'}
            style={styles.iconStyle}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    position: 'absolute',
    left: 15,
    top: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing:10,
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
