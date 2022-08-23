import React, {Component,useEffect,useState,useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import Iconcross from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import MediaTop from './MediaTop';
import {AuthContext} from '../routes/AutoProvider';
import Card from './Card'
const width = Dimensions.get('screen').width - 20;

const posts = [
  {
   id: 0,
   name: 'lalala',
   img: require('../../assets/site6.jpg'),
   content: '風景超美!爬上去很值得',
 },
 {
   id: 1,
   name: 'abc123',
   img: require('../../assets/site6.jpg'),
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
   img: require('../../assets/post1.jpg'),
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

const MediaHome = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [Posts,setPosts]=useState(null);
  const [loading, setLoading] = useState(true);
  const[deleted,setDeleted]=useState(false);

  const fetchPosts = async()=>{
    try{
        const list=[];
        await firestore()
        .collection('posts')
        .orderBy('postTime','desc')//照時間排
        .get()
        .then((querySnapshot)=>{
        //console.log('Total Posts:',querySnapshot.size);
        querySnapshot.forEach(doc=>{
            const {userid,post,postImg,postTime}=doc.data();
            list.push({
              id:doc.id ,
              userid,
              name: 'lalala',
              img: postImg,
              content: post,
            });
          })
        })
        setPosts(list);
        if(loading){
          setLoading(false);
        }
        console.log('post:',list);
      }catch(e){
        console.log(e);
      };
    }

  useEffect(()=>{
        fetchPosts();
  },[]);

useEffect(()=>{fetchPosts();
   setDeleted(true);
},[deleted]);   
      
const deletePost = (postId) => {
  console.log('Current Post Id:',postId);
  firestore()
  .collection('posts')
  .doc(postId)
  .get()
  .then(documentSnapshot => {
    if(documentSnapshot.exists){
      const {postImg} =documentSnapshot.data();
      if(postImg!=null){
        const storageRef=storage().refFromURL(postImg);
        const imgRef=storage().ref(storageRef.fullPath); 
        
        imgRef
        .delete()
        .then(()=>{
          console.log(`${postImg} has  delete`);
          deleteFirebaseData(postId);
          setDeleted(true);
        }) 
        .catch((e)=>{
          console.log('Error: ',e);
        })    
      }
    }
  })
}
const deleteFirebaseData = (postId)=>{
  firestore()
  .collection('posts')
  .doc(postId)
  .delete()
  .then(()=>{
    Alert.alert('成功刪除貼文!');
  })
  .catch(e => console.log('山資料err ',e))
}
const FlatList_Header=({})=>{
  return (
    <View style={styles.mycard}>
    <View style={styles.nameContainer}>
      <View style={styles.info}>
        <Icons name={'person-circle-outline'} size={32} />
      </View>
         <TouchableOpacity
          onPress={() => {navigation.navigate("Post",posts[0]);
          }}
        style={{flex: 1}}>
        <Text style={styles.buttonText}>在想些甚麼?</Text>
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
       data={Posts}
       ListHeaderComponent={FlatList_Header}
       renderItem={({item}) => <Card post={item} onDelete={deletePost} />}></FlatList>
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
 deliconContainer:{
   left :250,
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

export default MediaHome;
