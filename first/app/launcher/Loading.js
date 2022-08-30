import { secondsInHour } from 'date-fns';
import React,{ useEffect, useContext, useState, useRef } from 'react';
import {ActivityIndicator, View, Dimensions, Alert, Text, DeviceEventEmitter} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import { AuthContext } from '../routes/AutoProvider';

const{ width,height } = Dimensions.get("window")
const Loading = () =>{
    const [ out, setOut ] = useState(false);
    const { logout, user } = useContext( AuthContext );
    const navigation = useRef(useNavigation());
    useEffect(()=>{
        if( user ){
            if(user.emailVerified){navigation.current.navigate('Home');}
            else{sendVerifyEmail();}
        }
    }, [user]);

    useEffect(() => {
        if(out){
            logout();
            Alert.alert(
                '驗證',
                '驗證信已發送至信箱\n請驗證後登入\n如未收到驗證信按登入可再次發送郵件',
            );
        }
    },[out])

    const sendVerifyEmail = async() =>{
        if( user ){
            console.log(user.email)
            await user.sendEmailVerification()
            .then(()=>{setOut(true);})
            .catch(e=>{console.log(e)});
        }
    }
    return(
        <View style = {{ width: width, height: height, justifyContent:'center', alignItems:'center' }}>
            <ActivityIndicator
                animating = {true}
                color = {'#BEBEBE'}
                size = {'large'}
            />
            <Text>驗證登入中，請稍後</Text>
        </View>
    )
}

export default Loading;

