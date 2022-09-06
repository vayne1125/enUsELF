import React ,{useState,useContext,useEffect }from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  DeviceEventEmitter,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../routes/AutoProvider';
import CollectTop from './CollectTop'
//import Card from '../../media/Card';
import Card from './Card';
const width = Dimensions.get('screen').width;

const Collect =() =>{
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
  const [collect,setCollect]=useState([]); 
  //const [postname,setPostname]=useState([]); 
  const[changeCollect,setChangeCollect]=useState(false);
  const [loading, setLoading] = useState(false);
  // console.log('user',user);
  const fetchPosts = async()=>{
    setLoading(true);
       const list=[];
        //get collect post name
        await  firestore()
        .collection('users')
        .doc(user.uid)
        .collection('collect')
        .orderBy('collectTime','desc')
        .get()
        .then((querySnapshot)=>{
        //console.log('Total Posts:',querySnapshot.size);
        querySnapshot.forEach(doc=>{
            const {postId}=doc.data();
            list.push({
              postId
            });
          })
        })
        //console.log('list ',list);
       // console.log('postnem ',postname);
        const list2=[];
        //get post
        for await (let item of list) {
          await firestore().collection('posts').doc(item.postId).get()
          .then( async (snap) => {
             if(!snap.exists) {
                  console.log('no ', snap);
                 await firestore()
                  .collection('users')
                  .doc(user.uid)
                  .collection('collect')
                  .doc(item.postId)
                  .delete()
                  .then(() => {
                  console.log('no exist collect deleted!');
                  }).catch(e=>
                    console.log('error'))
             } else {
                console.log('有 ', snap);
                console.log('有 Data ', );
                const {userid,post,postImg,postTime,name,Trip}=snap.data();
                list2.push({
                  id:snap.id ,
                  userid,
                  name:name,
                  img: postImg,
                  content: post,
                  time:postTime,
                  Trip:Trip,
                });
                console.log('屋 ',list2);
             }
          })
        };
        setCollect(list2);
        console.log('list2=',list2);
        setLoading(false);
  }
//初始取值 
  useEffect(()=>{
        //setCollect(fetchPosts());
        fetchPosts();
        console.log('coll ',collect);
  },[]);

//取消收藏
  useEffect(()=>{
     fetchPosts();
  DeviceEventEmitter.emit('deleteCollect');
  setChangeCollect(false);
  },[changeCollect])
 
 const handleChenge = (postId) => {
  firestore()
  .collection('users')
  .doc(user.uid)
  .collection('collect')
  .doc(postId)
  .delete()
  .then(() => {
  console.log('User deleted!');
  }).catch(e=>
    console.log('error'))
  setChangeCollect(true);
 };

  return (
    <View style={styles.container}>
      {/*頂部*/}
      <View style={styles.topbar}>
        <CollectTop collect={collect}/>
      </View>

      {/*內容*/}
      {loading?
            <View style={{justifyContent:'center',flex:1}}>
                <ActivityIndicator
                    animating = {true}
                    color = {'#BEBEBE'}
                    size = {'large'}
                />
            </View>:
      <FlatList
       //columnWrapperStyle={{justifyContent:'space-between'}}
       showsVerticalScrollIndicator={false}
       contentContainerStyle={{
         marginTop: 25,
         paddingBottom: 80,
       }}
       numColumns={1}
       data={collect}
       renderItem={({item}) => <Card post={item} changecollect={handleChenge} />}></FlatList>
        }
      </View>
  );
};

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
    borderBottomColor: '#D1DED7',
    borderRightWidth: 3,
    borderRightColor: '#ffffff',
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
    width: 230,
    height: 140,
    top: 6,
    borderRadius: 10,
    left: 2,
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
  buttonContainer: {
    backgroundColor: '#fbb856', //較深黃
    //backgroundColor: '#ffc56b',//較淺黃
    //flex: 1,
    width: 120,
    alignSelf: 'flex-end',
    right: 7,
    bottom: 4,
    borderRadius: 25,
    height: 32,
    //flexDirection: 'row',
  },
  buttonText: {
    fontWeight: '800',
    fontSize: 16,
    color: '#6b5238',
    top: 6,
    letterSpacing: 10,
    left: 7,
  },
  buttonContainer2: {
    backgroundColor: '#E3E3E3', //較淺黃
    //flex: 1,
    width: 120,
    alignSelf: 'flex-end',
    right: 7,
    bottom: 10,
    borderRadius: 25,
    height: 32,
    //flexDirection: 'row',
  },
  buttonText2: {
    fontWeight: '800',
    fontSize: 16,
    top: 6,
    letterSpacing: 10,
    left: 7,
  },
  imageContainer: {
    flex: 3,
    alignItems: 'center',
    padding: 3,
  },
  nameStyle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#5f695d',
    left: 15,
    letterSpacing: 1,
  },
  info: {
    flex: 2,
  },
  starStyle: {
    flex: 2,
    flexDirection: 'row',
    alignSelf: 'center',
    left: 5,
    top: 4,
    //color:'#f5f6a3',
  },
});
export default Collect;