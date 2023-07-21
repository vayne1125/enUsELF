import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';

import ThemeTop from './ThemeTop';
import Nature from './Nature';
import KOL from './KOL';
import Food from './Food';
import Hotel from './Hotel';
import Monuments from './Monuments';

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
    backgroundColor: '#ffffff',
    flex: 1,
  },
  topbar: {
    flex: 2.5,
  },
  info: {
    flex: 9,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
});

export default Theme;
