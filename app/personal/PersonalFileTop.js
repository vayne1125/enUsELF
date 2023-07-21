import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const PersonalFileTop = ({userdata}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}/>
      <Text style={styles.textStyle}>編輯個人檔案</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {navigation.goBack();}} style={{flex: 1}}>
          <Text style={styles.buttonText}>關閉</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin:20,
    left:0,
  },
  iconContainer: {
    flex:1,
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 30,
  },
  textStyle: {
    right:40,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5f695d',
    letterSpacing: 2,
  },
  buttonContainer: {
    backgroundColor: '#5f695d',
    width: 65,
    borderRadius: 3,
    height: 25,
  },
  buttonText: {
    fontWeight: '800',
    fontSize: 17,
    color: 'white',
    letterSpacing: 2,
    left: 15,
  },
});

export default PersonalFileTop;