import React, {useContext, useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SignupTop from './SignupTop';
import {AuthContext} from '../routes/AutoProvider';
const Signup = ({navigation}) => {
    const [email, setEmail] = useState(String);
    const [password, setPassword] = useState(String);
    const [username, setUsername] = useState(String);
    const [confirm, setConfirm] = useState(String);
    const [mess, setMess] = useState(String);

    const {register} = useContext(AuthContext);
    
    useEffect(() => {
        if(mess!=''){
            if(mess === 'success'){
                Alert.alert('註冊成功','進行信箱驗證後即可登入')
                navigation.navigate('Login')
            }
            if(mess === 'auth/invalid-email'){
                Alert.alert('註冊失敗','信箱格式錯誤')
                setEmail('')
                setPassword('')
                setConfirm('')
            }
            else if(mess === 'auth/email-already-in-use'){
                Alert.alert('註冊失敗','該信箱已註冊過')
                setEmail('')
                setPassword('')
                setConfirm('')
            }
            else if(mess === 'auth/weak-password'){
                Alert.alert('註冊失敗','密碼過短')
                setPassword('')
                setConfirm('')
            }
        }
    }, [mess])

    const to_register = async() =>{
        var en=/[a-z A-Z]/;
        var num=/[0-9]/;
        if(!password || !confirm || !email){
            Alert.alert('註冊失敗','欄位不可為空');
        }
        else{
            if(password != confirm){
                Alert.alert('註冊失敗','兩次密碼不同\n請再次輸入');
                setPassword('');
                setConfirm('');
            }
            else if(!en.test(password) || !num.test(password)){
                Alert.alert('註冊失敗','密碼須包含英文及數字\n請再次輸入');
                setPassword('');
                setConfirm('');
            }
            else{
                register(username, email, password, setMess)
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.topbar}>
                <SignupTop/>
            </View>
            <View style ={styles.textcontain}>
                <View style ={styles.textinput}>
                    <Text style = {styles.text}>信箱: </Text>
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
                        underlineColorAndroid='#BEBEBE'
                        placeholder="請輸入信箱"
                        placeholderTextColor='#BEBEBE'
                        keyboardType='email-address'
                    />
                </View>
                <View style ={styles.textinput}>
                    <Text style = {styles.text}>密碼: </Text>
                    <TextInput style={styles.inputBox}
                        onChangeText={(password) => setPassword(password)}
                        value = {password}
                        secureTextEntry={true}
                        underlineColorAndroid='#BEBEBE'
                        placeholder="長度介於8-16，須包含英文字母及數字"
                        maxLength={16}
                        placeholderTextColor='#BEBEBE'
                        keyboardType='email-address'
                    />
                </View>
                <View style ={styles.textinput}>
                    <Text style = {styles.text}>確認密碼: </Text>
                    <TextInput style={styles.inputBox}
                        onChangeText={(confirm) => setConfirm(confirm)}
                        value = {confirm}
                        secureTextEntry={true}
                        underlineColorAndroid='#BEBEBE'
                        placeholder="再次輸入密碼"
                        maxLength={16}
                        placeholderTextColor='#BEBEBE'
                        keyboardType='email-address'
                    />
                </View>
            </View>
            <View style={styles.Butcontainer}>
                <TouchableOpacity 
                    style={styles.SignupBut}
                    onPress={to_register}>
                    <Text style={styles.SignupText}>完成</Text>
                    </TouchableOpacity>
            </View>
            <View style={{alignItems:'center'}}>
                <TouchableOpacity onPress={() => { navigation.navigate("Forget"); }}>
                    <Text style={styles.forbut}>信箱已註冊，忘記密碼?</Text>
                </TouchableOpacity>
            </View> 
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        height:'100%',
    },
    topbar: {
        backgroundColor: '#5f695d',
        flex: 0.11,
        height: 63,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    textcontain:{
        flex: 0.5,
        justifyContent:'center',
    },
    textinput:{
        flex: 0.3,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
    },
    text:{
        flex: 0.7,
        fontSize:12,
        color:'black',
    },
    inputBox: {
        width: 250,
        fontSize: 12,
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
    SignupBut: {
        flex: 0.35,
        backgroundColor: '#88bd80',
        paddingVertical: 15,
    },
    SignupText: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center'
    },
    forbut: { 
        color: '#BEBEBE',
        fontSize:10,
        fontWeight: '500',
    },
});

export default Signup;
