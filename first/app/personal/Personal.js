import React, {Component} from 'react';
import {View, Text, StyleSheet,Dimensions,FlatList,Image} from 'react-native';
import PersonalTop from './PersonalTop';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

const width=Dimensions.get("screen").width/2-20
export default class Media extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/*頂部*/}
        <View style={styles.topbar}>
          <PersonalTop />
        </View>
        {/*內容*/}
        <View
          style={{
            backgroundColor: 'white',
            //flex:11,
          }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: 'bold',
              letterSpacing: 5,
              color: 'black',
            }}>
            個人設置
          </Text>
        </View>
      </View>
      //   <Button
      //     onPress={()=>this.props.navigation.navigate()}
      //   />
    );
  }
}

const styles = StyleSheet.create({
    topbar: {
      backgroundColor: '#5f695d',
      //flex:1,
      height: 63,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      //opacity: 0.9,
    },
    container: {
      hight: '100%',
      backgroundColor: '#F2F2F2',
      flex: 1,
    },
    card:{
      height:170,
      //backgroundColor:'#D1DED7',
      backgroundColor:'#ffffff',
      width,
      marginHorizontal:10,
      borderRadius:10,
      marginBottom:15,
      //paddingTop:5,
      padding:5,
      borderColor:'#D1DED7',
      borderWidth:3,
      //borderColor:'black',
      //borderStyle:'solid',
      //borderBottomWidth:2,
      //borderBottomColor:'#D9DEC1',
    },
    textStyle:{
      alignSelf:'center',
      fontWeight:'bold',
      fontSize:19,
      color:'#5f695d',
      top:8,
      letterSpacing:10,
    },
    image:{
      width:175,
      height:125,
    },
    textContainer:{
      backgroundColor:'#D1DED7',
      flex:1,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      //position:'relative',
    }
  });
