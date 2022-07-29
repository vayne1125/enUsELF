import React, {Component} from 'react';
import {View, Text,StyleSheet} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
//import Icon from 'react-native-vector-icons/Entypo';
import ListTop from './ListTop'

export default class List extends Component {
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.topbar}>
                <ListTop/>
            </View>
            <View style={styles.items}>
                <Text style={styles.textStyle}>目前是空的</Text>
                <Icons name="person" size={100} color={'#a0522d'}/>
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
        flex:0.11,
        height: 63,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        //opacity: 0.9,
    },
    items: {
        flex: 0.89,
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
});