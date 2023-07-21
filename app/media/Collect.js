import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  DeviceEventEmitter,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Card from './Card';
import { AuthContext } from '../routes/AutoProvider';

const height = Dimensions.get('screen').height/2;

const Collect = () => {
  const {user} = useContext(AuthContext);
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [collect, setCollect] = useState([]);
   const fetchCollect=async()=>{
    const listget=[];
    //get collect post name
    await  firestore()
    .collection('users')
    .doc(user.uid)
    .collection('collect')
    .orderBy('collectTime','desc')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach( doc => {
        const { postId } = doc.data();
        listget.push({
          postId
        });
      })
    })
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
        },
        {
          text: '確認',
          onPress: () => deletePost(postId),
        },
      ],
      { cancelable: false },
    );
  };    

  const deletePost = postId => {
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
          imgRef.delete()
          .then(() => {
            deleteFirebaseData(postId);
          }).catch(e => {
            console.log('Error: ', e);
          });
        } else {
          deleteFirebaseData(postId);
        }
      }
    });
  };

  const deleteFirebaseData =async  (postId) => {
  await firestore()
    .collection('posts')
    .doc(postId)
    .delete()
    .then(() => {
      console.log('成功');
      Alert.alert('成功刪除貼文!');
      setDeleted(true);
    }).catch(e => {
      console.log('刪資料err ', e);
    });
  };

  const EmptyList =({}) => {
    return ( 
    <View style={{flex:1,flexDirection:'column',top:80,}}>
      <View style={{
        flex:1, 
        justifyContent: 'center',
        alignItems: 'center',}}
      >
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
        </View> ) : (<FlatList
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
          renderItem={({item}) => (
          <Card
            navigation={navigation}
            post={item}
            onDelete={handleDelete}
          />
          )}>
        </FlatList>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    hight: '100%',
    backgroundColor: '#ffffff',
    flex: 1,
  },
});

export default Collect;
