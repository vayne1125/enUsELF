import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
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
import PostTop from './PostTop'

const Stack = createNativeStackNavigator();
const width = Dimensions.get('screen').width;

const Post = ({navigation, route}) => {
    const userdata = route.params;
    return (
      
      <View style={styles.container}>
        <View style={styles.topbar}>
          <PostTop userdata={userdata}/>
        </View>
        <View style={styles.userpost}>
          <View style={styles.info}>
           <Icons name={'person-circle-outline'} size={32} />
             <View style={styles.namestyle}><Text>{userdata.name}</Text></View>
          </View>
            <TextInput placeholder="在想什麼">
            </TextInput>          
        </View>
      </View>
    );
}

//button一定要有title
const styles = StyleSheet.create({
  topbar: {
    backgroundColor: '#e2e2e2',//'#F2F2F2',
    //#5f695d',
    //flex:1,
    height: 50,
    borderColor: '#AAAAAA',
    borderBottomWidth:1,
   // borderBottomLeftRadius: 20,
   // borderBottomRightRadius: 20,
    //opacity: 0.9,
  },
  container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  userpost:{
    flexDirection:'row',
  },
  card: {
    height: 400,
    //backgroundColor:'#D1DED7',
    backgroundColor: '#ffffff',
    //width,
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
  mycard: {
    height: 50,
    //backgroundColor:'#D1DED7',
    backgroundColor: '#ffffff',
    //width,
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
    width: '95%',
    height: '95%',
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

export default Post;
