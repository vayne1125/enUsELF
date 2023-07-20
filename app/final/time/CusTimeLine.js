import React, { Component,PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
//Ionicons
import Icons from 'react-native-vector-icons/Ionicons';
import Icons2 from 'react-native-vector-icons/FontAwesome';
import Icons3 from 'react-native-vector-icons/FontAwesome5'
import ThemeImg from '../../data/ThemeImg';
import MapImg from '../../data/MapImg';
export default class CusTimeLine extends PureComponent {
  constructor(props) {
    super(props)
    this.onEventPress = this.onEventPress.bind(this)
    this.renderSelected = this.renderSelected.bind(this)
    this.renderDetail = this.renderDetail.bind(this)
    this.data = props.data;
    this.mode = props.mode;
    this.state = { selected: null }
  }

  onEventPress(data) {
    this.setState({ selected: data })
  }

  renderSelected() {
    //console.log(this.props);
    if (this.state.selected != null && this.state.selected.name != "初始位置" ){
      //console.log("this.state.selected");
      this.props.onPress(this.state.selected);
    }
  }

  renderDetail(rowData, sectionID, rowID) {
    var title = null;
    title = <Text style={styles.title}>{rowData.name}</Text>

    var desc = null,desc2 = null;
    
    if(rowData.name != "初始位置"){
      if (rowData.type === "hot" || rowData.type === "hol" || rowData.type === "shop") {
        desc = (
          <View style={styles.titleContainer}>
            <Image
              style={styles.image}
              source={MapImg[rowData.type + rowData.id.toString()]}
            />
          </View>
        )
      } else {
        desc = (
          <View style={styles.titleContainer}>
            <Image
              style={styles.image}
              source={ThemeImg[rowData.name]}
            />
          </View>
        )
      }
    }
    if(rowData.distance != -1){
    if(this.mode === "DRIVING"){
      desc2 = (
        <View style={styles.descriptionContainer}>
          {title}
          <View style={styles.itemContainer}>
          <Icons2
            name="car"
            size={20}
            color={'#5f695d'}
            style={styles.iconStyle}
          />  
          <Text style={styles.textDescription}>{rowData.distance}</Text>
          </View>
          <View style={styles.itemContainer}>
          <Icons
            name="time-outline"
            size={25}
            color={'#5f695d'}
            style={styles.iconStyle}
          />  
          <Text style={styles.textDescription}>{rowData.duration}</Text>
          </View>
        </View>
      )
    }else{
      desc2 = (
        <View style={styles.descriptionContainer}>
          <View style={styles.itemContainer}>
          <Icons3
            name="walking"
            size={22}
            color={'#5f695d'}
            style={styles.iconStyleForWalk}
          />  
          <Text style={styles.textDescription}>{rowData.distance}</Text>
          </View>
          <View style={styles.itemContainer}>
          <Icons
            name="time-outline"
            size={25}
            color={'#5f695d'}
            style={styles.iconStyle}
          />  
          <Text style={styles.textDescription}>{rowData.duration}</Text>
          </View>
        </View>
      )
    }
  }else{
    desc2 = <View style = {{justifyContent:'center'}}>{title}</View>;
  }

    return (
      <View style={{ flex: 1 }}>
        
        <View style = {styles.decStyles}>
        {desc}
        {desc2}
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {/* {this.renderSelected()} */}
        <Timeline
          style={styles.list}
          data={this.data}
          circleSize={20}
          circleColor='#2E8B57'
          lineColor='#227700'
          descriptionStyle={{ color: 'gray'}}
          options={{
            style: { paddingTop: 5 }
          }}
          onEventPress={this.onEventPress}
          renderDetail={this.renderDetail}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft:-50,
    padding: 20,
    backgroundColor: 'white'
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    marginLeft:10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  descriptionContainer: {
    flexDirection: 'column',
    paddingRight: 50,
  },
  image: {
    width: 130,
    height: 90,    
    borderRadius: 20
  },
  textDescription: {
    fontSize: 14,
    marginLeft: 10,
    color: 'gray'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer:{
    alignItems:'center',
    marginTop: 10,
    flex:1,
    marginLeft:15,
    flexDirection: 'row',
  },
  iconStyleForWalk:{
    marginLeft: 5,
  },
  decStyles:{
    flexDirection: 'row',
    marginTop: 35,
  }
});