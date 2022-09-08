import React, {Component, useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  Alert,
  DeviceEventEmitter,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import Iconcross from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import MediaTop from './MediaTop';
import {AuthContext} from '../routes/AutoProvider';
import Card from './Card';
const width = Dimensions.get('screen').width - 20;

const MediaHome = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [Posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [userdata, setuserdata] = useState(null);
  const [collect, setCollect] = useState([]);
  const [all, setAll] = useState([]);
  const [choose, setChoose] = useState('all');
  const array = [];
  const fetchPosts = async () => {
    try {
      const list = [];
      //get post
      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc') //照時間排
        .get()
        .then(querySnapshot => {
          //console.log('Total Posts:',querySnapshot.size);
          querySnapshot.forEach(doc => {
            const {userid, post, postImg, postTime, name, Trip} = doc.data();
            list.push({
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
      setPosts(list);
      if (loading) {
        setLoading(false);
      }
      console.log('ㄟㄟˋpost:', list);
      //get post user name
      await firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(documentSnapshot => {
          const data = documentSnapshot.data();
          setuserdata(data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const listen = DeviceEventEmitter.addListener('postSend', () => {
      fetchPosts();
    });
    return () => listen.remove();
  }, []);
  //取消收藏了
  useEffect(() => {
    const listen = DeviceEventEmitter.addListener('deleteCollect', () => {
      fetchPosts();
    });
    return () => listen.remove();
  }, []);
  //刪文
  useEffect(() => {
    fetchPosts();
    setDeleted(false);
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
      //{cancelable: false},
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
                console.log(`${postImg} has  delete`);
                deleteFirebaseData(postId);
                setDeleted(true);
              })
              .catch(e => {
                console.log('Error: ', e);
              });
          } else {
            deleteFirebaseData(postId);
          }
        }
      });
  };
  const deleteFirebaseData = postId => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert('成功刪除貼文!');
        setDeleted(true);
      })
      .catch(e => console.log('山資料err ', e));
  };
  const FlatList_Header = ({}) => {
    return (
      <View style={styles.mycard}>
        <View style={styles.nameContainer}>
          <View style={styles.icon}>
            <Icons name={'person-circle-outline'} size={32} />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Post', userdata);
            }}
            style={{flex: 1}}>
            <Text style={styles.buttonText}>和大家分享你的旅遊經歷吧</Text>
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
      {/* <LinearGradient
        start={{x: 0.8, y: 0.0}}
        end={{x: 1.0, y: 1.0}}
        locations={[0, 0.5, 1.0]}
        colors={['#F2F2F2', '#D1DED7', '#6E877B']}
        style={styles.linearGradient}> */}
      <View style={styles.chooseContainer}>
        {choose === 'all' ? (
          <View style={styles.chooseed}>
            <LinearGradient
              start={{x: 1.0, y: 0.0}}
              end={{x: 1.0, y: 1.0}}
              locations={[0, 0.45, 0.55, 1.0]}
              colors={['#BECFC3', '#F2F2F2', '#F2F2F2', '#BECFC3']}
              style={styles.linearGradient}>
              <TouchableOpacity
                onPress={() => {
                  setChoose('all');
                }}>
                <Text style={styles.textStyle2}>全 部</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ) : (
          <View style={styles.unchoose}>
            <TouchableOpacity
              onPress={() => {
                setChoose('all');
              }}>
              <Text style={styles.textStyle}>全 部</Text>
            </TouchableOpacity>
          </View>
        )}
        {choose === 'collect' ? (
          <View style={styles.chooseed}>
            <LinearGradient
              start={{x: 1.0, y: 0.0}}
              end={{x: 1.0, y: 1.0}}
              locations={[0, 0.45, 0.55, 1.0]}
              colors={['#BECFC3', '#F2F2F2', '#F2F2F2', '#BECFC3']}
              style={styles.linearGradient}>
              <TouchableOpacity
                onPress={() => {
                  setChoose('collect');
                }}>
                <Text style={styles.textStyle2}>收 藏</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ) : (
          <View style={styles.unchoose}>
            <TouchableOpacity
              onPress={() => {
                setChoose('collect');
              }}>
              <Text style={styles.textStyle}>收 藏</Text>
            </TouchableOpacity>
          </View>
        )}
        {choose === 'mypost' ? (
          <View style={styles.chooseed}>
            <LinearGradient
              start={{x: 1.0, y: 0.0}}
              end={{x: 1.0, y: 1.0}}
              locations={[0, 0.45, 0.55, 1.0]}
              colors={['#BECFC3', '#F2F2F2', '#F2F2F2', '#BECFC3']}
              style={styles.linearGradient}>
              <TouchableOpacity
                onPress={() => {
                  setChoose('mypost');
                }}>
                <Text style={styles.textStyle2}>我的貼文</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ) : (
          <View style={styles.unchoose}>
            <TouchableOpacity
              onPress={() => {
                setChoose('mypost');
              }}>
              <Text style={styles.textStyle}>我的貼文</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.info}>
        {/*內容*/}
        {loading ? (
          <View style={{justifyContent: 'center', flex: 1}}>
            <ActivityIndicator animating={true} color={'#BEBEBE'} size={80} />
          </View>
        ) : (
          <FlatList
            //columnWrapperStyle={{justifyContent:'space-between'}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 10,
              paddingBottom: 80,
            }}
            numColumns={1}
            data={Posts}
            //ListHeaderComponent={FlatList_Header}
            renderItem={({item}) => (
              <Card
                navigation={navigation}
                post={item}
                onDelete={handleDelete}
              />
            )}></FlatList>
        )}
      </View>
      {/* </LinearGradient> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  topbar: {
    flex: 1,
  },
  chooseContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    alignSelf: 'center',
    paddingLeft: '2%',
    paddingRight: '2%',
    // borderBottomWidth:1,
    // borderColor:'#AAAAAA',
  },
  unchoose: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    alignSelf: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#92A18F',
    letterSpacing: 5,
  },
  textStyle2: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#5f695d',
    letterSpacing: 5,
  },
  chooseed: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#D1DED7',
    height: '75%',
    borderRadius: 20,
  },
  info: {
    flex: 10.8, //last:11.8
    //backgroundColor:'#D1DED7',
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
    borderBottomWidth: 3,
    //borderRightWidth:2,
    //borderStyle:'dashed',
  },
  deliconContainer: {
    left: 250,
  },
  nameContainer: {
    flexDirection: 'row',
    backgroundColor: '#D1DED7',
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    //position:'relative',
  },
  icon: {
    left: 8,
    top: 5,
  },
  buttonText: {
    fontWeight: '800',
    fontSize: 17,
    color: '#6b5238',
    top: 8,
    letterSpacing: 10,
    left: 7,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    //flex: 11.8,
    //paddingLeft: 15,
    //paddingRight: 15,
    //borderRadius: 5
    alignItems: 'center',
    alignSelf: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});

export default MediaHome;
