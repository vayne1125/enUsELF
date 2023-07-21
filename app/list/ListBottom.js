import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import { CheckBox } from '@rneui/themed';
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../routes/AutoProvider';
const ListBottom = () => {
    const {user} = useContext(AuthContext);
    const [check, setCheck] = useState(false);
    const [nocheck, setNocheck] = useState(true);
    const [empty, setEmpty] = useState(true);

    const getItemsCount = async () => {
      try {
        if (user) {
          const users = firestore().collection('users').doc(user.uid);
          const querySnapshot = await users.collection('list').get();
          let count = 0;
          let items = 0;
          querySnapshot.forEach((doc) => {
            if (doc.data().check) items++;
            count++;
          });
  
          setCheck(items === count);
          setNocheck(items ? false : true);
          setEmpty(count ? false : true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
    const listen = DeviceEventEmitter.addListener('items', () => {
      getItemsCount();
    });
    return () => listen.remove();
  }, []);

  const update = async () => {
    try {
      if (user) {
        const users = firestore().collection('users').doc(user.uid);
        const querySnapshot = await users.collection('list').get();
        let count = 0;

        querySnapshot.forEach((doc) => {
          doc.ref.update({ check: !check });
          count++;
        });

        if (count) {
          setCheck(!check);
          setNocheck(check ? true : false);
        }

        DeviceEventEmitter.emit('allcheck', check);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style = {styles.Container}>
        {
          empty?
          <View style={styles.ChanceContainer}/>:
          <View style={styles.ChanceContainer}>
            <><CheckBox
              title="全選"
              textStyle={styles.ChanceText} 
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={check}
              onPress={() => {
                  if(user){update();}        
              }}/></>
          </View>
        }
        {
          nocheck?
          <View style={styles.NoContainer}>
            <Text style={styles.OkText}>完成</Text> 
          </View>:
          <View style={styles.OkContainer}>
            <TouchableOpacity onPress={()=>{DeviceEventEmitter.emit('gotomap')}}>
              <Text style={styles.OkText}>完成</Text> 
            </TouchableOpacity>
          </View>
        }
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#AAAAAA',
    backgroundColor: '#ffffff',
    borderTopLeftRadius:50,
    borderTopRightRadius:40,
  },
  ChanceContainer: {
    backgroundColor: '#ffffff',
    flex: 0.55,
    alignItems:'flex-start',
    justifyContent:'center',
    padding:2,
    borderTopLeftRadius:40,
    borderTopRightRadius:20,
  },
  ChanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
    letterSpacing: 6,
  },
  OkContainer: {
    backgroundColor: '#88bd80',
    flex: 0.4,
    padding:5,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    height:'75%',
    borderRadius:30,

    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3,
  },
  OkText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 10,
  },
  NoContainer:{
    backgroundColor: 'gray',
    flex: 0.4,
    padding:5,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    height:'75%',
    borderRadius:30,

    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3,
  }
});

export default ListBottom;