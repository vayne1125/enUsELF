import React, { useState, useEffect, memo, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';

import {AuthContext} from '../routes/AutoProvider';
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
                          setUncheck(false);
                        })
                        .catch((error) => {
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
  return (
    prevProps.sites.uncheck === nextProps.sites.uncheck
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
    left: 2,
  },
  textContainer: {
    flex: 1.9,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent:'space-around',
  },
  buttonContainer: {
    width: '100%',
    flex:1.5,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '800',
    top: '20%',
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
    fontSize: 14,
    letterSpacing: 10,
    alignSelf: 'center',
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
    fontSize: 18,
    color: '#5f695d',
    letterSpacing: 1,
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
    padding: 4,
  },
  starStyle: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  viewContainer: {
    width: width2,
    borderRadius: 25,
    height: 32,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  viewText: {
    fontWeight: '800',
    fontSize: 14,
    color: '#E3E3E3',
    letterSpacing: 10,
    alignSelf: 'center',
  },
});