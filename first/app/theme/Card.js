import React, {Component, useState, PureComponent, useEffect} from 'react';
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
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Image_link from './Image';

const width = Dimensions.get('screen').width*19/20;
const width2 = Dimensions.get('screen').width*8/20;
const user = auth().currentUser;
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

export default class Card extends PureComponent  {
    constructor(props) {
        super(props)
        this.state = {
          name:this.props.sites.name,
          uncheck:true,
          user:null,
        }
    }
    componentDidMount(){
        const update = () =>{
            const user = auth().currentUser;
            if(user&& user.uid !== this.state.user){
                this.setState({user:user.uid});
                const users = firestore().collection('users').doc(user.uid);
                users.collection('list').doc(this.state.name)
                .get().then((data)=>{
                    if(data.exists) this.setState({uncheck:false});
                })
            }
        }
        this.emitter = listen = DeviceEventEmitter
        .addListener('delete',(name) => {
            if(name && name === this.state.name){
                this.setState({uncheck:true});
            }
        })
        if(!this.state.user) update();
    }
    componentWillUnmount(){
        this.emitter.remove();
    }
  render() {
    const site = this.props.sites;
    return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          {<Image style={styles.image} source={Image_link[site.name]} />}
        </View>
        <View style={styles.info}>
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.nameStyle}>
              {site.name}
            </Text>
          </View>
          <Stars starsNum={site.star} />
          <View style={{justifyContent:'space-around',/*backgroundColor:'#000000',*/flex:2,}}>
          <View style={styles.buttonContainer2}>
            <TouchableOpacity
              onPress={() => {
                this.props.onPress1(site);
              }}
              style={{flex: 2}}>
              <Text style={styles.buttonText2}>詳細資訊</Text>
            </TouchableOpacity>
          </View>
          {this.state.uncheck?
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                if(user){
                    const users = firestore().collection('users').doc(user.uid);
                    users.collection('list').doc(site.name)
                    .set({
                        id: site.id,
                        type: site.type,
                        place_id: site.place_id,
                        check: false,
                    }).then(this.setState({uncheck:false}))
                    console.log(site.name);
                }
                this.props.onPress2(site);
              }}
              style={{flex: 1}}>
              <Text style={styles.buttonText}>加入清單</Text>
            </TouchableOpacity>
          </View>:
          <View style={styles.viewContainer}>
            <Text style={styles.viewText}>已選擇</Text>
        </View>}
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  card: {
    height: 170,
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    //backgroundColor:'#D1DED7',
    backgroundColor: '#ffffff',
    width:width,
    //marginHorizontal: 10,
    borderRadius: 25,
    marginBottom: 15,
    //paddingTop:5,
    padding: 5,
    //right: 2,
    //borderColor: '#D1DED7',
    //borderWidth: 3,
    flex: 1,
    flexDirection: 'row',
    //borderBottomWidth: 3,
    borderBottomColor: '#D1DED7',
    //borderRightWidth: 3,
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
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    //backgroundColor:'#000000',
    //padding:4,
  },
  buttonContainer: {
    //backgroundColor: '#fbb856', //較深黃
    backgroundColor: '#ffc56b',//較淺黃
    //backgroundColor: '#F1C179',//灰黃 
    width: width2,
    //width: 120,
    //alignSelf: 'flex-end',
    borderRadius: 25,
    height: 32,
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    //flexDirection: 'row',
  },
  buttonText: {
    fontWeight: '800',
    top:'20%',
    /*fontFamily:'NotoSerifTC-Black',
    bottom:'20%',*/
    fontSize: 16,
    color: '#6b5238',
    letterSpacing: 10,
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
  },
  buttonContainer2: {
    backgroundColor: '#E3E3E3', //灰色
    width: width2,
    borderRadius: 25,
    height: 32,
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
  },
  buttonText2: {
    fontWeight: '800',
    top:'20%',
    /*fontFamily:'NotoSerifTC-Black',
    bottom:'20%',*/
    fontSize: 16,
    letterSpacing: 10,
    //alignContent:'center',
    //alignItems:'center',
    alignSelf:'center',
    //justifyContent:'center',
  },
  imageContainer: {
    flex: 2.1,
    alignItems: 'center',
    padding: 3,
  },
  nameStyle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    top:'20%',
    fontSize: 20,
    color: '#5f695d',
    letterSpacing: 1,
    /*fontFamily:'NotoSerifTC-Bold',
    bottom:'15%',*/
  },
  info: {
    flex: 2,
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'space-around',
    //paddingTop:4,
    //paddingBottom:4,
    padding:4,
  },
  starStyle: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'space-around',
    //color:'#f5f6a3',
    //backgroundColor:'#000000',
  },
  viewContainer: {
    backgroundColor: '#80735d', //咖啡
    width: width2,
    borderRadius: 25,
    height: 32,
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    //flexDirection: 'row',
  },
  viewText: {
    fontWeight: '800',
    fontSize: 16,
    color: '#E3E3E3',
    letterSpacing: 10,
    alignSelf:'center',
  },
});