import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Entypo';
//import Icon from 'react-native-vector-icons/FontAwesome';

const ScheduleButton = () => {
  const [hotPress, setHotPress] = useState(false);
  const [hotData, setHotData] = useState(ORI_DATA);
  const onPressHandlerForHot = () => {
    console.log("k");
    if (hotPress) {
      setHotData(ORI_DATA);
    } else {
      setHotData(HOT_DATA);
    }
    setHotPress(!hotPress); //打開
  }
    return(
    <View style = {styles.Container}>
      <TouchableOpacity onPress={onPressHandlerForHot}>
       <View  style={styles.OkContainer}>
         <Text style={styles.OkText}>熱門景點</Text>
        </View>
      </TouchableOpacity>
    </View>
    );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,   
    backgroundColor:"#88bd80", 
    flexDirection: 'row',
  },
  OkContainer: {
    backgroundColor: '#88bd80',
    flex: 0.3,
  },
  OkText: {
    position: 'absolute',
    left: 18,
    top: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 10,
  },
});

export default ScheduleButton;