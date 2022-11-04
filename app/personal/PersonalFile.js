import React, {Component, useContext, useEffect, useState,} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Alert,
    DeviceEventEmitter,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import PersonalFileTop from './PersonalFileTop'
import { AuthContext } from '../routes/AutoProvider';

import Forget from '../launcher/Forget';

const {width, height} = Dimensions.get('screen').width;

const PersonalFile = ({navigation, route}) => {
    const userdata = route.params;
    const [mail] = useState(userdata.mail);
    const [check] = useState(userdata.pass);
    const [name, setName] = useState(userdata.name);
    const [pass, setPass] = useState("");
    const [newpass, setNewpass] = useState("");
    const [empty1, setEmpty1] = useState(false);
    const [empty3, setEmpty3] = useState(false);
    const [focus1, setFocus1] = useState(false);
    const [focus2, setFocus2] = useState(false);
    const [focus3, setFocus3] = useState(false);
    const [mess, setMess] = useState("");
    const {user, login} = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    
    useEffect(()=>{
        if(mess === 'success'){
            firestore().collection('users').doc(user.uid).update({name:name,password:newpass});
            Alert.alert('更新成功','用戶個人資料已更新');
            const password = newpass;
            DeviceEventEmitter.emit('userupdate', {password, name});
            navigation.goBack();
        }
        else if(mess){console.log(mess)};
    }, [mess])
    
    const update = () => {
        var en=/[a-z A-Z]/;
        var num=/[0-9]/;
        if(user){
            if(check === pass){
                if(!newpass){
                    firestore().collection('users').doc(user.uid).update({name:name});
                    Alert.alert('更新成功','用戶個人資料已更新');
                    const password = check;
                    DeviceEventEmitter.emit('userupdate', {password, name});
                    navigation.goBack();
                }
                else{
                    if(newpass.length < 8){
                        Alert.alert('更新失敗','新密碼長度過短\n請再次輸入');
                        setNewpass('');
                        setEmpty3(true);
                    }
                    else if(!en.test(newpass) || !num.test(newpass)){
                        Alert.alert('更新失敗','新密碼須包含英文及數字\n請再次輸入');
                        setNewpass('');
                        setEmpty3(true);
                    }
                    else{
                        login(mail, check, setMess, newpass);
                    }
                }
            }
            else{
                Alert.alert('更新失敗','密碼錯誤\n請再次輸入');
                setPass('');
                setEmpty1(true);
            }
        }
    }

    return(
        <View style={styles.container}>
            <Forget
                onClose={() => {setVisible(false);}} 
                mess = {"#發送信箱後將自動登出，請謹慎操作"}
                email = {mail}
                visible = {visible}
            />
            <View style={styles.topbar}>
              <PersonalFileTop/>
            </View>
            <ScrollView>
                <View style ={styles.textcontain}>
                    <View style ={styles.textinput}>
                        <Text style = {styles.text}>信箱 : </Text>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid='#BEBEBE'
                            editable={false}//是否可编辑
                            value={mail}
                        />
                    </View>
                    <View style ={styles.textinput}>
                        <Text style = {styles.text}>暱稱 : </Text>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid={!focus2?'#BEBEBE':'#8E8E8E'}
                            value={name}
                            onChangeText={(name) => setName(name)}
                            placeholder={userdata.name}
                            placeholderTextColor={!focus2?'#BEBEBE':'#8E8E8E'}
                            onBlur={() => {setFocus2(false); setName(name? name : userdata.name);}}
                            onFocus={() => setFocus2(true)}
                        />
                    </View>
                    <View style ={styles.textinput}>
                        <View style = {styles.text}>
                            <Text style ={{fontSize:12,color:'black'}}>密碼</Text>
                            <Text style ={{fontSize:12,color:'#FF2D2D'}}>*</Text>
                            <Text style ={{fontSize:12,color:'black'}}>:</Text>
                        </View>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid={!empty1?(!focus1?'#BEBEBE':'#8E8E8E'):'#FF2D2D'}
                            value={pass}
                            secureTextEntry={true}
                            onChangeText={pass => setPass(pass)}
                            placeholder={!focus1? '身份驗證不可為空':'長度介於8-16，須包含英文字母及數字'}
                            placeholderTextColor={!empty1?(!focus1?'#BEBEBE':'#8E8E8E'):'#FF2D2D'}
                            onBlur={() => {setFocus1(false);setEmpty1(pass.length == 0)}}
                            onFocus={() => {setFocus1(true);setEmpty1(false);}}
                            maxLength={16}
                        />
                    </View>
                    <View style ={styles.textinput}>
                        <Text style = {styles.text}>新密碼 : </Text>
                        <TextInput style={styles.inputBox} 
                            //onChangeText={(email) => this.setState({email})}
                            underlineColorAndroid={!empty3?(!focus3?'#BEBEBE':'#8E8E8E'):'#FF2D2D'}
                            value={newpass}
                            onChangeText={(newpass) => setNewpass(newpass)}
                            secureTextEntry={true}
                            placeholder={!focus3&&!empty3?'若沒有需求可以不輸入':'長度介於8-16，須包含英文字母及數字'}
                            placeholderTextColor={!empty3?(!focus3?'#BEBEBE':'#8E8E8E'):'#FF2D2D'}
                            onFocus={() => {setFocus3(true);setEmpty3(false);}}
                            onBlur={() => setFocus3(false)}
                            maxLength={16}
                        />
                    </View>
                </View>
                <View style={styles.Butcontainer}>
                    <TouchableOpacity 
                        style={styles.FGBut}
                        onPress={()=>{setVisible(true)}}>
                        <Text style={styles.FGText}>忘記密碼</Text>
                    </TouchableOpacity>
                    <View style={{flex:0.05}}/>
                    {!pass?
                    <View style={styles.UnOkBut}>
                        <Text style={styles.OkText}>完成</Text> 
                    </View>:
                    <TouchableOpacity style={styles.OkBut} onPress={update}>
                        <Text style={styles.OkText}>完成</Text>
                    </TouchableOpacity>}
                </View>  
            </ScrollView> 
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        height:'100%',
    },
    topbar: {
        backgroundColor: '#ffffff',//'#F2F2F2',
        //#5f695d',
        //flex:1,
        height: 50,
       // borderColor: '#AAAAAA',
       // borderBottomWidth:1,
       // borderBottomLeftRadius: 20,
       // borderBottomRightRadius: 20,
        //opacity: 0.9,
      },
    textcontain:{
        flex: 0.6,
        justifyContent:'center',
        alignItems:'center',
    },
    textinput:{
        height: 70,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
    },
    textinput2:{
        height: 50,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
    },
    textstyle:{
        underlineColorAndroid:'#BEBEBE',
        fontSize:15,
        right:180,
    },
    textstyle2:{
        underlineColorAndroid:'#BEBEBE',
        fontSize:15,
        right:100,
    },
    text:{
        flex: 0.7,
        flexDirection:'row',
        fontSize:12,
        color:'black',
    },
    text1:{
        right:30,
        alignContent:'flex-end',
        flex: 0.7,
        fontSize:12,
        color:'black',
    },
    inputBox: {
        width: 250,
        height: 50,
        fontSize: 13,
    },
    Butcontainer:{
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    SendContain: {
        flex: 0.35,
        backgroundColor: 'gray',
        paddingVertical: 15,
    },
    SendText: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
    },
    FGBut: {
        flex:0.35,
        backgroundColor: '#ffffff',
        paddingVertical: 15,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: '#88bd80',
        paddingVertical: 15,
    },
    OkBut: {
        flex: 0.35,
        backgroundColor: '#88bd80',
        paddingVertical: 15,
    },
    UnOkBut: {
        backgroundColor: 'gray',
        flex: 0.35,
        paddingVertical: 15,
    },
    FGText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#88bd80',
        textAlign: 'center'
    },
    OkText: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center'
    },
});
export default PersonalFile;