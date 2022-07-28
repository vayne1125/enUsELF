import React, {Component} from 'react';
import {View, Text,StyleSheet} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

import Icon from 'react-native-vector-icons/FontAwesome';
export default class Media extends Component {
  render() {
    return (
      <View style={{
        hight:'100%',
        backgroundColor:'#DFF6A3',
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    }}>
        <Text style={{fontSize:40,fontWeight:'bold',letterSpacing:5,color:'white'}}>行程表清單</Text>
            <Icons name="person" size={100} color={'#a0522d'}/>
        </View>
    //   <Button
    //     onPress={()=>this.props.navigation.navigate()}
    //   />
    );
  }
}
