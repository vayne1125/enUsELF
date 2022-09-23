import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  Modal,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Card from './Card';

const Stack = createNativeStackNavigator();
const width = Dimensions.get('screen').width / 6;
const width2 = (Dimensions.get('screen').width * 49) / 50;
const height = width - 5;
const Height = Dimensions.get('screen').height*6/30;

const initialState = {
  id: {},
  name: {},
  address: {},
  city: {},
  region: {},
  info: {},
  time: {},
};
const Collect = () => {

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

  return (
  
    <Text>collect</Text>
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
