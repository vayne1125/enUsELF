import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Alert } from 'react-native';
import { 
    StyleSheet,
    View,
    Modal,
    Dimensions, 
    TextInput,
    TouchableOpacity,
    ScrollView,
    Text,
} from 'react-native';

import { AuthContext } from '../routes/AutoProvider';

const {height,width} = Dimensions.get('window');

const Forget = ({onClose, mess, email, visible}) => {
    const [mail, setMail] = useState(email);
    const [mess1, setMess1] = useState("");
    const {forget, logout, user} = useContext(AuthContext);
    useEffect(()=>{
        if(mess1){
            console.log(mess1)
            if(mess1==='success'){
                if(user) logout();
                Alert.alert('發送成功','重設密碼信件已寄至信箱');
                onClose();
            }
            else if(mess1==='auth/invalid-email'){
                Alert.alert('發送失敗','信箱格式錯誤');
                setMail('');
            }
            else if(mess1==='auth/user-not-found'){
                Alert.alert('發送失敗','找不到該用戶');
                setMail('');
            }
        }
    },[mess1])
    const to_forget = () => {
        if(!mail)   Alert.alert('發送失敗','欄位不可為空')
        else forget(mail, setMess1);
    }
    return(
        <Modal transparent={true} visible={visible}>
            <View style={styles.modalContainer}>
                <ScrollView contentContainerStyle={styles.Container}>
                <ScrollView>
                    <View style={{height:height * 0.05, flexDirection:'row', justifyContent:'flex-end'}}>
                        <TouchableOpacity 
                            style={{flex:0.2,alignSelf:'flex-end'}}
                            onPress={() => onClose()}
                        >
                            <Text style={style.closeText}>關閉</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:height * 0.15, alignItems:'center', justifyContent:'center'}}>
                        <TextInput 
                            style = {styles.mailContainer}
                            onChangeText={(mail) => setMail(mail)}
                            value= {mail}
                            placeholder="請輸入信箱"
                            placeholderTextColor='#BEBEBE'
                            keyboardType='email-address'
                            editable={!mess}
                            fontSize={12}
                        />
                    </View>
                    <View style={{height:height * 0.15, alignItems:'flex-start'}}>
                        <Text style={styles.messText}>{mess}</Text>
                        <TouchableOpacity 
                            style={styles.subBut}
                            onPress={to_forget}
                        >
                            <Text style = {styles.subText}>發送</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView></ScrollView>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalContainer:{
        width: width,
        height: height, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
    },
    Container:{
        width: width * 0.75,
        height: height * 0.35,
        backgroundColor: '#FCFCFC',
        top: height * 0.4,
        justifyContent: 'center',
        borderRadius: 1,
        borderWidth: 1,
        borderColor: '#88bd80',
    },
    closeText:{
        fontSize:10,
        color:'gray',
        alignSelf:'center',
    },
    mailContainer:{
        width: '80%',
        flex: 0.3,
        backgroundColor: '#FFFFDF',
        borderRadius: 1,
        borderWidth: 1,
        borderColor: '#88bd80',
    },
    messText:{
        fontSize:10,
        color:'#EA0000',
        flex:0.2,
        alignSelf:'center',
    },
    subBut:{
        flex:0.45,
        width:width*0.3,
        backgroundColor: '#88bd80',
        alignSelf:'center',
        justifyContent:'center',
    },
    subText:{
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
    },
})
export default Forget;