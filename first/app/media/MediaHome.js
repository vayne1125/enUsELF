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

import MediaTop from './MediaTop';

const width = Dimensions.get('screen').width - 20;

const posts = [
  {
    id: 1-2,
    name: 'abc123',
    img: require('../../assets/post1.jpg'),
    content: '風景超美!爬上去很值得',
  },
  {
    id: 2-2,
    name: 'def456',
    img: require('../../assets/post2.jpg'),
    content: '這家咖啡廳氣氛不錯~',
  },
  {
    id: 3-2,
    name: 'ghi789',
    img: require('../../assets/camera3.jpg'),
    content: '在這裡收穫很多美照~',
  },
  {
    id: 4-2,
    name: 'andy',
    img: require('../../assets/temple4.png'),
    content: '增加文化氣息',
  },
  {
    id: 5-2,
    name: 'lady',
    img: require('../../assets/suitcase.jpg'),
    content: '乾淨又舒服!',
  },
];

const MediaHome = ({navigation}) => {
  const Card = ({post}) => {
    return (
      <View style={styles.card}>
        <View style={styles.nameContainer}>
          <View style={styles.info}>
            <Icons name={'person-circle-outline'} size={32} />
          </View>
          <Text style={styles.nameStyle}>{post.name}</Text>
        </View>
        <View style={styles.imageContainer}>
          {<Image style={{flex: 1, resizeMode: 'contain'}} source={post.img} />}
          {/*<Image style={styles.image}source={pic.img}/>*/}
        </View>
        <View style={styles.textContainer}>
          <Icon name={'heart'} size={24} />
          <Text style={styles.textStyle}>{post.content}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {navigation.navigate('Schedule');
            }}
            style={{flex: 1}}>
            <Text style={styles.buttonText}>他的行程</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/*頂部*/}
      <View style={styles.topbar}>
        <MediaTop />
      </View>
      {/*內容*/}
      <FlatList
        //columnWrapperStyle={{justifyContent:'space-between'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 25,
          paddingBottom: 80,
        }}
        numColumns={1}
        data={posts}
        renderItem={({item}) => <Card post={item} />}></FlatList>
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
    height: 400,
    //backgroundColor:'#D1DED7',
    backgroundColor: '#ffffff',
    width,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 15,
    //paddingTop:5,
    //padding: 5,
    borderColor: '#D1DED7',
    //borderWidth: 2,
    //borderStyle:'solid',
    borderBottomWidth:3,
    //borderRightWidth:2,
    //borderStyle:'dashed',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#5f695d',
    top: 8,
    letterSpacing: 8,
  },
  image: {
    width: 175,
    height: 125,
  },
  textContainer: {
    //backgroundColor: '#D1DED7',
    flex: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    left: 14,
    top: 5,
    //borderRadius:5,
    //borderTopWidth:2,
    borderColor: '#D1DED7',
    //position:'relative',

  },
  nameStyle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#5f695d',
    left: 15,
  },
  nameContainer: {
    flexDirection: 'row',
    backgroundColor: '#D1DED7',
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    //position:'relative',
  },
  info: {
    left: 8,
    top: 5,
  },
  buttonContainer: {
    backgroundColor: '#fbb856',//較深黃
    //backgroundColor: '#ffc56b',//較淺黃
    flex: 1,
    width: 120,
    alignSelf: 'flex-end',
    right: 7,
    bottom: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: '800',
    fontSize: 17,
    color: '#6b5238',
    top: 8,
    letterSpacing: 10,
    left: 7,
  },
  imageContainer: {
    flex: 5, 
    alignItems: 'center', 
    backgroundColor: '#D1DED7',
    borderColor: '#D1DED7',
    borderWidth: 3,
    borderBottomWidth:10,
  },
});

export default MediaHome;
