import {Component,useState,createContext,use} from 'react';
import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
//import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const{width,height} = Dimensions.get("window")
class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            userid:'',
            password: '',
        };
    }
    saveData = async() => {
        const {userid, password} = this.state;
        //let loginDetails={ userid: userid, password: password}
        try{
            if(userid != '' && password != ''){
                let loginDetails = await AsyncStorage.getItem('loginDetails');
                let ld = JSON.parse(loginDetails);
                if (ld.userid != null && ld.password != null){
                    if (ld.userid == userid && ld.password == password){
                        //navigation.navigate('Home')
                    }
                    else{
                        //Navigation.navigate('Home')
                        alert('使用者帳號或密碼錯誤!');
                    }
                }
            }
            else{
                alert('使用者帳號或密碼不可為空!');
            }
        }
        catch(error){
            alert(error);
        }
    }
    render() {
        const { navigation } = this.props;
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
                            onChangeText={(userid) => this.setState({userid})}
                            //underlineColorAndroid='rgba(0,0,0,0)'
                            placeholder="User ID"
                            placeholderTextColor='#BEBEBE'
                            //onSubmitEditing={()=> this.password.focus()}
                            enablesReturnKeyAutomatically={true}
                        />
                        <TextInput style={styles.inputBox}
                            onChangeText={(password) => this.setState({password})}
                            secureTextEntry={true}
                            //underlineColorAndroid='rgba(0,0,0,0)'
                            placeholder="Password"
                            placeholderTextColor='#BEBEBE'
                            enablesReturnKeyAutomatically={true}
                            //ref={(input) => this.password = input}
                        />
                    </View>
                    <View style={styles.buttoncontainer}>
                        <TouchableOpacity style={styles.LoginBut}>
                            <Text style={styles.LoginText} onPress={()=>{navigation.navigate("Home");}/*this.saveData*/}>登入</Text>
                        </TouchableOpacity>
                        <View style={{flex:0.05}}/>
                        <TouchableOpacity style={styles.SigninBut}>
                            <Text style={styles.SigninText} onPress={()=>{navigation.navigate("Signup");}}>註冊</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => {navigation.navigate("Forget");}}>
                            <Text style={styles.forbut}>忘記密碼?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
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
    }
});
export default function(props) {
    const navigation = useNavigation();
    return <Login {...props} navigation={navigation} />;
}
