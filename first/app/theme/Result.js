import React, {Component,useState} from 'react';
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
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';

import ResultTop from './ResultTop';
import Detail from '../detail/Detail';
const Stack = createNativeStackNavigator();
const width = Dimensions.get('screen').width;

const sites = [
  {
    id: 1,
    name: '陽明山國家公園',
    img: require('../../assets/site1.jpg'),
    address: '台北市士林區竹子湖路1-20號',
    star: 4.5,
    info:'陽明山國家公園是臺灣離都會區最近的一座國家公園，這裡地貌多變、生態豐富，孕育了許多珍貴的保育類動物，幸運的話，可以在這裏發現臺灣特有種鳥類－臺灣藍鵲的蹤跡。'
  },
  {
    id: 2,
    name: '日月潭',
    img: require('../../assets/site2.webp'),
    address: '南投縣魚池鄉日月村',
    star: 4.6,
  },
  {
    id: 3,
    name: '高美濕地',
    img: require('../../assets/site3.jpg'),
    address: '台中市清水區美堤街',
    star: 4.5,
  },
  {
    id: 4,
    name: '野柳地質公園',
    img: require('../../assets/site4.jpg'),
    address: '新北市萬里區野柳里港東路167-1號',
    star: 4.4,
  },
  {
    id: 5,
    name: '雪霸國家公園',
    img: require('../../assets/site5.webp'),
    address: '苗栗縣大湖鄉富興村水尾坪100號',
    star: 4.5,
  },
];
const initialState = {
      "id":{},
      "name": {},
      "img": {},
      "address":{},
      "info":{},
}
const Result = ({navigation, route}) => {
  const theme = route.params;
  //-------------------------------------------------------------------------
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState(initialState);
  //--------------------------------------------------------------------------

  const Stars = score => {
    var tp = parseFloat(score.starsNum);
    var starsIcon = [];
    let cnt = 0;
    for (let i = 0; i < 5; i++) {
      if (tp >= 1) {
        starsIcon.push(
          <Icon key={cnt} name={'star'} color={'#ffb129'} size={18} />,
        );
        tp = tp - 1;
      } else if (tp == 0) {
        starsIcon.push(
          <Icon key={cnt} name={'star-o'} color={'#ffb129'} size={18} />,
        );
      } else {
        starsIcon.push(
          <Icon
            key={cnt}
            name={'star-half-empty'}
            color={'#ffb129'}
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
  const Card = ({site}) => {
    return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          {<Image style={styles.image} source={site.img} />}
        </View>
        <View style={styles.info}>
          <View style={styles.textContainer}>
            <Text style={styles.nameStyle}>{site.name}</Text>
          </View>
          <Stars starsNum={site.star} />
          <View style={styles.buttonContainer2}>
            <TouchableOpacity
              onPress={() => {
                console.log('123');
                //------------------------------------
                setModalVisible(!modalVisible);
                setModalEntry(site);
                console.log('site');
                //-------------------------------------
              }}
              style={{flex: 2}}>
              <Text style={styles.buttonText2}>詳細資訊</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                console.log('456');
              }}
              style={{flex: 1}}>
              <Text style={styles.buttonText}>加入清單</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
   
    <View style={styles.container}>

      {/*浮動視窗-------------------------------------------------------------------------------*/}
       <Detail
    entry={modalEntry}//傳進去的資料參數
    modalVisible={modalVisible}//可不可見
    onClose={() => {setModalVisible(false);console.log("close")}}//關閉函式
    />
    {/*浮動視窗-------------------------------------------------------------------------------*/}

      {/*頂部*/}
      <View style={styles.topbar}>
        <ResultTop theme={theme} />
      </View>

      {/*內容*/}
      <FlatList
        //columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 25,
          paddingBottom: 80,
        }}
        numColumns={1}
        data={sites}
        renderItem={({item}) => <Card site={item} />}></FlatList>
    </View>
  );
};
const styles = StyleSheet.create({
  topbar: {
    backgroundColor: '#5f695d',
    //flex:1,
    height: 63,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    //opacity: 0.9,
  },
  container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  card: {
    height: 170,
    //backgroundColor:'#D1DED7',
    backgroundColor: '#ffffff',
    width,
    //marginHorizontal: 10,
    //borderRadius: 10,
    marginBottom: 15,
    //paddingTop:5,
    padding: 5,
    //right: 2,
    //borderColor: '#D1DED7',
    //borderWidth: 3,
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
    //position:'relative',
  },
  buttonContainer: {
    backgroundColor: '#fbb856', //較深黃
    //backgroundColor: '#ffc56b',//較淺黃
    //flex: 1,
    width: 120,
    alignSelf: 'flex-end',
    right: 7,
    bottom: 4,
    borderRadius: 25,
    height: 32,
    //flexDirection: 'row',
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
    //flex: 1,
    width: 120,
    alignSelf: 'flex-end',
    right: 7,
    bottom: 10,
    borderRadius: 25,
    height: 32,
    //flexDirection: 'row',
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
    //color:'#f5f6a3',
  },
});

export default Result;
