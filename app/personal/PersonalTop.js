import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Ionicons';

const PersonalTop = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
      <Text style={styles.textStyle}>個人設置</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('List')
        }}
        style={{flex: 1}}>
        <View style={styles.iconContainer}>
          <Icons
            name="calendar-outline"
            size={33}
            color={'#5f695d'}
            style={styles.iconStyle}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  textContainer:{
    flex:4,
    position:'absolute',
  },
  textStyle: {
    bottom:'15%',
    left:'5%',
    fontSize: 30,
    color:'#5f695d',
    fontFamily:'NotoSerifTC-Bold',
    letterSpacing:10,
  },
  iconStyle: {
    top:'23%',
    left:'350%',
  },
  iconContainer: {
    flex:1,
    position: 'absolute',
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 30,
  },
});

export default PersonalTop;
