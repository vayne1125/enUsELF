/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';

global.API_key = 'YourGoogleMapApiKey'; //set your google map api key
global.WeatherUrl = 'YourWeatherServer'; //set your weather server
AppRegistry.registerComponent(appName, () => App);
