import React, { useEffect, useState } from 'react';
import TimeTop from './TimeTop';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  ScrollView,
  RefreshControl,
  FlatList
} from 'react-native';
import Hotplace from '../../map/Hotplace'
import Shopplace from '../../map/Shopplace'
import Holplace from '../../map/Holplace'
import Food from '../../theme/Food'
import Hotel from '../../theme/Hotel'
import KOL from '../../theme/KOL'
import Monuments from '../../theme/Monuments'
import DetailForFinal from '../../detail/DetailForFinal';
const Time = ({ navigation, route }) => {
  const [time, setTime] = useState(route.params.time);
  const [place, setPlace] = useState(route.params.place);
  const [data,setData] = useState([]);
  console.log(time);
  console.log(place);
  useEffect(()=>{
    setData(() => {
      const data = [];
      var tp = {};
      tp.name = "你的位置";
      tp.duration = -1;
      data.push(tp);
        for(var i=0;i<route.params.place.length;i++){
          const param = route.params.place[i];
          tp = {};
          if (param.type === "food") {
            tp = (Food[param.id]);
          } else if (param.type === "nature") {
            tp = (Nature[param.id]);
          } else if (param.type === "kol") {
            tp = (KOL[param.id]);
          } else if (param.type === "monuments") {
            tp = (Monuments[param.id]);
          } else if (param.type === "hotel") {
            tp = (Hotel[param.id]);
          } else if (param.type === "hol") {
            tp = (Holplace[param.id]);
          } else if (param.type === "hot") {
            tp = (Hotplace[param.id]);
          } else if (param.type === "shop") {
            tp = (Shopplace[param.id]);
          }
          tp.duration = route.params.time[i].duration;
          tp.distance = route.params.time[i].distance;
          data.push(tp);
        }
      console.log(data);
      return data;
    })
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TimeTop />
      </View>
      <FlatList //只許KEY是string 一定要叫item
      //horizontal
      //inverted
      keyExtractor={(place, index) => index.toString()} //用index當key
      data={data}
      //numColumns={2}
      renderItem={({ item }) => (
        <View style={styles.item}>
          {
          (item.duration != "-1") && ( //特殊處理
            <View style={styles.textView}>
              <Text style={styles.text}>{item.duration}</Text>
              <Text style={styles.text}>{item.distance}</Text>
            </View>)
          }
          <Text style={styles.text}>{item.name}</Text>
        </View>
      )}
    />
    </View>

    // <ScrollView 
    //   style = {styles.body}
    // >
    // {
    //   data.map((i)=>{
    //     return(
    //       <View style = {styles.item} key={i.key}>
    //         <Text style = {styles.text}>{i.item}</Text>
    //       </View>
    //     )
    //   })
    // }
    // </ScrollView>
  );
};
const styles = StyleSheet.create({
  topbar: {
    backgroundColor: '#5f695d',
    //flex:1,
    height: 63,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    //opacity: 0.9,
  },
  container: {
    hight: '100%',
    //backgroundColor: '#F2F2F2',
    flex: 1,
  },
  body: {
    flex: 1,
    flexDirection: 'column', //排列方式
    //backgroundColor: '#bcddb7', //背景 
  },
  item: {
    margin: 10,
    //backgroundColor: '#88bd80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#000000',
    //fontStyle: 'italic',
    //margin: 10,
  },textView:{
    alignItems:'center',
  }
});
export default Time;

//npx react-native run-android
