import React, { Component } from 'react';
import { useState, useContext, useEffect } from 'react';
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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';//照片icon
import Icon3 from 'react-native-vector-icons/MaterialIcons';//行李箱icon
import Iconcross from 'react-native-vector-icons/Entypo';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { AuthContext } from '../routes/AutoProvider';
//import PostTop from './PostTop'
//import PostButton from './PostButton'
import ImagePicker from 'react-native-image-crop-picker';

const Stack = createNativeStackNavigator();
const width = Dimensions.get('screen').width;
const picwidth = Dimensions.get('screen').width*0.9;
const picheight =picwidth*2/3;

const Post = ({ navigation, route }) => {
  const userdata = route.params;
  //console.log('o o o1  ', route.params);
  const { user, logout } = useContext(AuthContext);
  //console.log(user);
  const users = firestore().collection('users').doc(user.uid);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [post, setPost] = useState(null);
  const [trip, setTrip] = useState(null);
  const [username, setUserName] = useState(null);
  //console.log('o o o  ',trip);
  //console.log('!: ',users);

  //get shoosen trip
  useEffect(() => {
    const listen = DeviceEventEmitter
      .addListener('addSchedule', (item) => {
        setTrip(item);
        // console.log('teip ',item);
        // console.log('teip2 ',trip);
      });
    return () => listen.remove();
  }, []);
  //選照片
  /*const selectImage = () => {
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
    };*/
  const selectImage = () => {
    ImagePicker.openPicker({
     //樺樺圖片大小
      width: picwidth,
      height: picheight,
      cropping: true
    }).then(image => {
      //console.log(image);
      const source = { uri: image.path };//response是選取的物件
      //Asset Object是內容物，然後他很坑紙船一個也會變陣列qq，所以要拿第一個人的uri
      // console.log('Response uri = ', response.assets[0].uri);
      //console.log(source);
      setImage(source);
    }).catch(e => {
      if (e.code !== 'E_PICKER_CANCELLED') {
        console.log(e);
        Alert.alert('Sorry, there was an issue attempting to get the image/video you selected. Please try again');
      }
    });
  };

  //發文
  const SubmitPost = async () => {
    const imageUrl = await uploadImage();//等他做完我才跑
    //console.log('imageUrl:', imageUrl);

    firestore()
      .collection('posts')
      .add({
        userid: user.uid,
        name: userdata.name,
        post: post,
        postImg: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
        Trip: trip,
        collected:0,
        userImg: userdata.userImg,
        //coomments:null,
      }).then(() => {
        console.log('Post add !');
        setPost(null);
        DeviceEventEmitter.emit('postSend');
        Alert.alert("成功發布");
        navigation.goBack();
      }).catch((error) => {
        console.log('Post Failed!', error);
      });
  }
  //上傳照片   
  const uploadImage = async () => {
    //console.log(image);
    if (image == null) { return null; }
    const uri = image.uri;
    //console.log('image= ', image.uri);
    let filename = uri.substring(uri.lastIndexOf('/') + 1);
    //console.log('filename= ', filename);
    //have change
    setUploading(true);
    // transferred(0);//轉圈圈

    const storageRef = storage().ref(`photos/${filename}`);//creat a folder
    const task = storageRef.putFile(uri);
    task.on('state_changed', taskSnapshot => {
      //file size<256 kb(very small size)" 所以我的上傳才會只有0跟100%
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    });

    try {
      //等待一下
      await task;
      //get download Url storageRef是自訂的路徑
      //上面的filename是我們自己設的
      const Url = await storageRef.getDownloadURL();
      console.log("url= ", Url)
      setUploading(false);
      setImage(null);
      return Url;
    } catch (e) {
      console.log(e);
      setImage(null);
      return null;
    }

  };
  //選行程
  const ChooseTrip = () => {
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
              style={{
                flex: 1,
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Iconcross
                name="cross"
                size={38}
                color={'#5f695d'}
                style={styles.TopiconStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.ToptextContainer}>
            <Text style={styles.ToptextStyle}>分享旅途</Text>
          </View>
          <View style={{flex: 1.2, height: '75%', alignItems:'center', justifyContent:'center'}}>
            {uploading ? (
              <View style={styles.cycleContainer}>
                {/* <Progress.Bar progress={transferred} width={300} />*/}
                {/*轉圈圈*/}
                <ActivityIndicator size='small' color='#2f2f2f' />
              </View>
            ) : 
            ((image||post||trip)?
            <TouchableOpacity onPress={SubmitPost} style={{borderRadius: 10, backgroundColor: '#5f695d', flex:1}}>
              <Text style={styles.TopbuttonText}>發布</Text>
            </TouchableOpacity>:
            <View style={{borderRadius: 10, backgroundColor: 'gray', flex:1}}>
              <Text style={styles.TopbuttonText}>發布</Text>
            </View>)}
          </View>
        </View>
      </View>
      <View style={styles.userpost}>
        <View style={styles.iconContainer}>
          {
           userdata.userImg==""? <Icons name={'person-circle-outline'} size={43} />
          :<Image
          roundAsCircle={true}
          resizeMode={'stretch'}
          style={{ margin:10,borderRadius: 25,height: 43, width: 43}}
          source={{uri: userdata.userImg}}
        />}
        </View>
        <View style={{ flexDirection: "column", justifyContent: 'center' }}>
          <Text style={styles.nameStyle}>{userdata.name}</Text>
          {/*(trip) ? <Text style={styles.tripStyle}>已匯入行程{trip.name}</Text> : null*/}
        </View>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView>
          {image != null ? <Image source={{ uri: image.uri }} style={{ height: 300, width: width }} /> : null}
          <TextInput style={styles.contentText}
            multiline
            //numberOfLines={4}
            value={post}
            onChangeText={(context) => setPost(context)}
            placeholder="在想些什麼呢?" />
        </ScrollView>

        {(trip) ?
          <View style={styles.tripContainer}>
            <View style={{
              flex: 1, alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
              <Icons name={"checkmark-circle-outline"} size={40} color={"green"} />
            </View>
            <View style={{
              flex: 3, alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
              <Text style={styles.tripStyle}>已匯入行程: {trip.name}</Text>
            </View>
          </View>
          : null}
      </View>
      {/*下方bar*/}
      <View style={styles.buttonbar}>
        <View style={styles.butContainer}>
          {/*圖片*/}
          <View style={styles.buticonContainer1}>
            <TouchableOpacity
              onPress={selectImage}
              style={{ flex: 1 }}>
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
              style={{ flex: 1 }}>
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
  tripContainer: {
    height: 70,
    borderRadius: 20,
    //borderWidth: 2,
    borderColor: '#f2f2f2',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#d8e4dd',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3,
    width: '100%',
    flexDirection: 'row',
  },
  tripStyle: {
    //color: "#2f2f2f",
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing:2,
  },

  //post
  topbar: {
    backgroundColor: '#e2e2e2',//'#F2F2F2',
    //#5f695d',
    flex: 1,
    //height: 50,
    borderColor: '#AAAAAA',
    borderBottomWidth: 1,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    //opacity: 0.9,
    paddingRight: 10,
  },
  Topcontainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  ToptextContainer: {
    flex: 3,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  ToptextStyle: {
    //left:150,
    top: '25%',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5f695d',
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    letterSpacing: 10,
    flex: 1,
  },
  TopiconStyle: {
    right: '10%'
  },
  TopiconContainer: {
    flex: 1.2,
    //width: 48,
    height: '100%',
    alignSelf: 'center',
    borderRadius: 30,
  },
  TopbuttonText: {
    fontWeight: '800',
    fontSize: 17,
    color: 'white',
    letterSpacing: 10,
    letterSpacing: 5,
    height: '70%',
    paddingRight: 5,
    alignSelf:'center',
    top: '20%',
  },
  cycleContainer: {
    top: 2,
    //justifyContent:'center',  
    //alignContent:'center',
  },
  //body
  container: {
    hight: '100%',
    backgroundColor: '#ffffff',
    flex: 1,
  },
  userpost: {
    flex: 1,
    flexDirection: 'row',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#5f695d',
    top: 8,
    letterSpacing: 8,
  },
  image: {
    width: '95%',
    height: '95%',
  },
  contentContainer: {
    flex: 10,
    padding: 6,
  },
  contentText: {
    fontSize: 18,
    left: 10,
    // color:"red",
  },
  nameStyle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#5f695d',
    left: 15,
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
    flex: 1,
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
    borderBottomWidth: 10,
  },
  butContainer: {
    flex: 1.8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#e2e2e2",
    flexDirection: 'row',
    justifyContent: 'center',
    //borderColor: '#000000',
    // borderBottomWidth:3,
  },
  buticonContainer1: {
    right: 100,
    top: 10,
  },
  buticonContainer2: {
    right: -70,
    top: 10,
  },
});

export default Post;
