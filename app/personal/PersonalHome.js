import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
  TouchableOpacity,
  DeviceEventEmitter,
  Settings,
  ActivityIndicator,
} from 'react-native';
import {setGestureState} from 'react-native-reanimated/lib/reanimated2/NativeMethods';
import Icon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/Ionicons';
import firestore, { firebase } from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import PersonalTop from './PersonalTop';
import {AuthContext} from '../routes/AutoProvider';

const {width, height} = Dimensions.get('window');
const PersonalHome = ({navigation}) => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(false);
  const {user, logout} = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      setLoading(true);
      firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(doc => {
          setName(doc.data().name);
          setMail(doc.data().email);
          setPass(doc.data().password);
          setImg(doc.data().userImg);
        })
        .then(() => {
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    const listen = DeviceEventEmitter.addListener('userupdate', update => {
      console.log(update);
      setName(update.name);
      setPass(update.password);
      setLoading(false);
    });
    return () => listen.remove();
  }, []);

  const selectImage = async() => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true
    })
    .then(image  => {
      console.log(image);
      const source = { uri: image.path };
      uploadImage(source);
    }).catch(e => {
        console.log(e.code)
        if(e.code !== 'E_PICKER_CANCELLED'){
            Alert.alert('失敗','選擇圖片失敗，請稍後重試');
        }
    })
  };

  const uploadImage = async (source) => {
    if (!source) return;
    const uri = source.uri;
    console.log('image= ', uri);
    let filename = uri.substring(uri.lastIndexOf('/') + 1);
    console.log('filename= ', filename);
    //have change
    setLoading(true);
    // transferred(0);//轉圈圈
    const storageRef = storage().ref(`user/${filename}`);//creat a folder
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
        const Uri = await storageRef.getDownloadURL();
        if(user && Uri){
            console.log(source.uri);
            firestore().collection('users').doc(user.uid)
            .update({userImg:Uri})
            .then(()=>{setImg(Uri);setLoading(false);})
            .catch(e => {setLoading(false);})
        }
        console.log("url= ", Uri)
    }
    catch (e) {
        Alert.alert('失敗','選擇圖片失敗，請稍後重試');
        console.log(e);
        setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      {/*頂部*/}
      <View style={styles.topbar}>
        <PersonalTop />
      </View>
      <View style={styles.infoContainer}>
        {loading ? (
          <View style={styles.headContainer}>
            <ActivityIndicator
              animating={true}
              color={'#BEBEBE'}
              size={'large'}
            />
            <Text style={{alignSelf: 'center'}}>loading</Text>
          </View>
        ) : (
          <View style={styles.headContainer}>
            <View style={styles.iconContainer}>
                <View style={styles.img}>
                    {img? 
                    (<Image
                      roundAsCircle={true}
                      resizeMode={'stretch'}
                        source={{ uri: img }}
                        style={{ borderRadius: height*0.13,height: height*0.25, weight: height*0.3}}
                    />):
                    (<Icons
                        name={'person'}
                        size={120}
                        style={styles.infoIcon}
                    />)}
                </View>
              <View style={styles.editContainer}>
                <TouchableOpacity onPress={() => {selectImage()}}>
                  {/* <Text style={{fontSize: 15}}>編輯</Text> */}
                  <Icons name={'camera'} size={30} style={styles.camera} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.text}>{name}</Text>
            </View>
          </View>
        )}
        <View style={styles.chooseContainer}>
          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Collect', user);
              }}>
              <Text style={styles.editText}>收藏</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PersonalFile', {name, mail, pass});
              }}
              style={{flexDirection: 'row'}}>
              <View style={{flex: 6}}>
                <Text style={styles.editText}>編輯個人檔案</Text>
              </View>
              <View style={styles.rightIcon}>
                <Icon name={'chevron-right'} size={30} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HistoryHome');
              }}
              style={{flexDirection: 'row'}}>
              <View style={{flex: 6}}>
                <Text style={styles.editText}>歷史行程</Text>
              </View>
              <View style={styles.rightIcon}>
                <Icon name={'chevron-right'} size={30} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.spaceContainer}></View>
          <View style={styles.logoutContainer}>
            <View style={styles.logoutButtonContainer}>
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}>
                <Text style={styles.logoutText}>登出</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    hight: height,
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  topbar: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#AAAAAA',
  },
  infoContainer: {
    flex: 11.8,
    marginTop: '3%',
    //backgroundColor:'black',
  },
  headContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //top: 10,
  },
  iconContainer: {
    height: height*0.3,
    width: height*0.3,
    flexDirection: 'column',
    borderRadius: height*0.15,
    marginTop: '3%',
    flex: 4,
  },
  img: {
    height: height*0.25,
    width: height*0.3,
    borderRadius: height*0.13,
    backgroundColor:'white',
    alignSelf: 'center',
    alignContent:'center',
    justifyContent:'center',
    flex: 1,
  },
  infoIcon: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    alignSelf: 'center',
  },
  editContainer: {
    position: 'absolute',
    width: 40,
    height: 40,
    right: '7%',
    bottom: '0%',
    backgroundColor: 'rgba(163,173,168,0.3)',
    borderRadius: 20,
  },
  camera: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: '8%',
  },
  nameContainer: {
    flex: 1,
  },
  text: {
    alignSelf: 'center',
    fontSize: 22,
    top: 5,
    fontFamily:'SignikaNegative-SemiBold',
  },
  chooseContainer: {
    flex: 1.5,
    marginBottom: '20%',
  },
  buttonContainer: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    //alignItems: 'center',
    justifyContent: 'center',
    //borderRadius: 5,
    //marginTop: '1%',
    borderBottomWidth: 1,
    borderColor: '#AAAAAA',
  },
  spaceContainer: {
    //backgroundColor: 'white',
    flex: 2,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    //borderRadius: 5,
    //marginTop: '1%',
    //borderBottomWidth:1,
    //borderColor:'#AAAAAA',
  },
  logoutContainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonContainer: {
    backgroundColor: '#C0C0C0',
    width: '50%',
    height: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    margin: 8,
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3,
  },
  editText: {
    fontSize: 20,
    letterSpacing: 5,
    left: '5%',
    fontFamily: 'NotoSerifTC-Bold',
  },
  rightIcon: {
    flex: 1,
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 22,
    letterSpacing: 15,
    color: 'white',
    fontFamily: 'NotoSerifTC-Black',
    bottom: '20%',
  },
});
export default PersonalHome;
