import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  DeviceEventEmitter,
} from 'react-native';

import ResultTop from './ResultTop';
import ResultHome from './ResultHome';

import Nature from './theme_Nature';
import KOL from './theme_KOL';
import Food from './theme_food';
import Hotel from './theme_hotel';
import Monuments from './theme_monuments';

const width = Dimensions.get('screen').width / 6;
const height = width - 5;
const Height = Dimensions.get('screen').height*6/30;

const Result = () => {
  const [theme, setTheme] = useState('美食')
  useEffect(() => {
    const listen = DeviceEventEmitter
    .addListener('NewTheme', theme => {setTheme(theme)});
    return () => listen.remove();
  }, []);

  return (
    <View style={styles.container}>
        {/*頂部*/}
        <View style={styles.topbar}><ResultTop  /></View>
        {/*內容*/}
        <View style={styles.info}>
            {theme==='美食'? <Food/>:
            (theme==='自然'? <Nature/>:
            (theme==='網美'? <KOL/>:
            (theme==='古蹟'? <Monuments/>:
            <Hotel/>)))}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    hight: '100%',
    //backgroundColor: '#F2F2F2',//9/14改
    backgroundColor: '#ffffff',
    flex: 1,
  },
  topbar: {
    //backgroundColor: '#5f695d',
    //flex:1,
    flex: 2.5,
    //borderBottomLeftRadius: 20,
    //borderBottomRightRadius: 20,
    //opacity: 0.9,
  },
  info: {
    flex: 10,
    //backgroundColor: '#D1DED7',//9/14改
    //backgroundColor: '#ffffe0',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
});

export default Result;
