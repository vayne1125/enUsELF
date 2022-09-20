import React, {useCallback, useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  DeviceEventEmitter,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import Iconcross from 'react-native-vector-icons/Entypo';
import Iconcamera from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../routes/AutoProvider';
import Hotplace from '../map/Hotplace';
import Shopplace from '../map/Shopplace';
import Holplace from '../map/Holplace';
import Food from '../theme/Food';
import Hotel from '../theme/Hotel';
import KOL from '../theme/KOL';
import Monuments from '../theme/Monuments';
import Nature from '../theme/Nature';
const width = Dimensions.get('screen').width;
const height = (Dimensions.get('screen').height * 9) / 20;
const screenwidth = Dimensions.get('screen').width ;

const Card = ({navigation, post, onDelete}) => {
  const {user} = useContext(AuthContext);
  const [color, setColor] = useState('#ffc56b'); //改
  const [collect, setCollect] = useState(false);
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore,setLengthMore] = useState(false);
  const username = post.name;
  const sites = post.Trip;
  //const userSchdule=post.Trip;
  let timestamp = post.time;
  const [userSchdule, setUserSchdule] = useState([]);
  const [imageheight,setimageheight] = useState(200);
  const data = [];

  useEffect (()=>{
    if(post.img!=null){
    Image.getSize(post.img, (width, height) => {
      console.log('hahaha ',imagesize);
      setimageheight( Math.floor(screenwidth/(width*height)));
    //console.log('pcture ',height);
  //console.log('pcturewidth ',width);
  });}
    },[])

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
      //console.log('herse11 ',sites.site);
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
    //console.log('data ',data);
  }, []);
  // console.log('1user.uid ',user.uid);
  //收藏
  const changecollect = () => {
    if (collect == true) {
      //取消收藏
      setCollect(false);
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
      //用post.id命名
      firestore()
        .collection('users')
        .doc(user.uid)
        .collection('collect')
        .doc(post.id)
        .set({
          postId: post.id,
          collectTime: firestore.Timestamp.fromDate(new Date()),
          //coomments:null,
        })
        .then(() => {
          console.log('collect add !');
          //Alert.alert("成功發布");
        })
        .catch(error => {
          console.log('collect Failed!', error);
        });
    } DeviceEventEmitter.emit('collectSend');
  };
  //console.log('1post.use ', post.img);
  const onTextLayout = useCallback(e =>{
    setLengthMore(e.nativeEvent.lines.length >=4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
},[]);
const toggleNumberOfLines = () => { //To toggle the show text or hide it
  setTextShown(!textShown);
}
  return (
    <View style={styles.card}>
      <View style={styles.nameContainer}>
        <View style={styles.info}>
          <Icons name={'person-circle-outline'} size={36} />
        </View>
        <View style={styles.nameTextContainer}>
          <Text style={styles.nameStyle}>{post.name}</Text>
        </View>
        {user.uid == post.userid ? (
          <View style={styles.deliconContainer}>
            <TouchableOpacity
              onPress={() => onDelete(post.id)}
              style={{flex: 1}}>
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

      <View style={[styles.imageContainer,{height:imageheight,}]}>
        {post.img != null ? (
          <Image
            style={styles.image}
            resizeMode={'stretch'}
            source={{uri: post.img}}
          />
        ) : (
          <View style={[styles.imageContainer,{height:imageheight,}]}>
            <View>
              <Iconcamera
                name={'camera-off-outline'}
                size={60}
                color={'#5f695d'}
              />
            </View>
            <Text style={{fontSize: 18}}>此貼文無照片</Text>
          </View>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.collectContainer}>
          <TouchableOpacity onPress={changecollect}>
            {collect ? (
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name={'bookmark'}
                  size={24}
                  color={'#ffc56b'}
                  style={styles.collectIconStyle}
                />
                {/* <Text style={styles.collectTextStyle}>
                  <Text> </Text>
                  <Text style={{color:'#ffc56b'}}>已收藏</Text>
                </Text> */}
              </View>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name={'bookmark-o'}
                  size={24}
                  style={styles.collectIconStyle}
                />
                {/* <Text style={styles.collectTextStyle}>
                  <Text> </Text>
                  <Text>收藏</Text>
                </Text> */}
              </View>
            )}
          </TouchableOpacity>
          <Text>{'     '}</Text>
            <TouchableOpacity  onPress={() => {
              navigation.navigate('Schedule', {
                sites: sites,
                userSchdule: userSchdule,
                username: username,
              });
            }}>
              <Iconcamera
                name={'bag-suitcase-outline'}
                size={27}
                //color={'#ffc56b'}
                style={styles.collectIconStyle}
              />
            </TouchableOpacity >
        </View>
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Schedule', {
                sites: sites,
                userSchdule: userSchdule,
                username: username,
              });
            }}>
            {user.uid == post.userid ? (
              <Text style={styles.buttonText}>行程</Text>
            ) : (
              <Text style={styles.buttonText}>行程</Text>
            )}
          </TouchableOpacity>
        </View> */}
      </View>
      <View style={styles.textContainer}>
        {/*<Text numberOfLines={2} style={styles.textStyle}>
          {post.content}
      </Text>*/}
        <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 2}
              style={{ lineHeight: 21 }}>{post.content}</Text>

              {
                  lengthMore ? <Text
                  onPress={toggleNumberOfLines}
                  style={{ lineHeight: 21, marginTop: 10 ,fontWeight:'700'}}>{textShown ? 'Read less...' : 'Read more...'}</Text>
                  :null
              }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 'auto',
    backgroundColor: 'white',
    //backgroundColor: 'rgba(255,255,255,0.8)',
    width:'100%',
    right:'2.5%',
    marginHorizontal: 10,
    //borderRadius: 10,
    marginBottom: 15,
    //paddingTop:5,
    //padding: 5,
    //borderColor: '#D1DED7',
    //borderWidth: 2,
    //borderStyle:'solid',
    //borderBottomWidth:3,
    //borderRightWidth:2,
    //borderStyle:'dashed',

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
    //backgroundColor: '#D1DED7',
    flex: 2.1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    //position:'relative',
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
    //alignItems:'center',
  },
  nameStyle: {
    //alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 21,
    color: '#5f695d',
    left: '-3%',
  },
  deliconContainer: {
    //position:'relate',
    //left :200,
    flex: 1,
    //backgroundColor:'black',
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
    //flex: 8,
   // height :220,
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#D1DED7',
    //borderColor: '#D1DED7',
    //borderWidth: 3,
    //borderBottomWidth:10,
    resizeMode:'contain',
  },
  image: {
    width: '100%',
    //width:'99%',
    height: '100%',
    // borderTopRightRadius: 25,
    // borderTopLeftRadius: 5,
    // borderBottomRightRadius: 5,
    // borderBottomLeftRadius: 25,
    resizeMode:'contain',
  },
  textContainer: {
    //backgroundColor: '#D1DED7',
    flex: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingLeft: '7%',
    paddingRight: '8%',
    marginBottom: '2%',
    //marginTop: '2%',
    //backgroundColor:'black',
    //backgroundColor: 'rgba(255,255,255,0.9)',
    //borderRadius:5,
    //borderTopWidth:2,
    borderColor: '#D1DED7',
    //position:'relative',
  },
  textStyle: {
    //fontWeight: 'bold', //原本有打開
    fontSize: 16, //原本17
    color: '#5f695d',
    letterSpacing: 1, //原本8
    //控制字的間距
  },
  bottomContainer: {
    flex: 2,
    //backgroundColor: 'pink',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  collectContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    alignSelf: 'center',
    //backgroundColor:'#FFF4C1',
    height: '100%',
    paddingLeft: '8%',
    //borderBottomLeftRadius: 10,
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
    //backgroundColor: '#80735d',
    //backgroundColor:'rgba(255,197,107,0.6)',
    //margin:5,
    flex: 1,
    height: '80%',
    //right: '6%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    //bottom: 10,
    //borderRadius:10,
    borderRadius: 30,
    //borderTopLeftRadius: 10,
    //borderBottomRightRadius: 10,
    margin: 5,
    right: '10%',
    // shadowColor: '#7F5DF0',
    // shadowOffset: {
    //   width: 0,
    //   height: 10,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.5,
    // elevation: 5,
  },
  buttonText: {
    fontWeight: '800',
    fontSize: 17,
    color: '#6b5238',
    //color:'white',
    //top: 8,
    //letterSpacing: 10,
    letterSpacing: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    //left: 7,
  },
});
export default Card;
