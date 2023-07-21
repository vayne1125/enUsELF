import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';

import Icons from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('screen').width/2;
const height = Dimensions.get('screen').height / 4;


export default class NoticeForMap extends PureComponent {

  render() {
    if (this.props.noticeVisible == true) {
      setTimeout(() => {
        this.props.onClose();
      }, 1200);
    }
    return (
      <Modal transparent={true} visible={this.props.noticeVisible}>
        <View style={styles.modalBackGround}>
          <View style={styles.modalContainer}>
            <Icon2 name={"checkmark-circle-outline"} size={70} color={"green"}/>
            {
              this.props.isAdd?
              <Text style={styles.textStyle}>已成功加入行程表</Text>:
              <Text style={styles.textStyle}>已成功移除景點</Text>
            }
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
    justifyContent:"center",
    alignItems:"center",
  },
  modalContainer: {
    width: '80%',
    height,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    elevation: 20,
    justifyContent:"space-around",
    padding:25,
    alignItems:"center",
  },
  textStyle:{
    fontSize:25,
  }
});
