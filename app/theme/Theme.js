import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  DeviceEventEmitter,
  Animated,
  Easing
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import ThemeTop from './ThemeTop';
import Nature from './Nature';
import KOL from './KOL';
import Food from './Food';
import Hotel from './Hotel';
import Monuments from './Monuments';
import Themenav from './Themenav';

const width = Dimensions.get('screen').width / 6;
const height = width - 5;
const Height = Dimensions.get('screen').height * 6 / 30;

const Theme = () => {
  const [theme, setTheme] = useState('美食')
  useEffect(() => {
    const listen = DeviceEventEmitter
      .addListener('NewTheme', theme => { setTheme(theme) });
    return () => listen.remove();
  }, []);

  return (
    <View style={styles.container}>
      {/*頂部*/}
      <View style={styles.topbar}><ThemeTop /></View>
      {/*內容*/}
      <View style={styles.info}>
        {theme === '美食' ? <Food /> :
          (theme === '自然' ? <Nature /> :
            (theme === '網美' ? <KOL /> :
              (theme === '古蹟' ? <Monuments /> :
                <Hotel />)))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    hight: '100%',
    //backgroundColor: '#F2F2F2',//9/14改
    backgroundColor: '#ffffff',
   //rong  backgroundColor: '#D0D0D0',
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
    flex: 9,
    //backgroundColor: '#D1DED7',//9/14改
    //backgroundColor: '#ffffe0',
    backgroundColor: '#ffffff',
    //rong gray backgroundColor: '#D0D0D0',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
});

export default Theme;
