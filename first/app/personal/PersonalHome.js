import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet,Dimensions,Alert,Image,TouchableOpacity} from 'react-native';
import PersonalTop from './PersonalTop';
import Icons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../routes/AutoProvider';

const PersonalHome = ({navigation}) => {
    const userdata={
        id:"lalala",
        nickname:"lala",
        mail:"12323@gmail.com",
        password:'123qqw',
    };
    const {user, logout} = useContext(AuthContext);
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
            <View style={{flex:0.15}}></View>
            <View style={{flex:0.6}}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={()=>{navigation.navigate("Collect",user);}}>
                        <Text style={styles.editText}>收藏</Text>
                    </TouchableOpacity>
                </View><View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => {navigation.navigate("PersonalFile",userdata);}}>
                        <Text style={styles.editText}>編輯個人檔案</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                    /*onPress={() => {navigation.navigate("PersonalFile",userdata);}}*/>
                        <Text style={styles.editText}>歷史行程</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => {logout();}}>
                        <Text style={styles.editText}>登出</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
    iconContainer:{
        alignItems:"center",
    },
    container: {
      hight: '100%',
      backgroundColor: '#F2F2F2',
      alignContent:"center",
      flex: 1,
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
      flex: 0.3,
      width: 200,
      height: 20,
      alignSelf: 'center',
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 5,
      margin:8,
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
