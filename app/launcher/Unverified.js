import React, { useEffect, useState, useContext } from 'react';
import {
    ActivityIndicator,
    View,
    Dimensions,
    Text,
    Alert,
}from 'react-native';

import { AuthContext } from '../routes/AutoProvider';
const{ width,height } = Dimensions.get("window")


const Unverified = () =>{
    const { user, logout } = useContext(AuthContext);
    const [ out, setOut ] = useState(false);
    const [mess, setMess] = useState('success');

    useEffect(()=>{
        const sendVerifyEmail = async() =>{
            console.log(user.email)
            await user.sendEmailVerification()
            .then(()=>{setMess('success');setOut(true);})
            .catch(e=>{
                console.log(e);
                setMess(e.code);
                setOut(true);});
        }
        if(user) sendVerifyEmail();
    },[])

    useEffect(() => {
        if(out){
            logout();
            if(mess === 'success'){
                Alert.alert(
                    '驗證',
                    '驗證信已發送至信箱\n請驗證後登入\n如未收到驗證信按登入可再次發送郵件',
                );
            }
            else if(mess === 'auth/too-many-requests'){
                Alert.alert(
                    '錯誤',
                    '驗證信已發送太多次\n請晚點再嘗試\n如未收到驗證信請檢查垃圾郵件',
                );
            }
            else{
                Alert.alert(
                    '錯誤',
                    '系統發生未知的錯誤\n請晚點再嘗試',
                );
            }
        }
    },[out])
    return(
        <View style = {{ width: width, height: height, justifyContent:'center', alignItems:'center' }}>
            <ActivityIndicator
                animating = {true}
                color = {'#BEBEBE'}
                size = {'large'}
            />
            <Text>驗證碼發送中</Text>
        </View>
    )
}

export default Unverified;

