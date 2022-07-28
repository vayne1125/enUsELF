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
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';

import ResultTop from './ResultTop';
const Stack = createNativeStackNavigator();
const width = Dimensions.get('screen').width - 20;

const sites = [
  {
    id: 1,
    name: 'abc123',
    img: require('../../assets/post1.jpg'),
    content: '風景超美!爬上去很值得',
  },
  {
    id: 2,
    name: 'def456',
    img: require('../../assets/post2.jpg'),
    content: '這家咖啡廳氣氛不錯~',
  },
  {
    id: 3,
    name: 'ghi789',
    img: require('../../assets/camera3.jpg'),
    content: '在這裡收穫很多美照~',
  },
  {
    id: 4,
    name: 'andy',
    img: require('../../assets/temple4.png'),
    content: '增加文化氣息',
  },
  {
    id: 5,
    name: 'lady',
    img: require('../../assets/suitcase.jpg'),
    content: '乾淨又舒服!',
  },
];

const Result = ({navigation, route}) => {
  const theme = route.params;

  const Card = ({site}) => {
    return (
      <View style={styles.card}>
        <View style={styles.nameContainer}>
          <View style={styles.info}>
            <Icons name={'person-circle-outline'} size={32} />
          </View>
          <Text style={styles.nameStyle}>{site.name}</Text>
        </View>
        <View style={styles.imageContainer}>
          {<Image style={{flex: 1, resizeMode: 'contain'}} source={site.img} />}
          {/*<Image style={styles.image}source={pic.img}/>*/}
        </View>
        <View style={styles.textContainer}>
          <Icon name={'heart'} size={24} />
          <Text style={styles.textStyle}>{site.content}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              console.log('456'), navigation.navigate('Schedule');
            }}
            style={{flex: 1}}>
            <Text style={styles.buttonText}>加入清單</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/*頂部*/}
      <View style={styles.topbar}>
        <ResultTop theme={theme} />
      </View>

      {/*內容*/}
      <FlatList
        //columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 25,
          paddingBottom: 80,
        }}
        numColumns={1}
        data={sites}
        renderItem={({item}) => <Card site={item} />}></FlatList>
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

export default Result;
