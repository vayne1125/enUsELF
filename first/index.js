/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import MapHome from './app/map/MapHome'

AppRegistry.registerComponent(appName, () => MapHome);
