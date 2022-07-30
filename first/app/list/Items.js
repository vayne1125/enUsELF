import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    Alert,
    TouchableOpacity,
  } from 'react-native';
import Icons from 'react-native-vector-icons/Entypo';
//import CheckBox from '@react-native-community/checkbox';
import  CheckBox  from 'react-native-checkbox';
//import CheckBox from 'react-native-icon-checkbox';
const width = Dimensions.get('screen').width;

const sites = [
    {
      id: 1-3,
      name: '日月潭',
      img: require('../../assets/site2.webp'),
      address: '南投縣魚池鄉',
    },
    {
      id: 2-3,
      name: '高美濕地',
      img: require('../../assets/site3.jpg'),
      address: '台中市清水區',
    },
    {
      id: 3-3,
      name: '雪霸國家公園',
      img: require('../../assets/site5.webp'),
      address: '苗栗縣大湖鄉',
    },
];

const Items = () => {
    const CheckDel = () =>{
        Alert.alert(
            "",
            "確定要刪除嗎?",
            [
                //{text: '确认', onPress: () => showTip()},
                {
                    text: '確認',
                    onPress: () => {},
                },
                {
                    text: "取消",
                },
            ],
        );
    };
    const Card = ({site}) => {
        const [isSelected, setSelection] = useState(false);
        return (
            <View style={styles.card}>
                <View style={styles.ChanceContainer}>
                    <CheckBox
                    uncheckedIconName = "circle-o"
                    checkedIconName = "circle-with-cross"
                    onValueChange={setSelection}
                    //style={styles.CheckBox}
                    testID={site.id}
                    />
                </View>
                <View style={styles.imageContainer}>
                    {/*<Image style={{flex: 1, resizeMode: 'center'}} source={site.img} />*/}
                    {<Image style={styles.image} source={site.img} />}
                </View>
                <View style={{flex: 2}}>
                    <TouchableOpacity
                        onPress={()=>{CheckDel()}}>
                        <View style={{right:-100}}>
                            <Icons
                            name="circle-with-cross"
                            size={25}
                            color={'#5f695d'}
                            style={styles.iconStyle}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.nameStyle}>{site.name}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.addressStyle}>{site.address}</Text>
                    </View>
                </View>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                marginTop: 25,
                paddingBottom: 80,
            }}
            numColumns={1}
            data={sites}
            renderItem={({item}) => <Card site={item} />}>     
            </FlatList>
        </View>
    );
}
const styles = StyleSheet.create({
    topbar: {
      backgroundColor: '#5f695d',
      //flex:1,
      height: 63,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      //opacity: 0.9,
    },
    container: {
      hight: '100%',
      backgroundColor: '#F2F2F2',
      flex: 1,
    },
    card: {
      height: 170,
      //backgroundColor:'#D1DED7',
      backgroundColor: '#ffffff',
      width,
      //marginHorizontal: 10,
      //borderRadius: 10,
      marginBottom: 15,
      //paddingTop:5,
      padding: 5,
      //right: 2,
      //borderColor: '#D1DED7',
      //borderWidth: 3,
      flex: 1,
      flexDirection: 'row',
      borderBottomWidth: 3,
      borderBottomColor:'#D1DED7',
      borderRightWidth:3,
      borderRightColor:'#ffffff',
    },
    textStyle: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 19,
      color: '#5f695d',
      top: 8,
      letterSpacing: 10,
    },
    image: {
      width: 180,
      height: 110,
      borderRadius: 10,
    },
    textContainer: {
      flex: 2,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      alignSelf: 'center',
      alignItems: 'center',
      top: 13,
      right: 8,
      //position:'relative',
    },
    imageContainer: {
      flex: 2.5,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 3,
    },
    ChanceContainer:{
        flexDirection: 'column',
        flex:0.8,
        alignSelf: 'center',
        justifyContent:'center',
    },
    nameStyle: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      color: '#5f695d',
      left: 15,
      letterSpacing: 1,
    },
    addressStyle: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 10,
        color: 'gray',
        left: 15,
        letterSpacing: 1,
    },
    /*CheckBox:{
        height: 50,             
        width: 50,
        borderWidth: 1,        
        backgroundColor: 'red', 
        borderColor: 'green',   
        borderStyle: 'dotted',
    },*/
  });
  
export default Items;