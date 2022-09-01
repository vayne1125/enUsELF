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
import Hotplace from '../../map/Hotplace'
import Shopplace from '../../map/Shopplace'
import Holplace from '../../map/Holplace'
import Food from '../../theme/Food'
import Hotel from '../../theme/Hotel'
import KOL from '../../theme/KOL'
import Monuments from '../../theme/Monuments'
import Nature from '../../theme/Nature'
import Image_link from '../../theme/Image';
import Image_linkMap from '../../map/Image';
//import  CheckBox  from 'react-native-checkbox';
//import CheckBox from './CheckBox'
//import Image_link from '../theme/Image';
const width = Dimensions.get('screen').width/2.2;

const Tripitems = (items) => {
  const sites=items.items;
  console.log('sites ',sites.desSite);
  const [data,setData] = useState([]);
  //const data=[];
  useEffect(()=>{

    setData(()=>{
      var rt = [];
      if(sites.desSite.type === "food"){
        rt.push(Food[sites.desSite.id]);
      }else if(sites.desSite.type === "nature"){
        rt.push(Nature[sites.desSite.id]);
      }else if(sites.desSite.type === "kol"){
        rt.push(KOL[sites.desSite.id]);
      }else if(sites.desSite.type === "monuments"){
        rt.push(Monuments[sites.desSite.id]);
      }else if(sites.desSite.type === "hotel"){
        rt.push(Hotel[sites.desSite.id]);
      }else if(sites.desSite.type === "hol"){
        rt.push(Holplace[sites.desSite.id]);
      }else if(sites.desSite.type === "hot"){
        rt.push(Hotplace[sites.desSite.id]);
      }else if(sites.desSite.type === "shop"){
        rt.push(Shopplace[sites.desSite.id]);
      }
      //console.log('herse11 ',sites.site);
      (sites.site).map((param)=>{
        if(param.type === "food"){
          rt.push(Food[param.id]);
        }else if(param.type === "nature"){
          rt.push(Nature[param.id]);
        }else if(param.type === "kol"){
          rt.push(KOL[param.id]);
        }else if(param.type === "monuments"){
          rt.push(Monuments[param.id]);
        }else if(param.type === "hotel"){
          rt.push(Hotel[param.id]);
        }else if(param.type === "hol"){
          rt.push(Holplace[param.id]);
        }else if(param.type === "hot"){
          rt.push(Hotplace[param.id]);
        }else if(param.type === "shop"){
          rt.push(Shopplace[param.id]);
        }
      })
      return rt;
    })
    
    //console.log('data ',data);
  },[]);
  //const list
  const Card = ({site}) => {
    console.log('212 ',site);
    //const s=site.type+(site.id.toString());
        return (
            <View style={styles.card}>
                <View style={styles.boxContainer}>
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
        <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
            marginTop: 25,
            paddingBottom: 80,
        }}
        numColumns={1}
        data={data}
        renderItem={({item}) => <Card site={item} />}>     
        </FlatList>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 2,
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
    //width: '100%',
    width,
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

export default Tripitems;