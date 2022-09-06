import React, {Component} from 'react';
import {View, Text,StyleSheet} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
//import Icon from 'react-native-vector-icons/Entypo';
import ListTop from './ListTop'
import ListBottom from './ListBottom'
import Items from './Items';

export default class List extends Component {
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.topbar}>
                <ListTop/>
            </View>
            <View style={styles.items}>
                <Items/>
            </View>
            <View style={styles.bottombar}>
                <ListBottom/>
            </View>
        </View>
    //   <Button
    //     onPress={()=>this.props.navigation.navigate()}
    //   />
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        hight: '100%',
        backgroundColor: '#F2F2F2',
    },
    topbar: {
        backgroundColor: '#5f695d',
        flex:1.2,
        height: 63,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        //opacity: 0.9,
    },
    items: {
        flex: 10,
        alignItems:'center',
        justifyContent:'center',
    },
    textStyle:{
        fontSize:40,
        textAlign: 'center',
        fontWeight:'bold',
        letterSpacing:5,
        color:'white',
    },
    bottombar: {
        backgroundColor: '#5f695d',
        flex:1.2,
        height: 63,
        //opacity: 0.9,
    },
});