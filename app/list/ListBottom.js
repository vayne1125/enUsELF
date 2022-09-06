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
                    textStyle={{fontSize:12}}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={check}
                    onPress={() => {
                        if(user){update();}
                        DeviceEventEmitter.emit('allcheck', check);          
                    }}
                /></>
            </View>
            <View style={{flex:0.4}}></View>
            {empty?
            <View style={styles.UntouchContainer}>
                <Text style={styles.OkText}>完成</Text> 
            </View>:
            <View style={styles.touchContainer}>
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
    borderTopWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor:'white',
  },
  ChanceContainer: {
    flex: 0.3,
    alignItems:'center',
    justifyContent:'center',
  },
  touchContainer: {
    backgroundColor: '#88bd80',
    flex: 0.3,
    padding:5,
    alignItems:'center',
    justifyContent:'center',
  },
  OkText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 10,
  },
  UntouchContainer: {
    backgroundColor: 'gray',
    flex: 0.3,
    padding:5,
    alignItems:'center',
    justifyContent:'center',
  },
});

export default ListBottom;