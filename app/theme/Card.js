import React, { useState, useEffect, memo, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  Modal,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../routes/AutoProvider';
import firestore from '@react-native-firebase/firestore';

import ThemeImg from '../data/ThemeImg';

const width = Dimensions.get('screen').width * 19 / 40;
const width2 = Dimensions.get('screen').width * 8 / 20;
const height = Dimensions.get('screen').height * 10 / 30;

const Stars = score => {
  var tp = parseFloat(score.starsNum);
  var starsIcon = [];
  let cnt = 0;
  for (let i = 0; i < 5; i++) {
    if (tp >= 1) {
      starsIcon.push(
        <Icon key={cnt} name={'star'} color={'#ffc56b'} size={18} />,
      );
      tp = tp - 1;
    } else if (tp == 0) {
      starsIcon.push(
        <Icon key={cnt} name={'star-o'} color={'#ffc56b'} size={18} />,
      );
    } else {
      starsIcon.push(
        <Icon
          key={cnt}
          name={'star-half-empty'}
          color={'#ffc56b'}
          size={18}
        />,
      );
      tp = 0;
    }
    cnt += 1;
  }
  return (
    <View style={styles.starStyle}>
      <Text>{score.starsNum} </Text>
      {starsIcon}
    </View>
  );
};

const Card = ({ sites, onPress1, onPress2}) => {
  const [uncheck, setUncheck] = useState(true);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const update = async () => {
      try {
        if (user) {
          const users = firestore().collection('users').doc(user.uid);
          const data = await users.collection('list').doc(sites.name).get();
          if (data.exists) {
            setUncheck(false);
          }
        }
      } catch (error) {
        console.error('Firestore Error:', error);
        // 在出现错误时，可以在这里展示错误提示给用户或者进行其他适当的处理
      }
    };

    const listener = DeviceEventEmitter.addListener('change', (name, change) => {
      if (name && name === sites.name) {
        setUncheck(change);
      }
    });

    update();

    return () => listener.remove();
  }, [sites.name, user]);

  return (
    <TouchableOpacity
      onPress={() => {
          onPress1(sites, uncheck);
      }}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          {<Image style={styles.image} source={ThemeImg[sites.name]} />}
        </View>
        <View style={styles.info}>
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.nameStyle}>
              {sites.name}
            </Text>
            <Text numberOfLines={1} style={styles.addressStyle}>
              {sites.city}{' '}{sites.region}
            </Text>
          </View>
          <Stars starsNum={sites.star} />
          <View style={styles.buttonContainer}>
            {uncheck ?
              <View style={styles.buttonContainer2}>
                <TouchableOpacity
                  onPress={() => {
                    // console.log(uncheck);
                    if (user) {
                      const users = firestore().collection('users').doc(user.uid);
                      users.collection('list').doc(sites.name)
                      .set({
                        id: sites.id,
                        type: sites.type,
                        place_id: sites.place_id,
                        check: false,
                        })
                        .then(() => {
                          // Firestore 写入操作完成后执行状态更新
                          setUncheck(false);
                        })
                        .catch((error) => {
                          // 错误处理
                          console.error('Firestore Error:', error);
                        });
                    }
                    onPress2(sites);
                  }}>
                    <Icon
                      name={'calendar-plus-o'}
                      color={'#5f695d'}
                      size={26} />
                </TouchableOpacity>
              </View> :
              <View style={styles.buttonContainer2}>
                <Icon2
                  name={'calendar-check'}
                  color={'#88bd80'}
                  size={26} />
              </View>
            }
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Card, (prevProps, nextProps) => {
  // 这里定义 props 是否相同的逻辑
  // 如果 props 没有变化，React.memo() 将不会进行不必要的重新渲染
  return (
    prevProps.uncheck === nextProps.uncheck
    // 检查其他需要比较的 prop ...
    // 返回 true 表示 props 没有变化
  );
});

const styles = StyleSheet.create({
  container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  card: {
    height: height,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    width: width,
    borderRadius: 25,
    marginBottom: 15,
    padding: 5,
    flex: 1,
    borderBottomColor: '#D1DED7',
    borderRightColor: '#ffffff',
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
    borderRadius: 20,
    //borderTopLeftRadius:20,
    //borderBottomLeftRadius:20,
    left: 2,
  },
  textContainer: {
    flex: 1.9,
    alignSelf: 'center',
    alignItems: 'center',
    //backgroundColor:'#000000',
    //padding:4,
    justifyContent:'space-around',
  },
  buttonContainer: {
    //backgroundColor: '#fbb856', //較深黃
    //backgroundColor: '#ffc56b',//較淺黃
    //backgroundColor: '#F1C179',//灰黃 
    //width: width2,
    width: '100%',
    //alignSelf: 'flex-end',
    //borderRadius: 25,
    //height: 32,
    flex:1.5,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    //flexDirection: 'row',
  },
  buttonText: {
    fontWeight: '800',
    top: '20%',
    /*fontFamily:'NotoSerifTC-Black',
    bottom:'20%',*/
    //fontSize: 16,//9/14
    fontSize: 14,
    color: '#6b5238',
    letterSpacing: 10,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonContainer2: {
    width: width2,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flex:1,
  },
  buttonText2: {
    fontWeight: '800',
    top: '20%',
    /*fontFamily:'NotoSerifTC-Black',
    bottom:'20%',*/
    //fontSize: 16,//9/14
    fontSize: 14,
    letterSpacing: 10,
    //alignContent:'center',
    //alignItems:'center',
    alignSelf: 'center',
    //justifyContent:'center',
  },
  imageContainer: {
    flex: 2.1,
    alignItems: 'center',
    width:'100%',
    padding: 3,
  },
  nameStyle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    //top: '10%',
    //fontSize: 20,//9/14
    fontSize: 18,
    color: '#5f695d',
    letterSpacing: 1,
    /*fontFamily:'NotoSerifTC-Bold',
    bottom:'15%',*/
  },
  addressStyle:{
    fontWeight: 'bold',
    fontSize: 12,
    color: '#afb1b0',
  },
  info: {
    flex: 2,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
    paddingTop:'5%',
    //paddingBottom:4,
    padding: 4,
  },
  starStyle: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    //justifyContent: 'space-around',
    //color:'#f5f6a3',
    //backgroundColor:'#000000',
  },
  viewContainer: {
    //backgroundColor: '#80735d', //咖啡
    width: width2,
    borderRadius: 25,
    height: 32,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    //flexDirection: 'row',
  },
  viewText: {
    fontWeight: '800',
    //fontSize: 16,//9/14
    fontSize: 14,
    color: '#E3E3E3',
    letterSpacing: 10,
    alignSelf: 'center',
  },
});