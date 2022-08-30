import {useState, useContext, useEffect} from 'react';
import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    Alert,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Icons from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../routes/AutoProvider';
import { CheckBox } from '@rneui/themed';
const{width, height} = Dimensions.get("window")

const LauncherHome = ({navigation}) => {
    const [username, setUsername] = useState(String);
    const [email, setEmail] = useState(String);
    const [password, setPassword] = useState(String);
    const [mess1, setMess1] = useState(String);
    const [mess2, setMess2] = useState(String);
    const [secret, setSecret] = useState(true);
    const {login, register} = useContext(AuthContext);

    useEffect(() => {
        console.log(mess1);
        if(mess1!=''){
            if(mess1 === 'auth/invalid-email'){
                Alert.alert('登入失敗','EMAIL格式錯誤');
                setEmail('')
                setPassword('')
            }
            else if(mess1 === 'auth/user-not-found'){
                Alert.alert('登入失敗','該EMAIL尚未註冊');
            }
            else if(mess1 !== 'success'){
                Alert.alert('登入失敗','密碼錯誤');
                setPassword('')
            }
        }
    }, [mess1])

    useEffect(() => {
        console.log(mess2);
        if(mess2!=''){
            if(mess2 === 'success'){
                Alert.alert('註冊成功','進行信箱驗證後即可登入')
            }
            if(mess2 === 'auth/invalid-email'){
                Alert.alert('註冊失敗','信箱格式錯誤')
                setEmail('')
                setPassword('')
            }
            else if(mess2 === 'auth/email-already-in-use'){
                Alert.alert('註冊失敗','該信箱已註冊過')
            }
        }
    }, [mess2])

    const to_login = async() =>{
        if(!email && !password){
            Alert.alert('登入失敗', '欄位不可為空');
        }
        else{
            login(email, password, setMess1, "")
        }
    }

    const to_register = async() =>{
        var en=/[a-z A-Z]/;
        var num=/[0-9]/;
        if(!password || !email){
            Alert.alert('註冊失敗','欄位不可為空');
        }
        else{
            if(password.length < 8){
                Alert.alert('註冊失敗','密碼長度過短\n請再次輸入');
                setPassword('');
            }
            else if(!en.test(password) || !num.test(password)){
                Alert.alert('註冊失敗','密碼須包含英文及數字\n請再次輸入');
                setPassword('');
            }
            else{
                console.log('register');
                register(username, email, password, setMess2)
            }
        }
    }

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
            <View style={{flex:0.1}}></View>
            <View style={styles.logo}>
                <Image
                    style={{flex: 0.75 ,resizeMode: 'contain'}}
                    source={require('../../assets/logo.png')}/>
                <Text style={styles.textstyle}>enjoy yourself</Text>
            </View>
            <View style={styles.inputcontain}>
                <View style ={{flex:0.5}}>
                    <TextInput style={styles.inputBox} 
                        onChangeText={
                            (email) => {
                                setEmail(email);
                                if(email.indexOf('@') > 0){
                                    setUsername(email.substring(0,email.indexOf('@')))
                                }
                            }
                        }
                        value = {email}
                        placeholder="請輸入信箱"
                        placeholderTextColor='#BEBEBE'
                        keyboardType='email-address'
                    />
                    <View style={styles.inputBox}>
                    <TextInput style={{flex:0.95}}
                        secureTextEntry={secret}
                        onChangeText={(password) => setPassword(password)}
                        value= {password}
                        placeholder="Password"
                        placeholderTextColor='#BEBEBE'
                        maxLength={16}
                    />
                    <><CheckBox containerStyle={{flex:0.05, backgroundColor: '#FFFFDF'}}
                        center
                        checkedIcon= "eye-slash"
                        uncheckedIcon= "eye"
                        checked= { secret }
                        uncheckedColor= "#88bd80"
                        checkedColor= "#BEBEBE"
                        onPress= {() => {setSecret(!secret)}}
                    /></>
                    </View>
                </View>
                <View style={styles.buttoncontainer}>
                    <TouchableOpacity style={styles.LoginBut}>
                        <Text style={styles.LoginText} onPress={to_login}>登入</Text>
                    </TouchableOpacity>
                    <View style={{flex:0.05}}/>
                    <TouchableOpacity style={styles.SigninBut}>
                        <Text style={styles.SigninText} onPress={to_register}>註冊</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => { navigation.navigate("Forget"); }}>
                        <Text style={styles.forbut}>忘記密碼?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        width:width,
        flex: 1,
        backgroundColor: '#FFFCEC',
    },
    textstyle:{
        flex: 0.25,
        fontSize: 40,
        color:'#88bd80',
    },
    logo: {
        flex: 0.4,
        height: '100%',
        justifyContent:'center',
        alignItems: 'center',
    },
    inputcontain: {
        flex: 0.5,
        alignItems:'center',
        justifyContent:'center',
    },
    inputBox: {
        width: 250,
        height: 52,
        backgroundColor: '#FFFFDF',
        borderRadius: 1,
        borderWidth: 1,
        borderColor: '#88bd80',
        fontSize: 12,
        marginVertical: 4,
        flexDirection: 'row',
    },
    buttoncontainer:{
        flex:0.3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    LoginBut: {
        flex:0.35,
        backgroundColor: '#88bd80',
        paddingVertical: 15,
    },
    SigninBut: {
        flex:0.35,
        backgroundColor: '#ffffff',
        paddingVertical: 15,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: '#88bd80',
        paddingVertical: 15,
    },
    LoginText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    SigninText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#88bd80',
        textAlign: 'center'
    },
    forbut: { 
        color: '#BEBEBE',
        fontSize:10,
        fontWeight: '500',
    },
});

export default LauncherHome;
