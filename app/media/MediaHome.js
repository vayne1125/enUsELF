import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import MediaTop from './MediaTop';
import Collect from './Collect';
import All from './All';
import Mypost from './Mypost';

const MediaHome = ({}) => {
  const [choose, setChoose] = useState('all');
   
  return (
    <View style={styles.container}>
      {/*頂部*/}
      <View style={styles.topbar}>
        <MediaTop />
      </View>
      <View style={styles.chooseContainer}>
        {choose === 'all' ? (
          <View style={styles.chooseed}>
              <TouchableOpacity
                onPress={() => {
                  setChoose('all');
                }}>
                <Text style={styles.textStyle2}>全 部</Text>
              </TouchableOpacity>
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
              <TouchableOpacity
                onPress={() => {
                  setChoose('collect');
                }}>
                <Text style={styles.textStyle2}>收 藏</Text>
              </TouchableOpacity>
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
        
              <TouchableOpacity
                onPress={() => {
                  setChoose('mypost');
                }}>
                <Text style={styles.textStyle2}>我的貼文</Text>
              </TouchableOpacity>
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
        {choose==='all'? <All />:
            (choose==='collect'? <Collect />:
            <Mypost />)
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    hight: '100%',
    backgroundColor: '#ffffff',
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
    color: '#88bd80',
    letterSpacing: 5,
  },
  chooseed: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderBottomWidth:5,
    borderColor:'#88bd80',
    height: '100%',
  },
  info: {
    flex: 10.8,
    backgroundColor:'#f2f2f2',
  },
});

export default MediaHome;
