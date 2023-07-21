import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import ListTop from './ListTop'
import ListBottom from './ListBottom'
import Items from './Items';

export default class List extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topbar}>
          <ListTop/>
        </View>
        <View style={styles.items}>
          <Items/>
        </View>
        <View style={styles.buttonbar}>
          <ListBottom/>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  topbar: {
    flex:1,
  },
  items: {
    flex: 9.2,
    alignItems:'center',
    justifyContent:'center',
  },
  buttonbar: {
      flex:1.3,
  },
  });