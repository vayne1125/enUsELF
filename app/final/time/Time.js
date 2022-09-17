import React, { useState } from 'react';

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

const Time = ({ navigation, route }) => {
  const [time,setTime] = useState(route.params.time);
  const [place,setPlace] = useState(route.params.place);
  return (
    // <View>
    // </View>
    <FlatList //只許KEY是string 一定要叫item
      //horizontal
      //inverted
      keyExtractor={(place, index) => index.toString()} //用index當key
      data={place}
      //numColumns={2}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.text}>{item.id}</Text>
          <Text style={styles.text}>{item.place_id}</Text>
        </View>
      )}
    />
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
  body: {
    flex: 1,
    flexDirection: 'column', //排列方式
    backgroundColor: '#bcddb7', //背景 
  },
  item: {
    margin: 10,
    backgroundColor: '#88bd80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 45,
    color: '#ffffff',
    fontStyle: 'italic',
    margin: 10,
  },
});
export default Time; 

//npx react-native run-android
