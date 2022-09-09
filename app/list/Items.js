import React, {useState, useEffect, useContext, useRef} from 'react';
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
} from 'react-native';
import Icons from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CheckBox} from '@rneui/themed';
import Image_link from '../theme/Image';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {parseMapToJSON} from 'source-map-resolve';
import {AuthContext} from '../routes/AutoProvider';
import {useNavigation} from '@react-navigation/native';

import Hotplace from '../map/Hotplace';
import Shopplace from '../map/Shopplace';
import Holplace from '../map/Holplace';
import Food from '../theme/Food';
import Hotel from '../theme/Hotel';
import KOL from '../theme/KOL';
import Monuments from '../theme/Monuments';
import Nature from '../theme/Nature';
const width = Dimensions.get('screen').width;
const cardHeight = Dimensions.get('screen').height / 7;

const Items = () => {
  const {user} = useContext(AuthContext);
  const [sites, setSites] = useState([]);
  const [cnt, setCnt] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const Cnt = () => {
      setLoading(true);
      var count = 0;
      if (user) {
        const users = firestore().collection('users').doc(user.uid);
        users
          .collection('list')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(() => {
              count++;
            });
            setCnt(count);
          })
          .catch(() => {});
      }
    };
    Cnt();
  }, [user]);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const list = [];
        if (user) {
          const users = firestore().collection('users').doc(user.uid);
          await users
            .collection('list')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                const {check, id, type} = doc.data();
                var data;
                if (type === 'food') data = Food[id];
                else if (type === 'nature') data = Nature[id];
                else if (type === 'kol') data = KOL[id];
                else if (type === 'monuments') data = Monuments[id];
                else if (type === 'hotel') data = Hotel[id];
                else if (type === 'hol') data = hol[id];
                else if (type === 'hot') data = hot[id];
                else if (type === 'shop') data = shop[id];

                list.push({
                  name: data.name,
                  city: data.city,
                  region: data.region,
                  check: check,
                });
              });
            });
          setSites(list);
          setLoading(false);
        }
        DeviceEventEmitter.emit('items');
      } catch (e) {
        console.log(e);
      }
    };
    fetchSites();
  }, [cnt]);

  const CheckDel = name => {
    Alert.alert('', '確定要刪除嗎?', [
      {
        text: '確認',
        onPress: () => {
          if (user) {
            setLoading(true);
            const users = firestore().collection('users').doc(user.uid);
            users
              .collection('list')
              .doc(name)
              .delete()
              .then(() => {
                DeviceEventEmitter.emit('delete', name);
                setCnt(cnt - 1);
              })
              .catch(error => {});
          }
        },
      },
      {
        text: '取消',
      },
    ]);
  };
  const Card = ({site}) => {
    useEffect(() => {
      const listen = DeviceEventEmitter.addListener('allcheck', check => {
        setCheck(!check);
      });
      return () => listen.remove();
    }, []);
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
            {<Image style={styles.image} source={Image_link[site.name]} />}
          </View>
          {/* <View style={{flex: 2}}>
            <TouchableOpacity
              onPress={() => {
                CheckDel(site.name);
              }}>
              <View style={{right: -100}}>
                <Icons
                  name="circle-with-cross"
                  size={25}
                  color={'#5f695d'}
                  style={styles.iconStyle}
                />
              </View>
            </TouchableOpacity>
            </View> */}
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
                <Icon
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
  const navigation = useRef(useNavigation());
  useEffect(() => {
    const fetchSchedule = () => {
      const list = [];
      const listen = DeviceEventEmitter.addListener('gotomap', async () => {
        try {
          if (user) {
            const users = firestore().collection('users').doc(user.uid);
            await users
              .collection('list')
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  const {type, id, place_id, check} = doc.data();
                  if (check) {
                    list.push({
                      type: type,
                      id: id,
                      place_id: place_id,
                    });
                  }
                });
              });
            console.log(list);
            navigation.current.navigate('MapHome', list);
          }
        } catch (e) {}
      });
      return () => {
        listen.remove();
      };
    };
    fetchSchedule();
  }, []);

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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: '2%',
            paddingBottom: '5%',
          }}
          numColumns={1}
          data={sites}
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
    //backgroundColor:'#D1DED7',
    //backgroundColor: '#ffffff',
    width: '100%',
    marginTop: '2%',
    //borderRadius: 10,
    //marginBottom: '2%',
    //padding: 3,
    //right: 2,
    //borderColor: '#D1DED7',
    //borderWidth: 3,
    flex: 1,
    flexDirection: 'row',
    paddingRight: '2%',
    //borderBottomWidth: 1,
    //borderBottomColor:'#AAAAAA',
    // borderRightWidth:3,
    // borderRightColor:'#ffffff',

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
    //borderWidth:2,
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
    //alignSelf: 'center',
    //alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  textContainer2: {
    flex: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    //alignSelf: 'center',
    //alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    //backgroundColor:'#000000'
    flexDirection:'row',
  },
  imageContainer: {
    flex: 3,
    alignItems: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  nameStyle: {
    //alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    //color: '#D1DED7',
    color: '#5f695d',
    letterSpacing: 3,
    backgroundColor: '#D1DED7',
    //backgroundColor:'#5f695d',
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
  },
  addressStyle: {
    //alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: 'gray',
    letterSpacing: 1,
  },
  iconContainer:{
    flex:1,
    justifyContent:'flex-end',
    //backgroundColor:'black',
    alignItems:'flex-end',
  }
});

export default Items;
