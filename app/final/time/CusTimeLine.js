import React, { Component } from 'react';
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
export default class CusTimeLine extends Component {
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
    if (this.state.selected)
      props.pressHandler(this.state.selected);
    //   return <Text style={{ marginTop: 10 }}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
  }

  renderDetail(rowData, sectionID, rowID) {
    var title = null;
    if (rowData.name === "你的位置") {
      title = <Text style={styles.title}>{rowData.name}</Text>
    } else if (rowData.type === "hot" || rowData.type === "hol" || rowData.type === "shop") {
      title = (
        <View style={styles.titleContainer}>
          <Image
            style={styles.image}
            source={MapImg[rowData.type + rowData.id.toString()]}
          />
          <Text style={styles.title}>{rowData.name}</Text>
        </View>
      )
    } else {
      title = (
        <View style={styles.titleContainer}>
          <Image
            style={styles.image}
            source={ThemeImg[rowData.name]}
          />
          <Text style={styles.title}>{rowData.name}</Text>
        </View>
      )
    }

    var desc = null;
    if(rowData.distance != -1){
    if(this.mode === "DRIVING"){
      desc = (
        <View style={styles.descriptionContainer}>
          <View style={styles.itemContainer}>
          <Icons2
            name="car"
            size={25}
            color={'#5f695d'}
            style={styles.iconStyle}
          />  
          <Text style={styles.textDescription}>{rowData.distance}</Text>
          </View>
          <View style={styles.itemContainer}>
          <Icons
            name="time-outline"
            size={30}
            color={'#5f695d'}
            style={styles.iconStyle}
          />  
          <Text style={styles.textDescription}>{rowData.duration}</Text>
          </View>
        </View>
      )
    }else{
      desc = (
        <View style={styles.descriptionContainer}>
          <View style={styles.itemContainer}>
          <Icons3
            name="walking"
            size={27}
            color={'#5f695d'}
            style={styles.iconStyleForWalk}
          />  
          <Text style={styles.textDescription}>{rowData.distance}</Text>
          </View>
          <View style={styles.itemContainer}>
          <Icons
            name="time-outline"
            size={30}
            color={'#5f695d'}
            style={styles.iconStyle}
          />  
          <Text style={styles.textDescription}>{rowData.duration}</Text>
          </View>
        </View>
      )
    }
  }

    return (
      <View style={{ flex: 1 }}>
        {title}
        {desc}
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSelected()}
        <Timeline
          style={styles.list}
          data={this.data}
          circleSize={20}
          //showTime={false}
          circleColor='#2E8B57'
          lineColor='#227700'
          descriptionStyle={{ color: 'gray'}}
          options={{
            style: { paddingTop: 5 }
          }}
          columnFormat='two-column'
          onEventPress={this.onEventPress}
          renderDetail={this.renderDetail}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //justifyContent:'center',
    //alignItems:'center',
    flex: 1,
    padding: 20,
    //paddingTop: 65,
    backgroundColor: 'white'
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  descriptionContainer: {
    flexDirection: 'column',
    paddingRight: 50
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textDescription: {
    fontSize: 16,
    marginLeft: 10,
    color: 'gray'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },itemContainer:{
    alignItems:'center',
    marginTop: 10,
    flex:1,
    flexDirection: 'row',
  },iconStyleForWalk:{
    marginLeft: 5,
  }
});