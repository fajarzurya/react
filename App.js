import React from "react";
import Router from './src/config/router/playmaker';

window.axios = require('axios');

export default class App extends React.Component{
  render(){
    return(<Router/>);
  }
}