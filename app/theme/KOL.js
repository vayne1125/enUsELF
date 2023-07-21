import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';

import Detail from './Detail';
import Notice from './Notice';
import KOLData from '../data/KOL';
import Card from './Card';

const width = Dimensions.get('screen').width / 6;
const hgt = Dimensions.get('screen').height * 10 / 30;

const initialState = {
  id: {},
  name: {},
  address: {},
  city: {},
  region: {},
  info: {},
  time: {},
};
const KOL = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState(initialState);
  const [noticeVisible, setNoticeVisible] = useState(false);
  const [noticeEntry, setNoticeEntry] = useState(initialState);
  const [uncheck, setUncheck] = useState(false);

  return (
    <View style={styles.container}>
      {/*浮動視窗-------------------------------------------------------------------------------*/}
      <Detail
        entry={modalEntry} //傳進去的資料參數
        modalVisible={modalVisible} //可不可見
        onClose={() => {setModalVisible(false);}} //關閉函式
        uncheck={uncheck}
      />
      {/*浮動視窗-------------------------------------------------------------------------------*/}

      {/*通知視窗-------------------------------------------------------------------------------*/}
      <Notice
        entry={noticeEntry} //傳進去的資料參數
        noticeVisible={noticeVisible} //可不可見
        onClose={() => {
          setNoticeVisible(false);
        }} //關閉函式
      />
      {/*通知視窗-------------------------------------------------------------------------------*/}

        <FlatList
          columnWrapperStyle={{justifyContent: 'space-around'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            //marginTop: 25,
            paddingBottom: 80,
          }}
          numColumns={2}
          data={KOLData}
          initialNumToRender={4}
          getItemLayout={(data, index ) => (
              { length : hgt, offset : hgt * index , index }
            )}
          windowSize={2}
          removeClippedSubviews={true}
          keyExtractor={item=>item.place_id}
          renderItem={({item}) => (
            <Card
              sites={item}
              onPress1={(site, uncheck) => {
                setModalVisible(!modalVisible);
                setModalEntry(site);
                setUncheck(uncheck);
              }}
              onPress2={site => {
                setNoticeVisible(!noticeVisible);
                setNoticeEntry(site);
              }}/>
          )}>
        </FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    hight: '100%',
    backgroundColor: '#ffffff',
    flex: 1,
  },
});

export default KOL;
