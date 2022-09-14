import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import { Marker } from 'react-native-maps';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class CustomMarker extends PureComponent {
    constructor() {
        super();
        this.state = {
            tracksViewChanges: true,
        };
    }
    stopTrackingViewChanges = () => {
        this.setState(() => ({
            tracksViewChanges: false,
        }));
    }
    render() {
        const { tracksViewChanges } = this.state;
        const  marker  = this.props.data;

        return (
            <Marker
                tracksViewChanges={tracksViewChanges}
                key={marker.type + (marker.id).toString()}
                coordinate={
                    (this.props.color === 'green')?
                    { latitude: marker.lat, longitude: marker.lng }:
                    { latitude: marker.location.lat, longitude: marker.location.lng }
                }
                onPress={this.props.onPressHandler}
            >
                <View style={styles.markerCss}>
                    <Text style={styles.markerText}>{marker.name}</Text>
                    <Image
                        onLoad={this.stopTrackingViewChanges}
                        fadeDuration={0}
                        style={styles.markerImg}
                        source={
                            ((this.props.color === 'green') && require('../../assets/pin/green.png')) ||
                            ((this.props.color === 'red') && require('../../assets/pin/red.png')) ||
                            ((this.props.color === 'blue') && require('../../assets/pin/blue.png')) ||
                            ((this.props.color === 'yellow') && require('../../assets/pin/yellow.png'))
                        } 
                        />
                </View>
            </Marker>
        );
    }
}
{/* {(mainRoute).map((marker) => (
          <Marker
            //pinColor='green'
            tracksViewChanges={false}
            key={marker.type + (marker.id).toString()}
            coordinate={{ latitude: marker.lat, longitude: marker.lng }}
            onPress={(e) => {
              setModalCanPress(false);
              setModalVisible(!modalVisible);
              setModalEntry({
                type: marker.type,
                date: marker.date,
                id: marker.id,
                name: marker.name,
                info: marker.info,
                address: marker.address,
                star: marker.star,
                time: marker.time,
                city: marker.city,
                region: marker.region,
              });
            }}
          >
            <View style={styles.markerCss}>
              <Text style={styles.markerText}>{marker.name}</Text>
              <Image style={styles.markerImg} source={require('../../assets/pin/green.png')} />
            </View>
          </Marker>
        ))} */}

const styles = StyleSheet.create({
    markerCss: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerText: {
        color: '#5f695d',
        fontSize: 15,
        fontWeight: "bold",
    },

});
