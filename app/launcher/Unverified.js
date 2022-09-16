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

    useEffect(()=>{
        const sendVerifyEmail = async() =>{
            if( user ){
                console.log(user.email)
                await user.sendEmailVerification()
                .then(()=>{setOut(true);})
                .catch(e=>{console.log(e)});
            }
        }
        sendVerifyEmail();
    },[])

    useEffect(() => {
        if(out){
            logout();
            Alert.alert(
                '驗證',
                '驗證信已發送至信箱\n請驗證後登入\n如未收到驗證信按登入可再次發送郵件',
            );
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

