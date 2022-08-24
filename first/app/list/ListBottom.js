import React, {Component, useState, useEffect} from 'react';
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
//import Icon from 'react-native-vector-icons/FontAwesome';
const ListBottom = () => {
    const navigation = useNavigation();
    const [check, setCheck] = useState(false);
    const [items, setItems] = useState(0);
    const [checkitems, setCheckitems] = useState(0);

    useEffect(() => {
        const listen = DeviceEventEmitter
        .addListener('items', (count) => {
            setItems(count);
        });
        return () => listen.remove();
    },[]);

    useEffect(() => {
        const listen = DeviceEventEmitter
        .addListener('itemscheck', (check) => {
            if(check) setCheckitems(checkitems - 1);
            else setCheckitems(checkitems + 1);
        });
        return () => listen.remove();
    },[]);

    useEffect(() => {
        if(items != checkitems && items){
            console.log('items:',items);
            console.log('checkitems:',checkitems);
            setCheck(false);
        }
    },[checkitems]);

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
                        DeviceEventEmitter.emit('allcheck', check);
                        setCheck(!check);
                        if(check) setCheckitems(0);
                        else setCheckitems(items);
                    }}
                /></>
            </View>
            <View style={{flex:0.4}}></View>
            <View style={styles.OkContainer}>
                <TouchableOpacity
                onPress={() => {navigation.navigate("Map");}}>
                    <Text style={styles.OkText}>完成</Text> 
                </TouchableOpacity>
            </View>
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
  OkContainer: {
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
});

export default ListBottom;