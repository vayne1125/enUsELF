import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
//import Icon from 'react-native-vector-icons/Ionicons';
import MediaTop from './MediaTop';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
const width = Dimensions.get('screen').width - 20;

const posts = [
  {
    id: 1,
    name: 'abc123',
    img: require('../../assets/food2.png'),
    content: '推 這家總匯吐司超好吃!',
  },
  {
    id: 2,
    name: 'def456',
    img: require('../../assets/mountain.png'),
    content: '風景超美!爬上去很值得',
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

const Card = ({post}) => {
  return (
    <View style={styles.card}>
      <View style={styles.nameContainer}>
        <View style={styles.info}>
        <Icons name={'person-circle-outline'} size={32}/>
        </View>
        <Text style={styles.nameStyle}>{post.name}</Text>
      </View>
      <View style={{flex: 5, alignItems: 'center'}}>
        {<Image style={{flex: 1, resizeMode: 'center'}} source={post.img} />}
        {/*<Image style={styles.image}source={pic.img}/>*/}
      </View>
      <View style={styles.textContainer} >
        <Icon name={'heart'}size={24}/>
        <Text style={styles.textStyle}>{post.content}</Text>
      </View>
    </View>
  );
};

export default class Media extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/*頂部*/}
        <View style={styles.topbar}>
          <MediaTop />
        </View>
        {/*內容*/}
        {/* <View
          style={{
            backgroundColor: 'white',
            //flex:11,
          }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: 'bold',
              letterSpacing: 5,
              color: 'black',
            }}>
            社群
          </Text>
        </View> */}
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
      //   <Button
      //     onPress={()=>this.props.navigation.navigate()}
      //   />
    );
  }
}

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
    borderWidth: 0,
    //borderColor:'black',
    //borderStyle:'solid',
    //borderBottomWidth:2,
    //borderBottomColor:'#D9DEC1',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#5f695d',
    top: 8,
    letterSpacing: 10,
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
    left:10,
    // borderTopWidth:2,
    // borderColor: '#D1DED7',
    //position:'relative',
  },
  nameStyle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#5f695d',
    left:15,
  },
  nameContainer: {
    flexDirection: 'row',
    backgroundColor: '#D1DED7',
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    //position:'relative',
  },
  info:{
    left:8,
    top:5,
  }
});
