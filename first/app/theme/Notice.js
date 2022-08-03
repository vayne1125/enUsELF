import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('screen').width/2;
const height = Dimensions.get('screen').height / 4;


export default class Notice extends Component {

  render() {
    //console.log(this.props.entry);
    console.log('close?');
    if (this.props.noticeVisible == true) {
      setTimeout(() => {
        this.props.onClose();
      }, 1300);
    }
    return (
      <Modal transparent={true} visible={this.props.noticeVisible}>
        <View style={styles.modalBackGround}>
          <View style={styles.modalContainer}>
            <Icon2 name={"checkmark-circle-outline"} size={70} color={"green"}/>
            <Text style={styles.textStyle}>已成功加入清單</Text>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  modalBackGround: {
    width: '100%',
    backgroundColor: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
  },
  modalContainer: {
    width: '80%',
    height,
    //height: 600,
    backgroundColor: 'white',
    //paddingHorizontal: 20,
    //paddingVertical: 20,
    padding: 5,
    borderRadius: 20,
    elevation: 20,
    justifyContent:"space-around",
    padding:25,
    alignItems:"center",
    
    //flex:1,
  },
  textStyle:{
    fontSize:25,
  }
});
