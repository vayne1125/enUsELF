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

const width = Dimensions.get('screen').width - 50;



const Detail = ({entry, modalVisible, onClose}) => {
  return (
      console.log(entry),
      <Modal
        transparent={true}
        visible={modalVisible}>
        <View style={styles.modalBackGround}>
          <View  style={styles.modalContainer}>
          <ScrollView>
            <View style={styles.header}>
              <Text style={styles.textStyle}>{entry["site"]["name"]}</Text>
              <TouchableOpacity onPress={() => onClose()} style={{flex: 1}}>
                <View style={styles.iconContainer}>
                  <Icons name="cross" size={45} color={'#5f695d'} />
                </View>
              </TouchableOpacity>
            </View>
              <Image style={styles.image} source={entry["site"]["img"]} />
            <View style={styles.infoStyle}>
              <Text>{entry["site"]["info"]}</Text>
            </View>
          </ScrollView>
          </View>
         
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  /*modalBackGround: {
    flex: 1,
    //backgroundColor: 'rgba(255, 0, 255, 0.8)',
    //backgroundColor:'black',
    justifyContent: 'center',
    alignItems: 'center',
    backdrop: 'transparent',
  },*/
  modalBackGround: {
    width: '100%',
    backgroundColor: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex:1,
  },
  modalContainer: {
    width: '95%',
    height: 600,
    backgroundColor: 'white',
    //paddingHorizontal: 20,
    //paddingVertical: 20,
    padding: 5,
    borderRadius: 20,
    elevation: 20,
    top: 65,
    left: 10,
    //flex:1,
  },
  header: {
    height: 54,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    //backgroundColor:'rgba(255, 0, 255, 0.2)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex:1,
  },
  iconContainer: {
    //position: 'absolute',
    top: 2,
    //backgroundColor: '#D1DED7',
    width: 48,
    height: 48,
    alignSelf: 'flex-end',
    //justifycontent: 'flex-start',
    //justifyContent:'left',
    borderRadius: 30,
  },
  image: {
    width: 335,
    height: 195,
    top: 6,
    borderRadius: 10,
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    left: 20,
    top: 1,
  },
  infoStyle:{
    flex:1,
    width:335,
    alignSelf: 'center',
    top:10,
    fontSize:20,
  },
});

export default Detail;
