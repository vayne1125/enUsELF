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

const width = Dimensions.get('screen').width - 50;



const Detail = ({entry, modalVisible, onClose}) => {
  return (
      console.log(entry),
      <Modal
        transparent={true}
        visible={modalVisible}>
        <View style={styles.modalBackGround}>
          <View  style={styles.modalContainer}>
          <View style={styles.header}>
              <Text style={styles.textStyle}>{entry["site"]["name"]}</Text>
              <TouchableOpacity onPress={() => onClose()} style={{flex: 1}}>
                <View style={styles.iconContainer}>
                  <Icons name="cross" size={45} color={'#5f695d'} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
          <ScrollView >
              <Image style={styles.image} source={entry["site"]["img"]} />
            <View style={styles.infoStyle}>
             
              <Text style={styles.infoTitle}>
              <Icon name="map-marker" size={25} color={'#5f695d'} />地址
              </Text>
              <Text style={styles.infoTextStyle}>{entry["site"]["address"]}{"\n"}</Text>
              <Text style={styles.infoTitle}> 
              <Icon name="info-circle" size={23} color={'#5f695d'} />簡介
              </Text>
              <Text style={styles.infoTextStyle}>{entry["site"]["info"]}{"\n"}</Text>
              <Text style={styles.infoTitle}> 
              <Icon3 name="weather-cloudy" size={23} color={'#5f695d'} />天氣
              </Text>
              <View style={styles.weatherContainer}>
              <View>
              <Text>週日</Text>
              <Icon3 name="weather-cloudy" size={23} color={'#5f695d'} />
              <Text>29°C</Text>
              </View>
              <View>
              <Text>週一</Text>
              <Icon3 name="weather-pouring" size={23} color={'#5f695d'} />
              <Text>29°C</Text>
              </View>
              <View>
              <Text>週二</Text>
              <Icon3 name="weather-pouring" size={23} color={'#5f695d'} />
              <Text>27°C</Text>
              </View>
              <View>
              <Text>週三</Text>
              <Icon3 name="weather-pouring" size={23} color={'#5f695d'} />
              <Text>28°C</Text>
              </View>
              <View>
              <Text>週四</Text>
              <Icon3 name="weather-pouring" size={23} color={'#5f695d'} />
              <Text>29°C</Text>
              </View>
              <View>
              <Text>週五</Text>
              <Icon3 name="weather-pouring" size={23} color={'#5f695d'} />
              <Text>29°C</Text>
              </View>
              <View>
              <Text>週六</Text>
              <Icon3 name="weather-pouring" size={23} color={'#5f695d'} />
              <Text>29°C</Text>
              </View>
              </View>
             
            </View>
          </ScrollView>
          </View>
          <View style={styles.buttonContainer}>
          <TouchableOpacity
              onPress={() => {
                console.log('456');
              }}
              style={{flex: 1}}>
              <Text style={styles.buttonText}>加入清單</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
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
    right:2,
  },
  image: {
    width: 335,
    height: 195,
    top: 6,
    borderRadius: 10,
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 26,
    fontWeight: 'bold',
    left: 20,
    top: 1,
  },
  infoStyle:{
    flex:1,
    width:335,
    alignSelf: 'center',
    marginTop :20,
    //backgroundColor:'#000000',
  },
  infoTitle:{
    fontSize:22,
    alignSelf: 'center',
    letterSpacing: 10,
    textAlign: 'center' 
  },
  infoTextStyle:{
    fontSize:20,
    alignSelf: 'center',
    letterSpacing: 4,
    textAlign: 'center' ,
  },
  buttonContainer:{
    backgroundColor: '#fbb856', //較深黃
    //backgroundColor: '#ffc56b',//較淺黃
    width: 150,
    alignSelf: 'center',
    borderRadius: 25,
    //height: 45,
    //flexDirection: 'row',
    flex:1,
  },
  infoContainer:{
    flex:10,
    //backgroundColor:'#000000',
  },
  buttonText: {
    fontWeight: '800',
    fontSize: 20,
    color: '#6b5238',
    top: 9,
    letterSpacing: 10,
    alignSelf: 'center',
  },
  weatherContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    paddingTop:10,
  }
});

export default Detail;
