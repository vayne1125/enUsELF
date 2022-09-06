import React, {Component,useEffect,useState,useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import Iconcamera from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../routes/AutoProvider';
import Hotplace from '../../map/Hotplace'
import Shopplace from '../../map/Shopplace'
import Holplace from '../../map/Holplace'
import Food from '../../theme/Food'
import Hotel from '../../theme/Hotel'
import KOL from '../../theme/KOL'
import Monuments from '../../theme/Monuments'
import Nature from '../../theme/Nature'
const width = Dimensions.get('screen').width - 20;

const Card = ({post,changecollect}) => {
  console.log('o o d ',post);
    
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
    //const [color, setColor] = useState('#D1DED7');
    const color='#5f695d';
    const username=post.name;
    const sites=post.Trip;
    let timestamp = post.time;
   console.log('sssslook ',post.id);
  const [userSchdule, setUserSchdule] = useState([]);
const data=[];
//拿景點資料
  useEffect(()=>{
   firestore().collection('users').doc(user.uid).collection('collect').where('postId','==',post.id).get()
    .then((snap) => {
       if(snap.empty) {
        setColor('#D1DED7');//淺的
       } else {
       setColor('#5f695d');//深的
       }
    })
    if(sites!=null){
        if(sites.desSite.type === "food"){
        data.push(Food[sites.desSite.id]);
      }else if(sites.desSite.type === "nature"){
        data.push(Nature[sites.desSite.id]);
      }else if(sites.desSite.type === "kol"){
        data.push(KOL[sites.desSite.id]);
      }else if(sites.desSite.type === "monuments"){
        data.push(Monuments[sites.desSite.id]);
      }else if(sites.desSite.type === "hotel"){
        data.push(Hotel[sites.desSite.id]);
      }else if(sites.desSite.type === "hol"){
        data.push(Holplace[sites.desSite.id]);
      }else if(sites.desSite.type === "hot"){
        data.push(Hotplace[sites.desSite.id]);
      }else if(sites.desSite.type === "shop"){
        data.push(Shopplace[sites.desSite.id]);
      }
      //console.log('herse11 ',sites.site);
      (sites.site).map((param)=>{
        if(param.type === "food"){
          data.push(Food[param.id]);
        }else if(param.type === "nature"){
          data.push(Nature[param.id]);
        }else if(param.type === "kol"){
          data.push(KOL[param.id]);
        }else if(param.type === "monuments"){
          data.push(Monuments[param.id]);
        }else if(param.type === "hotel"){
          data.push(Hotel[param.id]);
        }else if(param.type === "hol"){
          data.push(Holplace[param.id]);
        }else if(param.type === "hot"){
          data.push(Hotplace[param.id]);
        }else if(param.type === "shop"){
          data.push(Shopplace[param.id]);
        }
      })
    }
    setUserSchdule(data);
    //console.log('data ',data);
  },[]);
 // console.log('1user.uid ',user.uid);
//收藏

  console.log('1post.use ',post.userid);
       return (
        <View style={styles.card}>
        <View style={styles.nameContainer}>
          <View style={styles.info}>
            <Icons name={'person-circle-outline'} size={32} />
          </View>
          <Text style={styles.nameStyle}>{post.name}</Text>
        </View>
        <View style={styles.imageContainer}>
             {(post.img!=null)?
             <Image style={styles.image} resizeMode={"stretch"}source={{uri:post.img}}/>
             :<View style={{top:50,alignItems:'center',}/*styles.noImageContainer*/}><View style={{flex:2,}}><Iconcamera name={'camera-off-outline'} size={60} color={'#5f695d'} /></View>
              <Text style={{fontSize:18,flex:4,}}>此貼文無照片</Text>
              </View>
             }
             </View>
        <View style={styles.textContainer}>
         <TouchableOpacity   onPress={()=>changecollect(post.id)}><Icon name={'heart'} size={24} color={color} />
         </TouchableOpacity>  
          <Text style={styles.textStyle}>{post.content}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {navigation.navigate('Schedule',{sites:sites,userSchdule:userSchdule,username:username});
            }}
            style={{flex: 1}}>
           {user.uid==post.userid?
             <Text style={styles.buttonText}>我的行程</Text>
             :<Text style={styles.buttonText}>他的行程</Text>
          }
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
          flex:1,
        },
        nameStyle: {
          alignSelf: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          color: '#5f695d',
          //left: 15,
          flex:7,
        },
        deliconContainer:{
          //position:'relate',
          //left :200,
          flex:1.25,
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