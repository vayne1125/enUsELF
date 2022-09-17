import React, { PureComponent, useState } from 'react';
import { Image } from 'react-native';
import { Marker } from 'react-native-maps';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

const CustomMarker =({data, color,onPressHandler})=>{
    const stopTrackingViewChanges = () => {
        setTracksViewChanges(false);
        // console.log("false");
    }
        //const { tracksViewChanges } = this.state;
        const [tracksViewChanges,setTracksViewChanges] = useState(true);
        const  marker  = data;
        //console.log(marker.type + (marker.id).toString());
        return (
            <Marker
                tracksViewChanges={tracksViewChanges}
                key={marker.type + (marker.id).toString()}
                coordinate={
                    {latitude: marker.lat, longitude: marker.lng }
                }
                onPress={onPressHandler}
            >
                <View style={styles.markerCss}>
                    <Text style={styles.markerText}>{marker.name}</Text>
                    <Image
                        onLoad={stopTrackingViewChanges}
                        //onLoad={setTracksViewChanges(false)}
                        fadeDuration={0}
                        style={styles.markerImg}
                        source={
                            ((color === 'green') && require('../../assets/pin/green.png')) ||
                            ((color === 'red') && require('../../assets/pin/red.png')) ||
                            ((color === 'blue') && require('../../assets/pin/blue.png')) ||
                            ((color === 'yellow') && require('../../assets/pin/yellow.png'))
                        } 
                        />
                </View>
            </Marker>
        );
    }
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
export default CustomMarker;