import React, { useCallback, useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  DeviceEventEmitter,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import Iconcross from 'react-native-vector-icons/Entypo';
import Iconcamera from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

import { AuthContext } from '../routes/AutoProvider';
import Hotplace from '../data/Hotplace';
import Shopplace from '../data/Shopplace';
import Holplace from '../data/Holplace';
import Food from '../data/Food';
import Hotel from '../data/Hotel';
import KOL from '../data/KOL';
import Monuments from '../data/Monuments';
import Nature from '../data/Nature';

const picwidth = Dimensions.get('screen').width * 0.9;
const picheight = picwidth * 2 / 3;
//widt 300 h220

const Card = ({ navigation, post, onDelete }) => {
  const { user } = useContext(AuthContext);
  const [collect, setCollect] = useState(false);
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false);
  const [becollected, setbecollected] = useState(post.collected);
  const username = post.name;
  const sites = post.Trip;
  let timestamp = post.time;
  let timestring = moment(timestamp.toDate()).format('YYYY-MM-DD');
  const [userSchdule, setUserSchdule] = useState([]);
  const data = [];

  //拿景點資料
  useEffect(() => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('collect')
      .where('postId', '==', post.id)
      .get()
      .then(snap => {
        if (snap.empty) {
          setCollect(false); //淺的
        } else {
          setCollect(true); //深的
        }
      });
    if (sites != null) {
      if (sites.desSite.type === 'food') {
        data.push(Food[sites.desSite.id]);
      } else if (sites.desSite.type === 'nature') {
        data.push(Nature[sites.desSite.id]);
      } else if (sites.desSite.type === 'kol') {
        data.push(KOL[sites.desSite.id]);
      } else if (sites.desSite.type === 'monuments') {
        data.push(Monuments[sites.desSite.id]);
      } else if (sites.desSite.type === 'hotel') {
        data.push(Hotel[sites.desSite.id]);
      } else if (sites.desSite.type === 'hol') {
        data.push(Holplace[sites.desSite.id]);
      } else if (sites.desSite.type === 'hot') {
        data.push(Hotplace[sites.desSite.id]);
      } else if (sites.desSite.type === 'shop') {
        data.push(Shopplace[sites.desSite.id]);
      }
      sites.site.map(param => {
        if (param.type === 'food') {
          data.push(Food[param.id]);
        } else if (param.type === 'nature') {
          data.push(Nature[param.id]);
        } else if (param.type === 'kol') {
          data.push(KOL[param.id]);
        } else if (param.type === 'monuments') {
          data.push(Monuments[param.id]);
        } else if (param.type === 'hotel') {
          data.push(Hotel[param.id]);
        } else if (param.type === 'hol') {
          data.push(Holplace[param.id]);
        } else if (param.type === 'hot') {
          data.push(Hotplace[param.id]);
        } else if (param.type === 'shop') {
          data.push(Shopplace[param.id]);
        }
      });
    }
    setUserSchdule(data);
  }, []);
  //收藏
  const changecollect = () => {
    if (collect == true) {
      //取消收藏
      setCollect(false); 
      setbecollected(becollected-1);
      console.log('colected--  ',becollected);
      firestore()
      .collection('posts')
      .doc(post.id)
      .update({
      collected: becollected-1,
      })
      .then(() => {
        console.log('User updated!');
      });
      //指定文件名刪除
      firestore()
        .collection('users')
        .doc(user.uid)
        .collection('collect')
        .doc(post.id)
        .delete()
        .then(() => {
          console.log('User deleted!');
        })
        .catch(e => console.log('error'));
    } else {
      //加入收藏
      setCollect(true);
      setbecollected(becollected+1);      
      firestore()
      .collection('posts')
      .doc(post.id)
      .update({
      collected: becollected+1,
      })
      .then(() => {
        console.log('User updated!');
      });
      
      //用post.id命名
      firestore()
        .collection('users')
        .doc(user.uid)
        .collection('collect')
        .doc(post.id)
        .set({
          postId: post.id,
          collectTime: firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log('collect add !');
        })
        .catch(error => {
          console.log('collect Failed!', error);
        });
    } DeviceEventEmitter.emit('collectSend');
  };
  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length > 2); //to check the text is more than 4 lines or not
  }, []);
  const toggleNumberOfLines = () => { //To toggle the show text or hide it
    setTextShown(!textShown);
  }
  return (
    <View style={styles.card}>
      <View style={styles.nameContainer}>
        <View style={styles.info}>
          { post.userImg == "" ? 
            <Icons
              name={'person-circle-outline'} 
              size={36} 
            /> : <Image
              roundAsCircle={true}
              resizeMode={'stretch'}
              style={{ margin: 10, borderRadius: 20, height: 35, width: 35 }}
              source={{ uri: post.userImg }}
            />
          }
        </View>
        <View style={styles.nameTextContainer}>
          <Text style={styles.nameStyle}>{post.name}</Text>
        </View>
        { user.uid == post.userid ? (
            <View style={styles.deliconContainer}>
              <TouchableOpacity
                onPress={() => onDelete(post.id)}
                style={{ flex: 1 }}>
                <Iconcross
                  name="cross"
                  size={40}
                  color={'#5f695d'}
                  style={styles.TopiconStyle}
                />
              </TouchableOpacity>
            </View>
        ) : (
          <View style={styles.deliconContainer}></View>
        )}
      </View>

      <View style={styles.imageContainer}>
        { post.img != null ? (
          <Image
            style={styles.image}
            resizeMode={'stretch'}
            source={{ uri: post.img }}
          />
        ) : (
          <View style={styles.imageContainer}>
            <View>
              <Iconcamera
                name={'camera-off-outline'}
                size={60}
                color={'#5f695d'}
              />
            </View>
            <Text style={{ fontSize: 18 }}>此貼文無照片</Text>
          </View>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.collectContainer}>
          <TouchableOpacity onPress={changecollect}>
            {collect ? (
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  name={'bookmark'}
                  size={24}
                  color={'#ffc56b'}
                  style={styles.collectIconStyle}
                />
              </View>
            ) : (
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  name={'bookmark-o'}
                  size={24}
                  color={'#000000'}
                  style={styles.collectIconStyle}
                />
              </View>
            )}
          </TouchableOpacity>
          <Text>{'     '}</Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Schedule', {
              sites: sites,
              userSchdule: userSchdule,
              username: username,
            });
          }}>
            <Iconcamera
              name={'bag-suitcase-outline'}
              size={27}
              color={'#000000'}
              style={styles.collectIconStyle}
            />
          </TouchableOpacity >
        </View>
        <View style={{ justifyContent: 'flex-end', flex: 2 }}><Text style={{ textAlign: 'right' }}>已有 {becollected} 人收藏</Text></View>
      </View>
      <View style={styles.textContainer}>
        <Text
          onTextLayout={onTextLayout}
          numberOfLines={textShown ? undefined : 2}
          style={{ lineHeight: 21, color: '#5f695d', flexDirection: 'row' }}>{post.content}</Text>
        {
          lengthMore ? <Text
            onPress={toggleNumberOfLines}
            style={{ fontWeight: '700', flexDirection: 'row' }}>{textShown ? '\n收起' : '...更多'}</Text>
            : null
        }
        <Text style={{ textAlign: 'right' }}>{timestring}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 'auto',
    backgroundColor: 'white',
    width: '100%',
    right: '2.5%',
    marginHorizontal: 10,
    marginBottom: 15,
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  nameContainer: {
    flexDirection: 'row',
    flex: 2.1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  info: {
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1,
  },
  nameTextContainer: {
    flex: 4,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  nameStyle: {
    fontWeight: 'bold',
    fontSize: 21,
    color: '#5f695d',
    left: '-3%',
  },
  deliconContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  TopiconStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    top: '13%',
  },
  imageContainer: {
    height: picheight,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  image: {
    height: picheight,
    width: picwidth,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: picwidth,
    alignSelf: 'center',
    marginBottom: '2%',
    borderColor: '#D1DED7',
  },
  textStyle: {
    fontSize: 16,
    color: '#5f695d',
    letterSpacing: 1,
  },
  bottomContainer: {
    flex: 2,
    paddingTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: picwidth,
    alignSelf: 'center',
  },
  collectContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    alignSelf: 'center',
    height: '100%',
  },
  collectIconStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  collectTextStyle: {
    fontWeight: '800',
    fontSize: 17,
    letterSpacing: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    backgroundColor: '#ffc56b', //較深黃
    flex: 1,
    height: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 30,
    margin: 5,
    right: '10%',
  },
  buttonText: {
    fontWeight: '800',
    fontSize: 17,
    color: '#6b5238',
    letterSpacing: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
export default Card;
