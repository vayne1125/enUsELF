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
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../routes/AutoProvider';
const{width,height} = Dimensions.get("window")

const Login = ({navigation}) => {
    const [email, setEmail] = useState(String);
    const [password, setPassword] = useState(String);
    const {login} = useContext(AuthContext);
    const [mess, setMess] = useState(String);
    
    useEffect(() => {
        console.log(mess);
        if(mess!=''){
            if(mess === 'auth/invalid-email'){
                Alert.alert('登入失敗','EMAIL格式錯誤');
                setEmail('')
                setPassword('')
            }
            else if(mess === 'auth/user-not-found'){
                Alert.alert('登入失敗','該EMAIL尚未註冊');
                setEmail('')
                setPassword('')
            }
            else {
                Alert.alert('登入失敗','密碼錯誤');
                setPassword('')
            }
        }
    }, [mess])

    const to_login = async() =>{
        if(!email && !password){
            Alert.alert('登入失敗', '欄位不可為空');
        }
        else{
            login(email, password, setMess)
        }
    }
    return (
        <View style={styles.container}>
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
                        onChangeText={(email) => setEmail(email)}
                        value={email}
                        placeholder="User ID"
                        placeholderTextColor='#BEBEBE'
                        keyboardType='email-address'

                    />
                    <TextInput style={styles.inputBox}
                        onChangeText={(password) => setPassword(password)}
                        value={password}
                        secureTextEntry={true}
                        keyboardType='email-address'
                        placeholder="Password"
                        placeholderTextColor='#BEBEBE'
                        maxLength={16}
                    />
                </View>
                <View style={styles.buttoncontainer}>
                    <TouchableOpacity style={styles.LoginBut}>
                        <Text style={styles.LoginText} onPress={to_login}>登入</Text>
                    </TouchableOpacity>
                    <View style={{flex:0.05}}/>
                    <TouchableOpacity style={styles.SigninBut}>
                        <Text style={styles.SigninText} onPress={() => { navigation.navigate("Signup"); }}>註冊</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => { navigation.navigate("Forget"); }}>
                        <Text style={styles.forbut}>忘記密碼?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width:width,
        height,
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
        hight: '100%',
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
        backgroundColor: '#FFFFDF',
        borderRadius: 1,
        borderWidth: 1,
        borderColor: '#88bd80',
        fontSize: 12,
        marginVertical: 4,
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

export default Login;
