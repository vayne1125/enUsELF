import React from 'react';
import { useState,useEffect,useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  DeviceEventEmitter,
} from 'react-native';
import { CheckBox } from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';

import {AuthContext} from '../routes/AutoProvider';
import ThemeImg from '../data/ThemeImg';
import MapImg from '../data/MapImg';

const height = Dimensions.get('screen').height/4;
const cardHeight = Dimensions.get('screen').height/7;

const Scheduleitem = (userSchdule) => {
  const {user, logout} = useContext(AuthContext);
  const sites=userSchdule.userSchdule;
  const len=sites.length;
  let cnt=0;
  const [isSelected, setSelection] = useState(false);
  //全選
  let set = new Set()
  const [checksite, setChecksite] = useState([]);
  useEffect(() => {
    const listen = DeviceEventEmitter
    .addListener('sendToDatabase',() => {
      for(let i=0;i<len;++i){
        if(set.has(sites[i].name))
        {
        const users = firestore().collection('users').doc(user.uid);
        users.collection('list').doc(sites[i].name)
        .set({
            check:false,
            id:sites[i].id,
            place_id: sites[i].place_id,
            type: sites[i].type,
        }).then(()=>{
            console.log('list add !');
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
      if(check)
        set.add(site.name);
      else
       set.delete(site.name);
      cnt=len;
      setCheck(check);
    });
    return () => listen.remove();
  },[]);
  const [check, setCheck] = useState(false);
    return (
      <View style={styles.card}>
        <View style={styles.boxContainer}>
          <CheckBox
            center
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            containerStyle={{backgroundColor:'#F2F2F2'}}
            checked={ check }
            onPress={()=>{
              console.log('1  len',len);
              if(check){ //選變不選(原本是選)
                DeviceEventEmitter.emit('scheduleItemcheck',!check);
                set.delete(site.name);
                cnt--;
                console.log('cnt ',cnt);
              } else {
                set.add(site.name);
                cnt++;
                console.log('cnt ',cnt);
                if(len==cnt) {
                  DeviceEventEmitter.emit('hadAllCheck');
                }
              }
              setCheck(!check);
              DeviceEventEmitter.emit('ChooseCnt',cnt);
            }}
          />
        </View>
        <View style={styles.siteContainer}>
          <View style={styles.imageContainer}>
          {
            (site.type=== "hot" || site.type === "hol" || site.type === "shop")?
            <Image style={styles.image} source={MapImg[site.type+(site.id.toString())]} />:
            <Image style={styles.image} source={ThemeImg[site.name]} />  
          }
          </View>
          <View style={{flex: 4,justifyContent:'space-around',padding:5,}}>
            <View style={styles.textContainer}>
              <Text numberOfLines={1} style={styles.nameStyle}>{site.name}</Text>
            </View>
            <View style={styles.textContainer2}>
              <Text style={styles.addressStyle}>{site.city} {site.region}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {
      (sites.length)?
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: '2%',
          paddingBottom: '5%',
        }}
        numColumns={1}
        data={sites}
        keyExtractor={ item=>item.place_id }
        windowSize={2}
        initialNumToRender={8}
        renderItem={({item}) => <Card site={item} />}
      /> : <View style={{flex:1,top:height,}}>
        <Text style={{fontSize:28,}}>未提供行程表</Text>
      </View>
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
    height: cardHeight,
    width:'100%',
    marginTop: '2%',
    flex: 1,
    flexDirection: 'row',
    paddingRight:'2%',
    justifyContent:'space-around'
  },
  boxContainer:{
    flexDirection: 'column',
    flex:1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent:'center',
},
  siteContainer:{
    flex:8.5,
    flexDirection:'row',
    backgroundColor:'white',
    padding:'3%',
    borderRadius:30,
    borderColor:'#D1DED7',
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    resizeMode:'cover',
  },
  textContainer: {
    flex: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent:'center',
    padding:5,
  },
  textContainer2: {
    flex: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent:'flex-start',
    padding:10,
  },
  imageContainer: {
    flex: 3,
    alignItems: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  nameStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color:'#5f695d',
    letterSpacing: 3,
    backgroundColor:'#D1DED7',
    borderRadius: 10,
    paddingLeft:8,
    paddingRight:8,
  },
  addressStyle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'gray',
    letterSpacing: 1,
  },
});

export default Scheduleitem;