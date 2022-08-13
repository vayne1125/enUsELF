import React, {Component, useState} from 'react';
import {View, Text, StyleSheet,Dimensions,FlatList,Image,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PersonalTop from './PersonalTop';
import PersonalFile from './PersonalFile';
import Icons from 'react-native-vector-icons/Ionicons';

const width=Dimensions.get("screen").width/2-20

const PersonalHome = ({navigation}) => {
  const userdata={
  id:"lalala",
  nickname:"lala",
  mail:"12323@gmail.com",
  password:'123qqw',
};
return (
      <View style={styles.container}>
        {/*頂部*/}
        <View style={styles.topbar}>
          <PersonalTop />
        </View>
        <View style={styles.iconContainer}>
            <Icons name={'person-circle-outline'} size={180} />
          </View>
        {/*內容*/}
        <View style={styles.data}>
            <Text style={styles.text}>{userdata.id} </Text>
            <Text style={styles.text}>{userdata.mail} </Text>
        </View>
        
        <View style={styles.buttonContainer}>
        <TouchableOpacity
              onPress={() => {navigation.navigate("PersonalFile",userdata);
              }}
            style={{flex: 1}}>
             <Text style={styles.editText}>編輯個人檔案</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity /*onPress={showok}*/>
             <Text style={styles.editText}>收藏</Text>
          </TouchableOpacity>
        </View>
      </View>
      //   <Button
      //     onPress={()=>this.props.navigation.navigate()}
      //   />
    );
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
      alignContent:"center",
      flex: 1,
    },
    iconContainer:{
      alignItems:"center",
    },
    data:{
      alignItems:"center",
    },
    text:{
      fontSize:20,
      top:5,
    },
    buttonContainer: {
      backgroundColor: '#DDDDDD', //較深黃
      //backgroundColor: '#ffc56b',//較淺黃
      //flex: 1,
      width: 200,
      alignSelf: 'center',
      alignItems:'center',
      //right: 7,
      top:100,
      //bottom: 50,
      borderRadius: 5,
      height: 32,
      top:200,
      margin:10,
      //flexDirection: 'row',
    },
    editText:{
      fontSize:20,
    },
    /*card:{
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
    }*/
  });
export default PersonalHome;
