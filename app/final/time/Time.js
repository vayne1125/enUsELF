import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import TimeTop from './TimeTop';
import CusTimeline from './CusTimeLine'
import Hotplace from '../../data/Hotplace'
import Shopplace from '../../data/Shopplace'
import Holplace from '../../data/Holplace'
import Food from '../../data/Food'
import Hotel from '../../data/Hotel'
import KOL from '../../data/KOL'
import Monuments from '../../data/Monuments'
import Nature from '../../data/Nature'
import DetailForTime from './DetailForTime';
import { AuthContext } from '../../routes/AutoProvider';

const Time = ({ route }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState({}); //initialState
  const [modalIsMain, setModalIsMain] = useState(true);
  const mode = route.params.mode;

  const getData = () => {
    const data = [];
    var tp = {};
    tp.name = "初始位置";
    tp.type = "none"
    tp.duration = route.params.time[0].duration;
    tp.distance = route.params.time[0].distance;
    tp.circleColor = '#5f695d';
    data.push(tp);
    for (var i = 0; i < route.params.place.length; i++) {
      const param = route.params.place[i];
      if (param.type === "food") {
        tp = (Food[param.id]);
      } else if (param.type === "nature") {
        tp = (Nature[param.id]);
      } else if (param.type === "kol") {
        tp = (KOL[param.id]);
      } else if (param.type === "monuments") {
        tp = (Monuments[param.id]);
      } else if (param.type === "hotel") {
        tp = (Hotel[param.id]);
      } else if (param.type === "hol") {
        tp = (Holplace[param.id]);
      } else if (param.type === "hot") {
        tp = (Hotplace[param.id]);
      } else if (param.type === "shop") {
        tp = (Shopplace[param.id]);
      }
      tp.time = "";
      if (i != route.params.place.length - 1) {
        tp.duration = route.params.time[i + 1].duration;
        tp.distance = route.params.time[i + 1].distance;
      } else {
        tp.distance = "-1";
      }
      if (i & 1) tp.circleColor = '#5f695d';
      else tp.circleColor = '#bcddb7';
      data.push(tp);
    }
    console.log("set!!!");
    return data;
  }
  const det = (e) => {
    if (e != null) {
      setModalIsMain(
        (e.type === "hot" || e.type === "hol" || e.type === "shop") ?
          false : true
      );
      setModalVisible(!modalVisible);
      setModalEntry({
        id: e.id,
        type: e.type,
        name: e.name,
        address: e.address,
        star: e.star,
        info: e.info,
        time: e.time,
        city: e.city,
        region: e.region,
      });
    }
  }
  return (
    <View style={styles.container}>

      {/*浮動視窗-------------------------------------------------------------------------------*/}
      <DetailForTime
        entry={modalEntry}//傳進去的資料參數
        modalVisible={modalVisible}//可不可見
        onClose={() => { setModalVisible(false); }}//關閉函式
        isMain={modalIsMain}
      />
      {/*浮動視窗-------------------------------------------------------------------------------*/}

      <View style={styles.topbar}>
        <TimeTop />
      </View>
      <View style={{ flex: 10.8 }}>
        <CusTimeline
          data={getData()}
          mode={mode}
          onPress={(e) => {
            det(e);
          }} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  topbar: {
    backgroundColor: 'white',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#aaaaaa',
  },
  container: {
    hight: '100%',
    flex: 1,
  },
});

export default Time;
