import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Entypo';

const Back = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
            navigation.goBack();
        }}
        style={{flex: 1}}>
        <View style={styles.iconContainer}>
          <Icons
            name="chevron-left"
            size={60}
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
    flex:1,
    flexDirection:'row',
    left: -Dimensions.get('window').width*2/7,
    top: -Dimensions.get('window').height*6/19,
  },
  iconStyle: {
    top: -4,
    left: -2,
    fontSize:45,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255,0.6)',
    width: 40,
    height: 40,
    borderRadius: 30,
  },
});
export default Back;