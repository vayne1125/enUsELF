import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import Share from 'react-native-share';
import {useNavigation} from '@react-navigation/native';
import ViewShot,{captureScreen,captureRef} from "react-native-view-shot";
const RNFS = require('react-native-fs');
const SharePic = () => {
    const getScreen = () => {
        captureScreen({
            format:'jpg',
            quality:0.8
        }).then(
            (uri) => {
                RNFS.readFile(uri, 'base64').then((res) => {
                    let urlString = 'data:image/jpeg;base64,' + res;
                    let options = {
                      title: '行程表',
                      message: '快來看看我的行程表!一起出去玩吧~',
                      url: urlString,
                      type: 'image/jpeg',
                    };
                    Share.open(options)
                      .then((res) => {
                        console.log("res: ",res);
                      })
                      .catch((err) => {
                        err && console.log(err);
                      });
                  });
                //console.log("uri: ",uri)
            },
            error => console.log("截圖失敗: "+error)
        )
    }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
            //onShare(),
            getScreen();
        }}
        >
            <Text style={styles.text}>分享</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
  },
  text: {
    fontSize: 17,
    color: '#F2F2F2',
  },
  button: {
    top: Dimensions.get('window').height/2 - 60,
    left: Dimensions.get('window').width/4 - 200 ,
    backgroundColor: '#5f695d',
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
});
export default SharePic;