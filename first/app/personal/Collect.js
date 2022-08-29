import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import CollectTop from './CollectTop'
const Collect =() =>{
return ( 
    <View style={styles.container}>
     <View style={styles.topbar}> 
        <CollectTop/>
     </View>
     
    </View>
);
}
/*const style=StyleSheet.creat({

});*/

const styles = StyleSheet.create({
  topbar: {
    backgroundColor: '#5f695d',
    //flex:1,
    height: 63,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    //opacity: 0.9,
  }, container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    alignContent:"center",
    flex: 1,
  },
});
export default Collect;