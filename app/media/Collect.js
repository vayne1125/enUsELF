import React, {Component, useEffect, useState,useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  DeviceEventEmitter,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Card from './Card';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../routes/AutoProvider';

const Stack = createNativeStackNavigator();
const width = Dimensions.get('screen').width / 6;
const width2 = (Dimensions.get('screen').width * 49) / 50;
//const height = width - 5;
const height = Dimensions.get('screen').height/2;

const Collect = (item) => {
  const {user} = useContext(AuthContext);
  const [deleted, setDeleted] = useState(false);
  const [Posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [collect, setCollect] = useState([]);
   const data=item.item;
   const fetchCollect=async()=>{
    const listget=[];
    //get collect post name
    await  firestore()
    .collection('users')
    .doc(user.uid)
    .collection('collect')
    .orderBy('collectTime','desc')
    .get()
    .then((querySnapshot)=>{
    //console.log('Total Posts:',querySnapshot.size);
    querySnapshot.forEach(doc=>{
        const {postId}=doc.data();
        listget.push({
          postId
        });
      })
    })
    console.log('listget ',listget);
    const listget2=[];
    //get post
    for await (let item of listget) {
      await firestore().collection('posts').doc(item.postId).get()
      .then( async (snap) => {
         if(!snap.exists) {
             await firestore()
              .collection('users')
              .doc(user.uid)
              .collection('collect')
              .doc(item.postId)
              .delete()
              .then(() => {
              console.log('no exist collect deleted!');
              }).catch(e=>
                console.log('error'))
         } else {
            console.log('有 ', snap);
            console.log('有 Data ', );
            const {userid,post,postImg,postTime,name,Trip,userImg,collected}=snap.data();
            listget2.push({
              id:snap.id ,
              userid,
              name:name,
              img: postImg,
              content: post,
              time:postTime,
              Trip:Trip,
              userImg,
              collected,
            });
         }
      })
    };
    setCollect(listget2);
    if(loading)setLoading(false);
  }

  useEffect(() => {
    fetchCollect();
  }, []);
  //收藏change
  useEffect(() => {
    const listen = DeviceEventEmitter.addListener('collectSend', () => {
      fetchCollect();
    });
    return () => listen.remove();
  }, []);

  useEffect(() => {
    console.log('have delete ');
    fetchCollect();
  }, [deleted]);


const handleDelete = postId => {
        Alert.alert(
          '貼文刪除後不可復原',
          '確定要刪除貼文嗎?',
          [
            {
              text: '取消',
              onPress: () => console.log('Cancel Pressed!'),
              //style: 'cancel',
            },
            {
              text: '確認',
              onPress: () => deletePost(postId),
            },
          ],
          {cancelable: false},
        );
      };
    
      const deletePost = postId => {
        // console.log('Current Post Id:',postId);
         firestore()
          .collection('posts')
          .doc(postId)
          .get()
          .then(documentSnapshot => {
            if (documentSnapshot.exists) {
              const {postImg} = documentSnapshot.data();
              if (postImg != null) {
                const storageRef = storage().refFromURL(postImg);
                const imgRef = storage().ref(storageRef.fullPath);
    
                imgRef
                  .delete()
                  .then(() => {
                   // console.log(`${postImg} has  delete`);
                   // setDeleted(true);
                    deleteFirebaseData(postId);
                  })
                  .catch(e => {
                    console.log('Error: ', e);
                  });
              } else {
                deleteFirebaseData(postId);
               // setDeleted(true);
              }
            }
          });
      };
      const deleteFirebaseData =async  (postId) => {
        console.log('deleteFirebaseData ',deleted);
        console.log('postid ',postId);
         await firestore()
          .collection('posts')
          .doc(postId)
          .delete()
          .then(() => {
            console.log('成功');
            Alert.alert('成功刪除貼文!');
            console.log('qq ',deleted);
            setDeleted(true); })
          .catch(e => console.log('山資料err ', e));
         
        };
        const EmptyList =({})=>{
            return ( 
            <View style={{flex:1,flexDirection:'column',top:80,}}>
            <View style={{flex:1, 
              justifyContent: 'center',
              alignItems: 'center',}}>
                <View style={styles.imageContainer}>
                
                  <View>
                  <Icon
                    name={'camera-outline'}
                    size={60}
                    color={'#5f695d'}
                  />
                </View>
                  
                </View>
              <View syle={{flex:1,}}>
              <Text style={{fontSize: 25,textAlignVertical: 'center' ,}}>尚無貼文</Text>
          </View>
            </View>
            </View>
            );
          }

  return (
      <View>
    {loading ?
      (<View style={{top:height/2,justifyContent: 'center', flex: 1}}>
        <ActivityIndicator animating={true} color={'#BEBEBE'} size='large' />
       </View> )
       :
      (<FlatList
      //columnWrapperStyle={{justifyContent:'space-between'}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        marginTop: 10,
        paddingBottom: 80,
      }}
      ListEmptyComponent={EmptyList}
      numColumns={1}
      initialNumToRender={2}
      windowSize={2}
      data={collect}
      //ListHeaderComponent={FlatList_Header}
      renderItem={({item}) => (
        <Card
          navigation={navigation}
          post={item}
          onDelete={handleDelete}
        />
      )}></FlatList>
    
    )
    }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    hight: '100%',
    //backgroundColor: '#F2F2F2',//9/14改
    backgroundColor: '#ffffff',
    flex: 1,
  },
});

export default Collect;
