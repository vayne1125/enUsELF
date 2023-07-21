import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
  DeviceEventEmitter,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {CheckBox} from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../routes/AutoProvider';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/EvilIcons';

import Hotplace from '../data/Hotplace';
import Shopplace from '../data/Shopplace';
import Holplace from '../data/Holplace';
import Food from '../data/Food';
import Hotel from '../data/Hotel';
import KOL from '../data/KOL';
import Monuments from '../data/Monuments';
import Nature from '../data/Nature';
import ThemeImg from '../data/ThemeImg';
import MapImg from '../data/MapImg';

const height = Dimensions.get('screen').height;
const cardHeight = Dimensions.get('screen').height / 7;

const Items = () => {
  const {user} = useContext(AuthContext);
  const [sites, setSites] = useState([]);
  const [cnt, setCnt] = useState(0);
  const [loading, setLoading] = useState(false);

  const Cnt = async () => {
    setLoading(true);
    try {
      var count = 0;
      if (user) {
        const users = firestore().collection('users').doc(user.uid);
        const querySnapshot = await users.collection('list').get();
        querySnapshot.forEach(() => {
          count++; 
        });
        setCnt(count);
      }
    } catch (e) {
      console.error("items_Cnt: ", e);
    }
  }

  const fetchSites = async () => {
    try {
      if (user) {
        const users = firestore().collection('users').doc(user.uid);
        const querySnapshot = await users.collection('list').get();
        const list = querySnapshot.docs.map(doc => {
          const { check, id, type } = doc.data();
          var data;
          if (type === 'food') data = Food[id];
          else if (type === 'nature') data = Nature[id];
          else if (type === 'kol') data = KOL[id];
          else if (type === 'monuments') data = Monuments[id];
          else if (type === 'hotel') data = Hotel[id];
          else if (type === 'hol') data = Holplace[id];
          else if (type === 'hot') data = Hotplace[id];
          else if (type === 'shop') data = Shopplace[id];

          return {
            name: data.name,
            city: data.city,
            region: data.region,
            place_id: data.place_id,
            check: check,
            type: type,
            id: id,
          };
        });
        setSites(list);
        setLoading(false);
      }
      DeviceEventEmitter.emit('items');
    } catch (e) {
      console.log("items_fetchSites: ", e);
    }
  };

  const CheckDel = (name) => {
    Alert.alert('', '確定要刪除嗎?', [
      {
        text: '確認',
        onPress: async () => {
          setLoading(true);
          try {
            if (user) {
              const users = firestore().collection('users').doc(user.uid);
              await users.collection('list').doc(name).delete();
              ToastAndroid.show("已成功刪除！",ToastAndroid.SHORT);
              DeviceEventEmitter.emit('change', name, true);
              setCnt(cnt - 1);
            }
          } catch (error) {
            ToastAndroid.show("發生錯誤！請稍後重試",ToastAndroid.SHORT);
            console.error("items_CheckDel: ", error);
          }
        },
      },
      {
        text: '取消',
      },
    ]);
  };


  useEffect(() => {
    Cnt();
  }, [user]);

  useEffect(() => {
    fetchSites();
  }, [cnt]);


  const Card = ({site}) => {
    useEffect(() => {
      const listen = DeviceEventEmitter.addListener('allcheck', check => {
        setCheck(!check);
      });
      return () => listen.remove();
    }, [cnt]);
    const [check, setCheck] = useState(site.check);
    return (
      <View style={styles.card}>
        <View style={styles.boxContainer}>
          <>
            <CheckBox
              center
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              containerStyle={{backgroundColor: '#F2F2F2'}}
              checked={check}
              onPress={() => {
                if (user) {
                  const users = firestore().collection('users').doc(user.uid);
                  users
                    .collection('list')
                    .doc(site.name)
                    .update({check: !check});
                }
                DeviceEventEmitter.emit('items');
                setCheck(!check);
              }}
            />
          </>
        </View>
        <View style={styles.siteContainer}>
          <View style={styles.imageContainer}>
          {
            (site.type=== "hot" || site.type === "hol" || site.type === "shop")?
            <Image style={styles.image} source={MapImg[site.type+(site.id.toString())]} />:
            <Image style={styles.image} source={ThemeImg[site.name]} />   
          }
          </View>
            <View style={{flex: 4, justifyContent: 'space-around', padding: 5}}>
              <View style={styles.textContainer}>
                <Text numberOfLines={1} style={styles.nameStyle}>
                  {site.name}
                </Text>
              </View>
              <View style={styles.textContainer2}>
                <Text style={styles.addressStyle}>
                  {site.city} {site.region}
                </Text>
                <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => {
                CheckDel(site.name);
              }}>
              <View>
                <Icons
                  name="trash"
                  size={28}
                  color={'#5f695d'}
                  style={styles.iconStyle}
                />
              </View>
            </TouchableOpacity>
            </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const fetchSchedule = async () => {
    try {
      let list = [];
      if (user) {
        ToastAndroid.show('開啟地圖中，請等候', ToastAndroid.SHORT);
        const users = firestore().collection('users').doc(user.uid);
        const querySnapshot = await users.collection('list').get();
        querySnapshot.forEach(doc => {
          const { type, id, place_id, check } = doc.data();
          if (check) {
            list.push({
              type: type,
              id: id,
              place_id: place_id,
            });
          }
        });
        navigation.current.navigate('MapHome', list);
      }
    } catch (e) {
      ToastAndroid.show('開啟地圖失敗，請稍後再試', ToastAndroid.SHORT);
      console.error("items_fetchSchedule: ", e);
    }
  };
  const navigation = useRef(useNavigation());
  useEffect(() => {
    const listen = DeviceEventEmitter.addListener('gotomap', () => {
      fetchSchedule();
    });

    return () => {
      listen.remove();
    };
  }, []);

  const EmptyList =({})=>{
    return ( 
    <View style={{justifyContent: 'center',alignItems: 'center'}}>
        <View style={{flex:5,justifyContent:'center',alignContent:'center',alignSelf:'center'}}>
          <Icon
            name={'map-marker-off'}
            size={60}
            color={'#5f695d'}
          />
        </View>
        <View style={{flex:1,}}>
            <Text style={{fontSize: 25,textAlignVertical: 'center' ,}}>尚無景點</Text>
        </View>
    </View>
    );
  }
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{justifyContent: 'center', flex: 1}}>
          <ActivityIndicator
            animating={true}
            color={'#BEBEBE'}
            size={'large'}
          />
        </View>
      ) : (
        <FlatList
          ListEmptyComponent={EmptyList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: '2%',
            paddingBottom: '5%',
          }}
          numColumns={1}
          initialNumToRender={6}
          windowSize={2}
          data={sites}
          keyExtractor={item => item.place_id}
          renderItem={({item}) => <Card site={item} />}></FlatList>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  card: {
    height: cardHeight,
    width: '100%',
    marginTop: '2%',
    flex: 1,
    flexDirection: 'row',
    paddingRight: '2%',
    justifyContent: 'space-around',
  },
  boxContainer: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  siteContainer: {
    flex: 8.5,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: '3%',
    borderRadius: 30,
    borderColor: '#D1DED7',
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    padding: 5,
  },
  textContainer2: {
    flex: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'flex-start',
    padding: 10,
    flexDirection:'row',
  },
  imageContainer: {
    flex: 3,
    alignItems: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  nameStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#5f695d',
    letterSpacing: 3,
    backgroundColor: '#D1DED7',
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
  },
  addressStyle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'gray',
    letterSpacing: 1,
  },
  iconContainer:{
    flex:1,
    justifyContent:'flex-end',
    alignItems:'flex-end',
  }
});

export default Items;
