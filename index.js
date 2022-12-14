/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import MapHome from './app/map/MapHome'
import ItineraryHome from './app/final/Share'
import Share from './app/final/ItineraryHome'
import Itmes from './app/list/Items'
// import CollectHome from './app/personal/collect/CollectHome'
import HistoryHome from './app/personal/history/HistoryHome'
global.API_key = 'AIzaSyCEP70zS446CDugv9m7x-4xzvqyhvuIU3U'; //set your api key
global.WeatherUrl = 'https://6e6a-140-121-198-98.jp.ngrok.io/weather';
AppRegistry.registerComponent(appName, () => App);
