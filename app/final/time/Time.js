import React, { useEffect, useState } from 'react';
import TimeTop from './TimeTop';
import CusTimeline from './CusTimeLine'
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
  const mode = route.params.mode;
  console.log(time);
  console.log(place);
  useEffect(()=>{
    setData(() => {
      const data = [];
        for(var i=0;i<route.params.place.length;i++){
          const param = route.params.place[i];
          var tp = {};
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
      // console.log(data);
      // const data = [
      //   {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
      //   {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
      //   {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
      //   {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
      //   {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
      // ]
      return data;
    })
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TimeTop />
      </View>
      <CusTimeline
        data = {data}
        mode = {mode}>
      </CusTimeline>
    </View>
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
  },
  list: {
    flex: 1,
    marginTop:20,
  },
});
export default Time;

//npx react-native run-android
