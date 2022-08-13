import React, {Component,} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ForgetTop from './ForgetTop';

class Signup extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            check:'',
            password: '',
            checkpassword: '',
        };
    }
    render() {
        const { navigation } = this.props;
        return(
            <View style={styles.container}>
                <View style={styles.topbar}>
                    <ForgetTop/>
                </View>
                <View style ={styles.textcontain}>
                    <View style ={styles.textinput}>
                        <Text style = {styles.text}>信箱: </Text>
                        <TextInput style={styles.inputBox} 
                            //onChangeText={(email) => this.setState({email})}
                            underlineColorAndroid='#BEBEBE'
                            placeholder="請輸入信箱"
                            placeholderTextColor='#BEBEBE'
                            enablesReturnKeyAutomatically={true}>
                        </TextInput>
                    </View>
                    <View style ={styles.textinput}>
                        <Text style = {styles.text}>驗證碼: </Text>
                        <TextInput style={styles.inputBox} 
                            //onChangeText={(userid) => this.setState({userid})}
                            underlineColorAndroid='#BEBEBE'
                            placeholder="輸入驗證碼"
                            placeholderTextColor='#BEBEBE'
                            keyboardType="number-pad"//數字鍵盤吧?
                            enablesReturnKeyAutomatically={true}
                        />
                    </View>
                    <View style ={styles.textinput}>
                        <Text style = {styles.text}>新密碼: </Text>
                        <TextInput style={styles.inputBox}
                            //onChangeText={(password) => this.setState({password})}
                            secureTextEntry={true}
                            underlineColorAndroid='#BEBEBE'
                            placeholder="長度介於8-16，須包含英文字母及數字"
                            placeholderTextColor='#BEBEBE'
                            enablesReturnKeyAutomatically={true}
                        />
                    </View>
                    <View style ={styles.textinput}>
                        <Text style = {styles.text}>再次輸入新密碼: </Text>
                        <TextInput style={styles.inputBox}
                            onChangeText={(checkpassword) => this.setState({checkpassword})}
                            secureTextEntry={true}
                            underlineColorAndroid='#BEBEBE'
                            placeholder="再次輸入新密碼"
                            placeholderTextColor='#BEBEBE'
                            enablesReturnKeyAutomatically={true}/>
                    </View>
                </View>
                <View style={styles.Butcontainer}>
                    <TouchableOpacity 
                        style={styles.SendContain}
                        onPress={()=>{alert('驗證碼已送至信箱')}/*sendemail*/}>
                        <Text style={styles.SendText}>發送驗證碼</Text>
                    </TouchableOpacity>
                    <View style={{flex:0.05}}></View>
                    <TouchableOpacity 
                        style={styles.SignupBut}
                        onPress={()=>{alert('密碼已更新');navigation.goBack();}/*this.checkandgoback*/}>
                        <Text style={styles.SignupText}>完成</Text>
                    </TouchableOpacity>
                </View>   
            </View>
        )
    }
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
});
export default function(props) {
    const navigation = useNavigation();
    return <Signup {...props} navigation={navigation} />;
}
