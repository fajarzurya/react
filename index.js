/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import App from './App';
import {name as appName} from './app.json';


window.axios = require('axios');

AsyncStorage.getItem('login').then(token => {
    if(token != null){
        console.log(token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
    }
});

AppRegistry.registerComponent(appName, () => App);
