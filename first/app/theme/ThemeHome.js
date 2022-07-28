import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
//import { StackNavigator } from "react-navigation";
//import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import ThemeTop from './ThemeTop';
//----------
const Stack = createNativeStackNavigator();

const width = Dimensions.get('screen').width / 2 - 20;
const pics = [
  {
    id: 1,
    name: '美食',
    img: require('../../assets/food2.png'),
  },
  {
    id: 2,
    name: '自然',
    img: require('../../assets/mountain.png'),
  },
  {
    id: 3,
    name: '網美景點',
    img: require('../../assets/camera3.jpg'),
  },
  {
    id: 4,
    name: '古蹟',
    img: require('../../assets/temple4.png'),
  },
  {
    id: 5,
    name: '住宿',
    img: require('../../assets/suitcase.jpg'),
  },
];

const ThemeHome = ({navigation}) => {
  const Card = ({pic}) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Result', pic);
          }}
          style={{flex: 1,}}>
          <View style={{flex: 3, alignItems: 'center'}}>
            {<Image style={{flex: 1, resizeMode: 'center'}} source={pic.img} />}
            {/*<Image style={styles.image}source={pic.img}/>*/}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>{pic.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/*頂部*/}
      <View style={styles.topbar}>
        <ThemeTop />
      </View>

      {/*內容*/}
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 25,
          paddingBottom: 80,
        }}
        numColumns={2}
        data={pics}
        renderItem={({item}) => <Card pic={item} />}></FlatList>
    </View>
    //   <Button
    //     onPress={()=>this.props.navigation.navigate()}
    //   />
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
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  card: {
    height: 170,
    //backgroundColor:'#D1DED7',
    backgroundColor: '#ffffff',
    width,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 15,
    //paddingTop:5,
    padding: 5,
    borderColor: '#D1DED7',
    borderWidth: 3,
    //borderColor:'black',
    //borderStyle:'solid',
    //borderBottomWidth:2,
    //borderBottomColor:'#D9DEC1',
  },
  textStyle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 19,
    color: '#5f695d',
    top: 8,
    letterSpacing: 10,
  },
  image: {
    width: 175,
    height: 125,
  },
  textContainer: {
    backgroundColor: '#D1DED7',
    flex: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    //position:'relative',
  },
});

export default ThemeHome;
