import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/Entypo';

const width = Dimensions.get('screen').width - 50;
const height = Dimensions.get('screen').height / 4;

const Settripname = ({ size,modalVisible, onClose,completePress}) => {
 // const tempname='旅程計畫表';
  //const namesize=size+1;
  //const forceName = tempname+namesize.toString();
  const [tripname,setTripname]=useState('旅程計畫表');
  // setTripname(forceName);
 // console.log('here setsize= ',namesize);
   //console.log('here temp= ',forceName);
  // console.log('heretripname= ',tripname);
  return (
    (
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.modalBackGround}>
          <View style={styles.modalContainer}>
          <View style={styles.header}>
              <TouchableOpacity onPress={()=>{onClose()}} style={{flex: 1}}>
                <View style={styles.iconContainer}>
                  <Icons name="cross" size={45} color={'#5f695d'} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
               
              <View style={styles.infoStyle}>
              <Text style={styles.textStyle2}>為旅程取個特別的名字吧!</Text>
              </View>
              <View style={styles.setname}> 
            <TextInput style={styles.textStyle} 
              keyboardType='default'
              value={tripname}
              underlineColorAndroid='#BEBEBE'
              onChangeText={(context)=>setTripname(context)}
             // placeholder={"旅遊計畫表"+namesize} 
              />
            </View>
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  completePress((tripname==="")?forceName:tripname);
                }}
                style={{flex: 1}}>
                <Text style={styles.buttonText}>完成</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </Modal>
    )
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    width: '100%',
    backgroundColor: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '95%',
    height,
    //height: 600,
    backgroundColor: 'white',
    //paddingHorizontal: 20,
    //paddingVertical: 20,
    padding: 5,
    borderRadius: 20,
    elevation: 20,
    //flex:1,
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
    right: 2,
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
  textStyle2: {
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: 'center',
    letterSpacing:2,
  },
  infoStyle: {
    flex: 1,
    width: 335,
    alignSelf: 'center',
    marginTop: 20,
    //backgroundColor:'#000000',
  },
  setname:{
    flex:3,
    alignItems:'center',
    right:20,
    //justifyContent:'center',
  },
  infoTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    letterSpacing: 4,
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: '#fbb856', //較深黃
    //backgroundColor: '#ffc56b',//較淺黃
    width: 150,
    alignSelf: 'center',
    borderRadius: 25,
    //height: 45,
    //flexDirection: 'row',
    flex: 1,
  },
  infoContainer: {
    flex: 5,
    top:20,
    //backgroundColor:'#000000',
  },
  buttonText: {
    fontWeight: '800',
    fontSize: 18,
    color: '#6b5238',
    top: 5,
    letterSpacing: 10,
    alignSelf: 'center',
  },
});

export default Settripname;

