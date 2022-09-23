import React, {Component, useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import { CheckBox } from '@rneui/themed';
import firestore from '@react-native-firebase/firestore'
//import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../routes/AutoProvider';
const ListBottom = () => {
    const {user} = useContext(AuthContext);
    const [check, setCheck] = useState(false);
    const [empty, setEmpty] = useState(true);

    useEffect(() => {
        const listen = DeviceEventEmitter
        .addListener('items', () => {
            const Cnt = async() => {
                var count = 0;
                var items = 0;
                if(user){
                    const users = firestore().collection('users').doc(user.uid);
                    await users.collection('list').get()
                    .then((querySnapshot)=>{
                        querySnapshot.forEach((doc)=>{
                            if(doc.data().check)items++;
                            count++;
                        });
                    })
                    .catch(()=>{return 0;})
                    if(items==count && count)setCheck(true);
                    else setCheck(false);
                    setEmpty(items? false:true);
                }
            }
            Cnt();
        });
        return () => listen.remove();
    },[]);

    const update = async() => {
        var count = 0;
        try{
            if(user){
                const users = firestore().collection('users').doc(user.uid);
                await users.collection('list').get()
                .then((querySnapshot)=>{
                    querySnapshot.forEach(doc =>{
                        doc.ref.update({check:!check});
                        count++;
                    })
                })
                .then(()=>{
                    DeviceEventEmitter.emit('allcheck', check);
                })
                if(count){
                    setCheck(!check);
                    setEmpty(check? true : false);
                }
            }
        }
      catch(e){
        console.log(e);
      };
    }

    return (
        <View style = {styles.Container}>
            <View style={styles.ChanceContainer}>
                <><CheckBox
                    //center
                    title="全選"
                    textStyle={styles.ChanceText} 
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={check}
                    onPress={() => {
                        if(user){update();}        
                    }}
                /></>
            </View>
            {empty?
            <View style={styles.NoContainer}>
                <Text style={styles.OkText}>完成</Text> 
            </View>:
            <View style={styles.OkContainer}>
                <TouchableOpacity onPress={()=>{DeviceEventEmitter.emit('gotomap')}}>
                    <Text style={styles.OkText}>完成</Text> 
                </TouchableOpacity>
            </View>
            }
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'row',
    //borderTopWidth: 1,
    borderColor: '#AAAAAA',
    backgroundColor: '#ffffff',
    borderTopLeftRadius:50,
    borderTopRightRadius:40,
  },
  ChanceContainer: {
    backgroundColor: '#ffffff',
    flex: 0.55,
    alignItems:'flex-start',
    justifyContent:'center',
    padding:2,
    borderTopLeftRadius:40,
    borderTopRightRadius:20,
    //left:-8,
   // top:10,
  },
  ChanceText: {
    //left: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
    letterSpacing: 6,
  },
  OkContainer: {
    backgroundColor: '#6E877B',
    flex: 0.4,
    padding:5,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    height:'75%',
    borderRadius:30,

    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3,
  },
  OkText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 10,
  },
  NoContainer:{
    backgroundColor: 'gray',
    flex: 0.4,
    padding:5,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    height:'75%',
    borderRadius:30,

    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3,
  }
});

export default ListBottom;