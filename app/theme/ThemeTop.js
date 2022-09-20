import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Foundation';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const width2 = (Dimensions.get('screen').width * 49) / 50;

const ThemeTop = () => {
    const navigation = useNavigation();
    const [theme, setTheme] = useState('美食');
    
    useEffect(()=>{
        DeviceEventEmitter.emit('NewTheme',theme);
    },[theme])
    return (
        <View style={{flex:2.6}}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>主題分類</Text>
                </View>
                <TouchableOpacity onPress={()=>{navigation.navigate("List")}} style={{flex:1,}}>
                    <View style={styles.iconContainer}>
                        <Icons name="calendar-outline" size={33} color={'#5f695d'} style={styles.iconStyle} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.topBar}>
                <View style={styles.icons}>
                    {(theme==='美食')?
                    (<View style={styles.theme2}> 
                        <Icons name={'fast-food'} color={'#ffffff'} size={38} />
                    </View>):
                    (<View style={styles.theme}>
                        <TouchableOpacity onPress={() => {setTheme('美食');}}>
                            <Icons name={'fast-food'} color={'#5f695d'} size={38} />
                        </TouchableOpacity>
                    </View>)}
                    {(theme==='美食') ? 
                    (<View style={styles.text}>
                        <Text style={styles.textStyle2}>美食</Text>
                    </View>):
                    (<View style={styles.text}>
                        <Text style={styles.textStyle2}>美食</Text>
                    </View>)}
                </View>
                <View style={styles.icons}>
                    {(theme==='自然') ? (
                    <View style={styles.theme2}>
                        <Icon2 name={'mountains'} color={'#ffffff'} size={40} />
                    </View>):
                    (<View style={styles.theme}>
                        <TouchableOpacity onPress={() => {setTheme('自然');}}>
                            <Icon2 name={'mountains'} color={'#5f695d'} size={40} />
                        </TouchableOpacity>
                    </View>)}
                    {(theme==='自然') ? 
                    (<View style={styles.text}>
                        <Text style={styles.textStyle2}>自然</Text>
                    </View>):
                    (<View style={styles.text}>
                        <Text style={styles.textStyle2}>自然</Text>
                    </View>)}
                </View>
                <View style={styles.icons}>
                    {(theme==='網美')?
                    (<View style={styles.theme2}>
                        <Icon name={'camera-retro'} color={'#ffffff'} size={36}/>
                    </View>):
                    (<View style={styles.theme}>
                        <TouchableOpacity onPress={() => { setTheme('網美');}}>
                            <Icon name={'camera-retro'} color={'#5f695d'} size={36} />
                        </TouchableOpacity>
                    </View>)}
                    {(theme==='網美')?
                    (<View style={styles.text}>
                        <Text style={styles.textStyle2}>網美</Text>
                    </View>):
                    (<View style={styles.text}>
                        <Text style={styles.textStyle2}>網美</Text>
                    </View>
                    )}
                </View>
                <View style={styles.icons}>
                    {(theme==='古蹟')?
                    (<View style={styles.theme2}>
                        <Icon3 name={'castle'} color={'#ffffff'} size={40}/>
                    </View>):
                    (<View style={styles.theme}>
                        <TouchableOpacity onPress={() => {setTheme('古蹟');}}>
                            <Icon3 name={'castle'} color={'#5f695d'} size={40}/>
                        </TouchableOpacity>
                    </View>)}
                    {(theme==='古蹟') ? 
                    (<View style={styles.text}>
                        <Text style={styles.textStyle2}>古蹟</Text>
                    </View>):
                    (<View style={styles.text}>
                        <Text style={styles.textStyle2}>古蹟</Text>
                    </View>)}
                </View>
                <View style={styles.icons}>
                    {(theme==='住宿')?
                    (<View style={styles.theme2}>
                        <Icons name={'bed'} color={'#ffffff'} size={42} />
                    </View>):
                    (<View style={styles.theme}>
                        <TouchableOpacity onPress={() => {setTheme('住宿');}}>
                            <Icons name={'bed'} color={'#5f695d'} size={42} />
                        </TouchableOpacity>
                    </View>)}
                    {(theme==='住宿') ? 
                    (<View style={styles.text}>
                        <Text style={styles.textStyle2}>住宿</Text>
                    </View>):
                    (<View style={styles.text}>
                        <Text style={styles.textStyle2}>住宿</Text>
                    </View>)}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex:0.9,
    flexDirection: 'row',
    //backgroundColor:'black'
  },
  topBar: {
    flex: 1.6,
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: width2,
    padding: 5,
  },
  icons: {
    flex: 1,
    //width:width,
    height: '100%',
    padding: 5,
  },
  textContainer:{
    flex:4,
    // alignContent:'center',
    // alignSelf:'center',
    // justifyContent:'center',  
    position:'absolute',
  },
  textStyle: {
    //alignContent:'center',
    //justifyContent:'center',
    bottom:'15%',
    left:'5%',
    //fontSize: 30,//9/14
    fontSize: 26,
    //fontWeight: 'bold',
    //color: '#ffffff',
    color:'#5f695d',//9/14改
    //color:'#A17747',
    fontFamily:'NotoSerifTC-Bold',
    letterSpacing:10,
  },
  text: {
    flex: 1,
    //backgroundColor:'#000000,
  },
  iconStyle: {
    //top: 5,
    //left: 8,
    top:'23%',
    left:'350%',
  },
  iconContainer: {
    flex:1,
    position: 'absolute',
    // alignContent:'center',
    // alignItems:'center',
    // alignSelf:'center',
    // justifyContent:'center',
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 30,
  },
  theme: {
    borderRadius: 25,
    flex: 3,
    //height:height,
    backgroundColor: 'white',
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom:3,
  },
  theme2:{
    borderRadius: 25,
    flex: 3,
    //height:height,
    backgroundColor: '#5f695d',//9/14改
    //backgroundColor: '#ffc56b',
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom:3,
  },
  textStyle2: {
    letterSpacing: 4,
    //fontFamily:'NotoSerifTC-Bold',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    alignContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-around',
    //color:'#A17747'//9/14改
  },
});

export default ThemeTop;