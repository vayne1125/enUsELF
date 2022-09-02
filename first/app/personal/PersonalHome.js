import React, {useContext, useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Alert,
    Image,
    TouchableOpacity,
    DeviceEventEmitter,
    Settings,
    ActivityIndicator,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

import PersonalTop from './PersonalTop';
import { AuthContext } from '../routes/AutoProvider';
import { setGestureState } from 'react-native-reanimated/lib/reanimated2/NativeMethods';

const{ width,height } = Dimensions.get("window");
const PersonalHome = ({navigation}) => {
    
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(false);
    const {user, logout} = useContext(AuthContext);
    useEffect(() => {
        if(user){
            setLoading(true);
            firestore().collection('users').doc(user.uid).get()
            .then(doc=>{
                setName(doc.data().name);
                setMail(doc.data().email);
                setPass(doc.data().password);
                setImg(doc.data().userImg);
            }).then(()=>{setLoading(false)});
        }
    },[user]);

    useEffect(() => {
        const listen = DeviceEventEmitter
        .addListener('userupdate', (update) => {
            console.log(update);
            setName(update.name);
            setPass(update.password);
            setLoading(false);
        });
        return () => listen.remove();
    },[]);
    console.log(img);
    return (
        <View style={styles.container}>
            {/*頂部*/}
            <View style={styles.topbar}>
                <PersonalTop />
            </View>
            {loading?
            <View style={{justifyContent:'center',height:250}}>
                <ActivityIndicator
                    animating = {true}
                    color = {'#BEBEBE'}
                    size = {'large'}
                />
                <Text style={{alignSelf:'center'}}>loading</Text>
            </View>:
            <View style={{alignItems:'center',top:10}}>
                <View style={styles.iconContainer}>
                    <View style={{height:20, left:160}}>
                        <TouchableOpacity onPress={()=>{}}>
                            <Text style={{fontSize:15, top:5}}>編輯</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.img}>{img?
                        <Image source={{img}} style={{height:160,weight:160}}/>:
                        <Icons name={'person-circle-outline'} size={160} />
                    }</View>
                </View>
                <View style={{alignItems:"center"}}>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </View>}
            <View style={{flex:0.7,top:10}}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={()=>{navigation.navigate("Collect", user);}}>
                        <Text style={styles.editText}>收藏</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => {navigation.navigate("PersonalFile",{name, mail, pass});}}>
                        <Text style={styles.editText}>編輯個人檔案</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity  onPress={() => {navigation.navigate("HistoryHome");}}>
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
    container: {
        hight: '100%',
        backgroundColor: '#F2F2F2',
        alignContent:"center",
        flex: 1,
    },
    topbar: {
      backgroundColor: '#5f695d',
      height: 63,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    iconContainer:{
        height:200,
        width:200,
        backgroundColor:'white',
        flexDirection:'column',
    },
    img:{
        height:160,
        width:160,
        alignSelf: 'center',
    },
    imgchange:{
        width:40,
        height:20,
        alignItems:'center',
    },
    text:{
        alignSelf:'center',
        fontSize:20,
        top:5,
    },
    buttonContainer: {
      backgroundColor: '#DDDDDD',
      flex: 0.25,
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