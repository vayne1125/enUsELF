import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

import TripTop from './TripTop'
import Tripitems from './Tripitems'

const width = Dimensions.get('screen').width;

const TripForhistory =({route}) =>{
  const trip=route.params;
  return (
    <View style={styles.container}>
      <View style={styles.topbar}> 
        <TripTop name={trip.name} />
      </View>
      <View style={styles.items}>
        <Tripitems items={trip}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topbar: {
    backgroundColor: '#5f695d',
    height: 63,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  items: {
    flex: 1.5,
    alignItems:'center',
    justifyContent:'center',
  },
  container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  card: {
    height: 170,
    backgroundColor: '#ffffff',
    width,
    marginBottom: 15,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderBottomColor: '#D1DED7',
    borderRightWidth: 3,
    borderRightColor: '#ffffff',
  },
  textStyle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 19,
    color: '#5f695d',
    top: 8,
    letterSpacing: 10,
  },
  image: {
    width: 230,
    height: 140,
    top: 6,
    borderRadius: 10,
    left: 2,
  },
  textContainer: {
    flex: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    top: 13,
    right: 8,
  },
  buttonContainer: {
    backgroundColor: '#fbb856', //較深黃
    width: 120,
    alignSelf: 'flex-end',
    right: 7,
    bottom: 4,
    borderRadius: 25,
    height: 32,
  },
  buttonText: {
    fontWeight: '800',
    fontSize: 16,
    color: '#6b5238',
    top: 6,
    letterSpacing: 10,
    left: 7,
  },
  buttonContainer2: {
    backgroundColor: '#E3E3E3', //較淺黃
    width: 120,
    alignSelf: 'flex-end',
    right: 7,
    bottom: 10,
    borderRadius: 25,
    height: 32,
  },
  buttonText2: {
    fontWeight: '800',
    fontSize: 16,
    top: 6,
    letterSpacing: 10,
    left: 7,
  },
  imageContainer: {
    flex: 3,
    alignItems: 'center',
    padding: 3,
  },
  nameStyle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#5f695d',
    left: 15,
    letterSpacing: 1,
  },
  info: {
    flex: 2,
  },
  starStyle: {
    flex: 2,
    flexDirection: 'row',
    alignSelf: 'center',
    left: 5,
    top: 4,
  },
});
export default TripForhistory;