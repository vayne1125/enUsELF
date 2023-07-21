import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ScheduleTop = props => {
  const navigation = useNavigation();
  const aurInfo = props;
  const sites = props.sites;

  const navToMap = (data) =>{
    navigation.navigate("ItineraryHome", {
      tripname:data.name,
      origin:data.origin,
      desSite:data.desSite,
      site:data.site,
      from:"history",
    });
  }

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{flex:2,top:2,}}>
        <View style={styles.iconContainer2}>
          <Icons
            name="chevron-back-circle-outline"
            size={33}
            color={'#5f695d'}
            style={styles.iconStyle2}
          />
        </View>
        </TouchableOpacity>
        <View style={{flex:10,justifyContent:'center',}}>
        <Text style={styles.textStyle}>{aurInfo.name}的行程</Text>
        </View>
        {(sites!=null)?
        <TouchableOpacity 
          onPress={()=>{
            navToMap(sites);
          }}
          style={{flex:3,top:2,}}>
        <View style={styles.iconContainer2}>
          <Icon
            name="map-marked-alt"
            size={28}
            color={'#5f695d'}
            style={styles.iconStyle2}
          />
        </View>
        </TouchableOpacity>:null
        }
      </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5f695d',
    letterSpacing:4,
    top:'42%',
  },
  container: {
    flexDirection: 'row',
  },
  iconStyle: {
    top: 5,
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

export default ScheduleTop;
