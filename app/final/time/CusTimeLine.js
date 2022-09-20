import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import Icons2 from 'react-native-vector-icons/FontAwesome';
import Icons3 from 'react-native-vector-icons/FontAwesome5'
export default class Example extends Component {
  constructor(props){
    super(props)
    // this.onEventPress = this.onEventPress.bind(this)
    // this.renderSelected = this.renderSelected.bind(this)
    // this.renderDetail = this.renderDetail.bind(this)
    this.data = this.props.data;
    this.mode = this.props.mode;
  } 

  renderDetail(rowData, sectionID, rowID) {
    let title = <Text style={[styles.title]}>{rowData.name}</Text>
    var desc = null
    if(rowData.description && rowData.imageUrl)
      desc = (
        <View style={styles.descriptionContainer}>
          {/* <Image source={{uri: rowData.imageUrl}} style={styles.image}/> */}
          <Text style={[styles.textDescription]}>{rowData.distance}</Text>
          <View style={styles.iconContainer}>
            {(this.mode === "DRIVING") && (
          <Icons2
            name="car"
            size={33}
            color={'#D1DED7'}
            style={styles.iconStyle}
          />)}
          {(this.mode === "WALKING") && (
          <Icons3
            name="walking"
            size={33}
            color={'#D1DED7'}
            style={styles.iconStyle}
          />)}
          </View>
          <Text style={[styles.textDescription]}>{rowData.distance}</Text>
      </View>
      )

    return (
      <View style={{flex:1}}>
        {title}
        {desc}
      </View>
    )
  }
  render() {
    //'rgb(45,156,219)'
    return (
      <View style={styles.container}>
        <Timeline
          // renderDetail={this.renderDetail} 
          showTime = {false}
          style={styles.list}
          data={this.data}
          separator={false}
          circleSize={20}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{minWidth:52, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13, overflow: 'hidden'}}
          descriptionStyle={{color:'gray'}}
          options={{
            style:{paddingTop:5}
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
		paddingTop:65,
		backgroundColor:'white'
  },
  list: {
    flex: 1,
    marginTop:20,
  },
  title:{
    fontSize:16,
    fontWeight: 'bold'
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray'
  },
  descriptionContainer:{
    flexDirection: 'row',
    paddingRight: 50
  },
  iconContainer:{
    position: 'absolute',
    right: 75,
    top: 10,
    //backgroundColor: '#D1DED7',
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 30,
  },
});