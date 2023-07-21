import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Entypo';

const TripTop = (name) => {
  const navigation = useNavigation();
  const tripname = name.name;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{flex:1,}}>
      <View style={styles.iconContainer2}>
        <Icons
          name="cross"
          size={35}
          color={'white'}
          style={styles.iconStyle2}
        />
      </View>
      </TouchableOpacity>
      <View style={{flex:5,justifyContent:'center',top:5,}}>
        <Text style={styles.textStyle}>{tripname}</Text>
      </View>
      </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    position: 'absolute',
    top: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing:4,
  },
  container: {
    flexDirection: 'row',
  },
  iconStyle: {
    top: 6,
    left: 8,
  },
  iconContainer2:{
    top: 14,
    width: 50,
    height: 35,
    alignSelf: 'center',
    borderRadius: 10,
    flew:1,
  },
  iconStyle2: {
    left: 8,
  },
});

export default TripTop;