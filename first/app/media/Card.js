import React, {Component,useEffect,useState,useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import Iconcross from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import MediaTop from './MediaTop';
import {AuthContext} from '../routes/AutoProvider';
const width = Dimensions.get('screen').width - 20;

const Card = ({navigation,post,onDelete}) => {
    const {user, logout} = useContext(AuthContext);
   // const [userData, setUserData] = useState(null);
    const [userSchdule, setUserSchdule] = useState(null);
    const username=post.name;
    console.log('ㄟlook ',username);
    console.log('user.uid= ',user.uid);
    console.log('post.useid= ',post.userid);
    console.log('sss =',post);

  const fetchSchdule = async() =>{
    try{
    const list=[];
    const view = firestore().collection('posts').doc(post.id);
    
    console.log('這 ',post.id);
    await view.collection('list').get()
    .then((querySnapshot)=>{
      querySnapshot.forEach(doc=>{
          const {name, address, city, info, place_id, pos, region, star, time} = doc.data();
          list.push({
              name: name,
              city: city,
              region: region,
              address:address,
              city:city,
              info:info,
              place_od:place_id,
              pos:pos,
              star:star,
              time:time,
        });
      })
    })
    setUserSchdule(list);
    console.log('行程= ',list);
    console.log('行程2= ',userSchdule);

    }catch(e){
      console.log(e);
    };
  }

  useEffect(()=>{
       fetchSchdule();
  },[]); 
       return (
         <View style={styles.card}>
           <View style={styles.nameContainer}>
             <View style={styles.info}>
               <Icons name={'person-circle-outline'} size={32} />
             </View>
             <Text style={styles.nameStyle}>{post.name}</Text>
             {user.uid==post.userid?
               <View style={styles.deliconContainer}>
                  <TouchableOpacity
                    onPress={()=>onDelete(post.id)}
               style={{flex: 1}}>
               <Iconcross
                   name="cross"
                   size={40}
                     color={'#5f695d'}
                     style={styles.TopiconStyle}
                 />
             </TouchableOpacity></View>
             :null}
           </View>
           <View style={styles.imageContainer}>
             {/*<Image style={{flex: 1, resizeMode: 'contain'}} source={post.img} />*/}
             <Image style={styles.image} resizeMode={"stretch"}source={{uri:post.img}}/>
           </View>
           <View style={styles.textContainer}>
             <Icon name={'heart'} size={24} />
             <Text style={styles.textStyle}>{post.content}</Text>
           </View>
           <View style={styles.buttonContainer}>
             <TouchableOpacity
               onPress={() => {navigation.navigate('Schedule',{userSchdule:userSchdule,username:username});
               }}
               style={{flex: 1}}>
               <Text style={styles.buttonText}>他的行程</Text>
             </TouchableOpacity>
           </View>
         </View>
       );
     };

 const styles = StyleSheet.create({
        container: {
          hight: '100%',
          backgroundColor: '#F2F2F2',
          flex: 1,
        },
        card: {
          height: 400,
          //backgroundColor:'#D1DED7',
          backgroundColor: '#ffffff',
          width,
          marginHorizontal: 10,
          borderRadius: 10,
          marginBottom: 15,
          //paddingTop:5,
          //padding: 5,
          borderColor: '#D1DED7',
          //borderWidth: 2,
          //borderStyle:'solid',
          borderBottomWidth:3,
          //borderRightWidth:2,
          //borderStyle:'dashed',
        },
        deliconContainer:{
          left :250,
        },
        mycard: {
          height: 50,
          //backgroundColor:'#D1DED7',
          backgroundColor: '#ffffff',
          //width,
          marginHorizontal: 10,
          borderRadius: 10,
          marginBottom: 15,
          //paddingTop:5,
          //padding: 5,
          borderColor: '#D1DED7',
          //borderWidth: 2,
          //borderStyle:'solid',
          borderBottomWidth:3,
          //borderRightWidth:2,
          //borderStyle:'dashed',
        },
        textStyle: {
          fontWeight: 'bold',
          fontSize: 17,
          color: '#5f695d',
          top: 8,
          letterSpacing: 8,
        },
        image: {
          width: '95%',
          height: '95%',
        },
        textContainer: {
          //backgroundColor: '#D1DED7',
          flex: 3,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          left: 14,
          top: 5,
          //borderRadius:5,
          //borderTopWidth:2,
          borderColor: '#D1DED7',
          //position:'relative',
       
        },
        nameStyle: {
          alignSelf: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          color: '#5f695d',
          left: 15,
        },
        nameContainer: {
          flexDirection: 'row',
          backgroundColor: '#D1DED7',
          flex: 1,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          //position:'relative',
        },
        info: {
          left: 8,
          top: 5,
        },
        buttonContainer: {
          backgroundColor: '#fbb856',//較深黃
          //backgroundColor: '#ffc56b',//較淺黃
          flex: 1,
          width: 120,
          alignSelf: 'flex-end',
          right: 7,
          bottom: 10,
          borderRadius: 20,
        },
        buttonText: {
          fontWeight: '800',
          fontSize: 17,
          color: '#6b5238',
          top: 8,
          letterSpacing: 10,
          left: 7,
        },
        imageContainer: {
          flex: 5, 
          alignItems: 'center', 
          backgroundColor: '#D1DED7',
          borderColor: '#D1DED7',
          borderWidth: 3,
          borderBottomWidth:10,
        },
       });
export default Card;