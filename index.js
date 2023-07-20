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
global.API_key = 'YourGoogleMapApiKey'; //set your google map api key
global.WeatherUrl = 'YourWeatherServer'; //set your weather server
AppRegistry.registerComponent(appName, () => App);
