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
import { createStackNavigator } from '@react-navigation/stack';
import PersonalFileTop from './PersonalFileTop'
//const Stack = createNativeStackNavigator();
const width = Dimensions.get('screen').width;
//#5f695d
const PersonalFile = ({navigation, route}) => {
    const userdata = route.params;
    return(
        <View style={styles.container}>
            <View style={styles.topbar}>
              <PersonalFileTop/>
            </View>
            <View style ={styles.textcontain}>
            <View style ={styles.textinput}>
                    <Text style = {styles.text}>id(不可修改): </Text>
                    <TextInput style={styles.inputBox} 
                        //onChangeText={(email) => this.setState({email})}
                        underlineColorAndroid='#BEBEBE'
                        editable={false}//是否可编辑
                        placeholder={userdata.nickname}
                        TextInputShow={false}
                        placeholderTextColor='#5f695d'
                        enablesReturnKeyAutomatically={true}
                    />
                </View>
                <View style ={styles.textinput}>
                    <Text style = {styles.text}>信箱(不可修改): </Text>
                    <TextInput style={styles.inputBox} 
                        //onChangeText={(email) => this.setState({email})}
                        underlineColorAndroid='#BEBEBE'
                        editable={false}//是否可编辑
                        placeholder={userdata.mail}
                        placeholderTextColor='#5f695d'
                        enablesReturnKeyAutomatically={true}
                    />
                </View>
                <View style ={styles.textinput}>
                    <Text style = {styles.text}>暱稱: </Text>
                    <TextInput style={styles.inputBox} 
                        //onChangeText={(email) => this.setState({email})}
                        underlineColorAndroid='#BEBEBE'
                        editable={true}//是否可编辑
                        placeholder={userdata.nickname}
                        placeholderTextColor='#BEBEBE'
                        enablesReturnKeyAutomatically={true}
                    />
                </View>
                <View style ={styles.textinput}>
                    <Text style = {styles.text}>重設密碼: </Text>
                    <TextInput style={styles.inputBox} 
                        //onChangeText={(email) => this.setState({email})}
                        underlineColorAndroid='#BEBEBE'
                        editable={true}//是否可编辑
                        secureTextEntry={true}
                        placeholder='長度介於8-16，須包含英文字母及數字'
                        placeholderTextColor='#BEBEBE'
                        enablesReturnKeyAutomatically={true}
                    />
                </View>
                <View style ={styles.textinput}>
                    <Text style = {styles.text}>確認密碼: </Text>
                    <TextInput style={styles.inputBox} 
                        //onChangeText={(email) => this.setState({email})}
                        underlineColorAndroid='#BEBEBE'
                        editable={true}//是否可编辑
                        secureTextEntry={true}
                        placeholder='請確認密碼'
                        placeholderTextColor='#BEBEBE'
                        enablesReturnKeyAutomatically={true}
                    />
                </View>
            </View>
            <View style={styles.Butcontainer}>
                <TouchableOpacity 
                    style={styles.SignupBut}
                    onPress={()=>{navigation.navigate("PersonalHome")}/*this.checkandgoback*/}>
                    <Text style={styles.SignupText}>完成</Text>
                </TouchableOpacity>
            </View>   
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        height:'100%',
    },
    topbar: {
        backgroundColor: '#e2e2e2',//'#F2F2F2',
        //#5f695d',
        //flex:1,
        height: 50,
        borderColor: '#AAAAAA',
        borderBottomWidth:1,
       // borderBottomLeftRadius: 20,
       // borderBottomRightRadius: 20,
        //opacity: 0.9,
      },
    textcontain:{
        flex: 0.6,
        justifyContent:'center',
    },
    textinput:{
        flex: 0.2,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
    },
    textstyle:{
        underlineColorAndroid:'#BEBEBE',
        fontSize:15,
        right:180,
    },
    textstyle2:{
        underlineColorAndroid:'#BEBEBE',
        fontSize:15,
        right:100,
    },
    text:{
        flex: 0.7,
        fontSize:12,
        color:'black',
    },
    text1:{
        right:30,
        alignContent:'flex-end',
        flex: 0.7,
        fontSize:12,
        color:'black',
    },
    inputBox: {
        width: 250,
        fontSize: 13,
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
    
});
export default PersonalFile;