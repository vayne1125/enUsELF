import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('screen').width - 50;
const height = Dimensions.get('screen').height / 4;

// const Notice = ({modalVisible, onClose}) => {
//   return (
//     componentDidMount() {
//         setTimeout(() => {
//             onClose();
//         }, 2000);
//       }
//       console.log(entry),
//       <Modal
//         transparent={true}
//         visible={modalVisible}>
//         <View style={styles.modalBackGround}>
//           <View  style={styles.modalContainer}>
//             <Text>已加入清單</Text>
//           </View>
//         </View>
//       </Modal>
//   );
// };
export default class Notice extends Component {
  //     constructor(props) {
  //         super(props);
  //         this.state = {
  //           isShowNotice: true,
  //         };
  //       }
  //   componentDidMount() {
  //     setTimeout(() => {
  //         this.setState({
  //             isShowNotice: false,
  //         });
  //     }, 1000);
  //   }

  render() {
    console.log(this.props.entry);
    console.log('close?');
    if (this.props.noticeVisible == true) {
      setTimeout(() => {
        this.props.onClose();
      }, 1300);
    }
    return (
      <Modal transparent={true} visible={this.props.noticeVisible}>
        <View style={styles.modalBackGround}>
          <View style={styles.modalContainer}>
            <Text>已加入清單</Text>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  modalBackGround: {
    width: '100%',
    backgroundColor: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  modalContainer: {
    width: '95%',
    height,
    //height: 600,
    backgroundColor: 'white',
    //paddingHorizontal: 20,
    //paddingVertical: 20,
    padding: 5,
    borderRadius: 20,
    elevation: 20,
    top: 65,
    left: 10,
    //flex:1,
  },
});

//export default Notice;
