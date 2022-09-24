import React, {Component, useEffect, useState} from 'react';
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

const Stack = createNativeStackNavigator();
const width = Dimensions.get('screen').width / 6;
const width2 = (Dimensions.get('screen').width * 49) / 50;
//const height = width - 5;
const height = Dimensions.get('screen').height/2;

const All = (item) => {
    const [deleted, setDeleted] = useState(false);
  const [Posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
   const data=item.item;
   const fetchPosts = async () => {
    try {
      const listpost = [];
      //get post
      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc') //照時間排
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {userid, post, postImg, postTime, name, Trip} = doc.data();
            listpost.push({
              id: doc.id,
              userid,
              name: name,
              img: postImg,
              content: post,
              time: postTime,
              Trip: Trip,
            });
          });
        });
      setPosts(listpost);
      //console.log('my ',my);
      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  useEffect(() => {
    console.log('have delete ');
    fetchPosts();
  }, [deleted]);

  useEffect(() => {
    const listen = DeviceEventEmitter.addListener('postSend', () => {
      fetchPosts();
    });
    return () => listen.remove();
  }, []);

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
      data={Posts}
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

export default All;
