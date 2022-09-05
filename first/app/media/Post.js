import React, {Component} from 'react';
import  { useState,useContext,useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  DeviceEventEmitter,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';//照片icon
import Icon3 from 'react-native-vector-icons/MaterialIcons';//行李箱icon
import Iconcross from 'react-native-vector-icons/Entypo';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {AuthContext} from '../routes/AutoProvider';
//import PostTop from './PostTop'
//import PostButton from './PostButton'

const Stack = createNativeStackNavigator();
const width = Dimensions.get('screen').width;

const Post = ({navigation, route}) => {
    const userdata = route.params;
console.log('o o o  ',userdata);
const {user, logout} = useContext(AuthContext);
//console.log(user);
    const users = firestore().collection('users').doc(user.uid);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [post, setPost] = useState(null);
    const [trip,setTrip]=useState(null);
//console.log('o o o  ',trip);
//console.log('!: ',users);
/*useEffect(() => {
  setTrip([]);
},[]);*/
//get shoosen trip
  useEffect(() => {
    const listen = DeviceEventEmitter
    .addListener('addSchedule',(item) => {
      setTrip(item);
      console.log('teip ',item);
      console.log('teip2 ',trip);
    });
    return () => listen.remove();
  },[]);
//選照片
    const selectImage = () => {
        const options = {
          maxWidth: 2000,
          maxHeight: 2000,
          mediaType: "photo", 
          includeBase64: true,
          storageOptions: {
            skipBackup: true,
            path: 'images'
          }
        };
        launchImageLibrary(options, (response) => { // Use launchImageLibrary to open image gallery
          
          if(response.didCancel){console.log('沒選');}
          else{
          console.log('Response = ', response);
           const source = { uri: response.assets[0].uri};//response是選取的物件
           //Asset Object是內容物，然後他很坑紙船一個也會變陣列qq，所以要拿第一個人的uri
           console.log('Response uri = ', response.assets[0].uri);
           console.log(source);
          setImage(source);
          console.log('user=',user);
          console.log('user name=',user.mail);
          }
        });
      };
//發文
      const SubmitPost = async ()=>{
        const imageUrl=await uploadImage();//等他做完我才跑
          console.log('imageUrl:',imageUrl);

        firestore()
        .collection('posts')
        .add({
          userid:user.uid,
          name:userdata.name,
          post:post,
          postImg:imageUrl,
          postTime:firestore.Timestamp.fromDate(new Date()),
          Trip:trip,
          //coomments:null,
        }).then(()=>{
          console.log('Post add !');
          setPost(null);
          Alert.alert("成功發布");
          navigation.goBack();
        }).catch((error)=>{
          console.log('Post Failed!',error);
        });
        DeviceEventEmitter.emit('postSend');
      }
 //上傳照片   
      const uploadImage = async () => {
        console.log(image);
        if(image==null){return null;}
        const  uri  = image.uri;
            console.log('image= ',image.uri);
        let filename = uri.substring(uri.lastIndexOf('/') + 1);
            console.log('filename= ',filename);
      //have change
        setUploading(true);
            // transferred(0);//轉圈圈
        
        const storageRef=storage().ref(`photos/${filename}`);//creat a folder
        const task=storageRef.putFile(uri);
       task.on('state_changed', taskSnapshot => {
      //file size<256 kb(very small size)" 所以我的上傳才會只有0跟100%
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
      });
      
       try{
         //等待一下
         await  task;
        //get download Url storageRef是自訂的路徑
        //上面的filename是我們自己設的
        const Url = await storageRef.getDownloadURL();
         console.log("url= ",Url)
         setUploading(false);
         setImage(null);
         return Url;
       }catch(e)
       {
         console.log(e);
         setImage(null);
         return null;
       }
      
      };
//選行程
    const ChooseTrip =()=>{
      navigation.navigate("ChooseTrip");
    }


    return (
      
      <View style={styles.container}>
      {/*topbar */}
        <View style={styles.topbar}>
          <View style={styles.Topcontainer}>
              <View style={styles.TopiconContainer}>
                  <TouchableOpacity
                    //返回建X
                    onPress={() => {
                      navigation.goBack();
                    }}
                    style={{flex: 1}}>
                    <Iconcross
                        name="cross"
                        size={40}
                          color={'#5f695d'}
                          style={styles.TopiconStyle}
                      />
                  </TouchableOpacity>
                  </View>
                  <Text style={styles.ToptextStyle}>分享旅途</Text>
                  <View style={styles.TopbuttonContainer2}>
                  {uploading ? (
                  <View style={styles.cycleContainer}>
                  {/* <Progress.Bar progress={transferred} width={300} />*/}
                  {/*轉圈圈*/} 
                   <ActivityIndicator size='small' color='#2f2f2f'/>
                    </View>
                    ) : ( <TouchableOpacity
                        //回到社群
                        onPress={SubmitPost}
                      style={{flex: 1}}>
                      <Text style={styles.TopbuttonText}>發布</Text>
                    </TouchableOpacity>
                  )}
                  </View>
              </View>
        </View>
        <View style={styles.userpost}>
          <View style={styles.iconContainer}>
            <Icons name={'person-circle-outline'} size={45} />
          </View>
          <View style={{flexDirection: "column",}}>
            <Text style={styles.nameStyle}>{userdata.name}</Text>
            {(trip) ? <Text style={styles.tripStyle}>已匯入行程{trip.name}</Text> :null }
          </View>
        </View>
        <ScrollView style={styles.contentContainer}> 
            {image != null ? <Image source={{uri: image.uri}} style={{  height: 300,width:width}} /> : null}
              <TextInput style={styles.contentText} 
              multiline        
              //numberOfLines={4}
              value={post}
              onChangeText={(context)=>setPost(context)}
              placeholder="在想些什麼呢?" />
        </ScrollView>
        
        {/*下方bar*/}
        <View style={styles.buttonbar}>
            <View style = {styles.butContainer}>
            {/*圖片*/}
            <View style={styles.buticonContainer1}>
              <TouchableOpacity
                onPress={ selectImage}
                style={{flex: 1}}>
                <Icon2
                    name="picture"
                    size={40}
                      color={'#5f695d'}
                      style={styles.iconStyle}
                  />
              </TouchableOpacity></View>

              <View style={styles.buticonContainer2}>
              {/*旅遊行程表*/}
              <TouchableOpacity
                 onPress={ChooseTrip}
                style={{flex: 1}}>
                <Icon3
                    name="luggage"
                    size={40}
                      color={'#5f695d'}
                      style={styles.iconStyle}
                  />
              </TouchableOpacity></View>
              </View>
        </View>   
      </View>
    );
}

//button一定要有title
const styles = StyleSheet.create({
//trip
tripStyle:{
  color:"2f2f2f",
  left:20,
  fontSize:14,
},

//post
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
  ToptextStyle: {
    //left:150,
    //top: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5f695d',
    letterSpacing: 2,
    flex:1,
  },
  Topcontainer: {
    flexDirection: 'row',
    margin:20,
    left:0,
  },
  TopiconStyle: {
    top: -6,
    left: -6,
  },
  TopiconContainer: {
   // right: 340,
   // top: 8,
    //backgroundColor: '#D1DED7',
    flex:1,
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 30,
  },
  TopbuttonContainer: {
    backgroundColor: '#fbb856',//較深黃
    //backgroundColor: '#ffc56b',//較淺黃
  //  flex: 1,
    width: 120,
    //alignSelf: 'flex-end',
    right: 7,
    bottom: 10,
    borderRadius: 20,
  },
  TopbuttonContainer2: {
    flex:0.5,
    backgroundColor: '#D9D9D9', //較淺黃
    //flex: 1,
    width: 65,
    //alignSelf: 'flex-end',
   // left:320,
    //bottom: 10,
    borderRadius: 3,
    height: 25,
   // top:13,
    //flexDirection: 'row',
  },
  TopbuttonText: {
    fontWeight: '800',
    fontSize: 17,
    color: '#AAAAAA',
   // top: 1,
   //alignItems:'center', 
   //alignContent:'center',
   letterSpacing: 2,
    left: 15,
  },
  cycleContainer:{
  top:2,
  //justifyContent:'center',  
  //alignContent:'center',
  },
//body
  container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  userpost:{
    flexDirection:'row',
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
  contentContainer: {
    flex: 3,
  },
  contentText: {
    fontSize:20,
    left:10,
   // color:"red",
  },
  nameStyle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#5f695d',
    left: 15,
    top:5,
    letterSpacing: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    backgroundColor: '#D1DED7',
    flex: 1,
    //position:'relative',
  },
  iconContainer: {
    left: 8,
    top: 5,
  },
//button
  
  buttonbar: {
   flex:0.11,    
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
  butContainer: {
    flex: 1,   
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    backgroundColor:"#e2e2e2", 
    flexDirection: 'row',
    justifyContent:'center',
    //borderColor: '#000000',
   // borderBottomWidth:3,
  },
  buticonContainer1:{
      right:100,
      top:10,
  },
  buticonContainer2:{
    right:-70,
    top:10,
    },
});

export default Post;
