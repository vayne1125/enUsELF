import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Alert,
} from 'react-native';
import ForgetTop from './ForgetTop';

const Signup = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpass, setConfirmpass] = useState();
    const [check, setCheck] = useState();

    return(
        <View style={styles.container}>
            <View style={styles.topbar}>
                <ForgetTop/>
            </View>
            <View style ={styles.textcontain}>
                <View style ={styles.textinput}>
                    <Text style = {styles.text}>信箱: </Text>
                    <TextInput style={styles.inputBox} 
                        onChangeText={(email) => setEmail(email)}
                        //value = {this.state.email}
                        underlineColorAndroid='#BEBEBE'
                        placeholder="請輸入信箱"
                        placeholderTextColor='#BEBEBE'
                    />
                </View>
                <View style ={styles.textinput}>
                    <Text style = {styles.text}>驗證碼: </Text>
                    <TextInput style={styles.inputBox} 
                        onChangeText={(check) => setCheck(check)}
                        //value = {this.state.userid}
                        underlineColorAndroid='#BEBEBE'
                        placeholder="輸入驗證碼"
                        placeholderTextColor='#BEBEBE'
                        keyboardType="numeric"//數字鍵盤吧?
                        maxLength={6}
                    />
                </View>
                <View style ={styles.textinput}>
                    <Text style = {styles.text}>新密碼: </Text>
                    <TextInput style={styles.inputBox}
                        onChangeText={(password) => setPassword(password)}
                        //value = {this.state.password}
                        secureTextEntry={true}
                        underlineColorAndroid='#BEBEBE'
                        placeholder="長度介於8-16，須包含英文字母及數字"
                        placeholderTextColor='#BEBEBE'
                        maxLength={16}
                    />
                </View>
                <View style ={styles.textinput}>
                    <Text style = {styles.text}>再次輸入新密碼: </Text>
                    <TextInput style={styles.inputBox}
                        onChangeText={(confirmpass) => setConfirmpass(confirmpass)}
                        //value = {this.state.checkpassword}
                        secureTextEntry={true}
                        underlineColorAndroid='#BEBEBE'
                        placeholder="再次輸入新密碼"
                        placeholderTextColor='#BEBEBE'
                        maxLength={16}
                    />
                </View>
            </View>
            <View style={styles.Butcontainer}>
                <TouchableOpacity 
                    style={styles.SendContain}
                    onPress={() => {/*this.sendcheck*/}}>
                    <Text style={styles.SendText}>發送驗證碼</Text>
                </TouchableOpacity>
                <View style={{flex:0.05}}></View>
                <TouchableOpacity 
                    style={styles.SignupBut}
                    onPress={() => {}}>
                    <Text style={styles.SignupText}>完成</Text>
                </TouchableOpacity>
            </View>   
            <View style={{alignItems:'center'}}>
                <TouchableOpacity onPress={() => {navigation.navigate("Signup");}}>
                    <Text style={styles.forbut}>信箱未註冊?前往註冊</Text>
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
        flex: 0.2,
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
        width: 200,
        fontSize: 12,
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
    Butcontainer:{
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
        textAlign: 'center',
    },
    forbut: { 
        color: '#BEBEBE',
        fontSize:10,
        fontWeight: '500',
    },
});

export default Signup;
