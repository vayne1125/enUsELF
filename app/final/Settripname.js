import React, { useState } from 'react';
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

const Settripname = ({ modalVisible, onClose, completePress}) => {
  const [tripname,setTripname]=useState('旅程計畫表');
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
                />
              </View>
            </View> 
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  completePress((tripname==="")? forceName : tripname);
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
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    elevation: 20,
  },
  iconContainer: {
    top: 2,
    width: 48,
    height: 48,
    alignSelf: 'flex-end',
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
    color: "#000000",
  },
  textStyle2: {
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: 'center',
    letterSpacing:2,
    color: "gray",
  },
  infoStyle: {
    flex: 1,
    width: 335,
    alignSelf: 'center',
    marginTop: 20,
  },
  setname:{
    flex:3,
    alignItems:'center',
    right:20,
  },
  buttonContainer: {
    backgroundColor: '#fbb856',
    width: 150,
    alignSelf: 'center',
    borderRadius: 25,
    flex: 1,
  },
  infoContainer: {
    flex: 5,
    top:20,
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

