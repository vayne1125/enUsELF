import React, {Component} from 'react';
import { useState,useEffect,useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  DeviceEventEmitter,
  Button,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
//import  CheckBox  from 'react-native-checkbox';
//import CheckBox from './CheckBox'
import { CheckBox } from '@rneui/themed';
import { checkPluginState } from 'react-native-reanimated/lib/reanimated2/core';
import {AuthContext} from '../routes/AutoProvider';
import firestore from '@react-native-firebase/firestore';
import Image_link from '../theme/Image';
import Image_linkMap from '../map/Image';
/*check id placeid type */
const height = Dimensions.get('screen').height/4;

const Scheduleitem = (userSchdule) => {
  const {user, logout} = useContext(AuthContext);
  const sites=userSchdule.userSchdule;
  //DeviceEventEmitter.addListener('callback',(events) ={使用数据events});
  //console.log('site: ',sites);
 // console.log('site: ',sites);
  const len=sites.length;
 // console.log('長度',len);
  const [isSelected, setSelection] = useState(false);
    //全選
   let set = new Set()
  //const [list,setList]=useState([]);
  const [checksite, setChecksite] = useState([]);
  let Checksite = checksite;
  useEffect(() => {
    const listen = DeviceEventEmitter
    .addListener('sendToDatabase',() => {
      for(let i=0;i<len;++i){
        if(set.has(sites[i].name))
        {
        //console.log('新增uid ', user.uid);
        //console.log('新增name ', sites[i].name);
        const users = firestore().collection('users').doc(user.uid);
        users.collection('list').doc(sites[i].name)
        .set({
            check:false,
            id:sites[i].id,
            place_id: sites[i].place_id,
            type: sites[i].type,
        }).then(()=>{
            console.log('list add !');
            //Alert.alert("成功發布");
          }).catch((error)=>{
            console.log('list add Failed!',error);
          });
        }
      }
  });
  return () => listen.remove();
},[]);

const Card = ({site}) => {

  //全選
  useEffect(() => {
    const listen = DeviceEventEmitter
    .addListener('scheduleCheck',(check) => {//傳來Ttrue，我要全勾
      //console.log('look ',check);
      if(check)
        set.add(site.name);
      else
       set.delete(site.name);
      // console.log('set2= ',set);
    setCheck(check);
    });
    return () => listen.remove();
  },[]);
  const [check, setCheck] = useState(false);
  //console.log('see ', check);
      return (
          <View style={styles.card}>
              <View style={styles.boxContainer}>
              <CheckBox
              center
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={ check }
              onPress={()=>{
                if(check)//選變不選(原本是選)
                  {
                    DeviceEventEmitter.emit('scheduleItemcheck',!check);
                    set.delete(site.name);
                  }else 
                 set.add(site.name);
                //console.log('Set: ', set);
                setCheck(!check);
              }}
              />
              </View>
              <View style={styles.imageContainer}>
              {
               (site.type=== "hot" || site.type === "hol" || site.type === "shop")?
                <Image style={styles.image} source={Image_linkMap[site.type+(site.id.toString())]} />:
                <Image style={styles.image} source={Image_link[site.name]} />
                
                }
                </View>
              <View style={{flex: 4,justifyContent:'space-around',padding:5,}}>
                  <View style={styles.textContainer}>
                      <Text style={styles.nameStyle}>{site.name}</Text>
                  </View>
                  <View style={styles.textContainer2}>
            <Text style={styles.addressStyle}>{site.city} {site.region}</Text>
                  </View>
              </View>
          </View>
      );
};

return (
    <View style={styles.container}>
      {(sites.length)?
        <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
            marginTop: 25,
            paddingBottom: 80,
        }}
        numColumns={1}
        data={sites}
        renderItem={({item}) => <Card site={item} />}>     
      </FlatList>:
        <View style={{flex:1,top:height,}}><Text style={{fontSize:28,}}>未提供行程表</Text></View>
      }
    </View>
);
};
const styles = StyleSheet.create({
  container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  card: {
    height: 155,
    //backgroundColor:'#D1DED7',
    backgroundColor: '#ffffff',
    width:'100%',
    //marginHorizontal: 10,
    //borderRadius: 10,
    marginBottom: 12,
    //paddingTop:5,
    padding: 3,
    //right: 2,
    //borderColor: '#D1DED7',
    //borderWidth: 3,
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderBottomColor:'#D1DED7',
    borderRightWidth:3,
    borderRightColor:'#ffffff',
    justifyContent:'space-around'
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    resizeMode:'cover',
  },
  textContainer: {
    flex: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent:'center',
    padding:5,
  },
  textContainer2: {
    flex: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent:'flex-start',
    padding:5,
    //backgroundColor:'#000000'
  },
  imageContainer: {
    flex: 4,
    alignItems: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  boxContainer:{
      flexDirection: 'column',
      flex:1,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent:'center',
  },
  nameStyle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    //color: '#D1DED7',
    color:'#5f695d',
    letterSpacing: 3,
    backgroundColor:'#D1DED7',
    //backgroundColor:'#5f695d',
    borderRadius: 10,
    paddingLeft:8,
    paddingRight:8,
  },
  addressStyle: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 14,
      color: 'gray',
      letterSpacing: 1,
  },
});

export default Scheduleitem;