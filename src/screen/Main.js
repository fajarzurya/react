import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Karyawan from './Karyawan/Karyawan';
import AsyncStorage from '@react-native-community/async-storage';
import {DeviceEventEmitter} from 'react-native';
export default class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeNav: 1,
      token: null
    }
    //mendengarkan ketika ada event login berjalan dan akan melakukan check token
    DeviceEventEmitter.addListener('event_login',(status) => {
      console.log('Listen!!', status);
      this.checkToken();
      this.gantiPage(1);
      if(status == 'logout'){
        this.props.navigation.navigate('Login');
      }
    }) 
  }
  
  componentDidMount(){
    this.checkToken();
  }

  // Function untuk check token
  async checkToken(){
    try{
      let token = await AsyncStorage.getItem('login'); //menyimpan token dari field login Local Storage AsyncStorage
      //if(token != null){
        this.setState({token}); //menyipan token ke variabel state 't'
      //}
    }catch(fail){
      console.log(fail);
    }
  }

//  Fungsi jika Menu Profile harus melalui Menu Login dahulu untuk membuka 
  async gantiPage(activeNav){
    if(activeNav == 3){
      console.log(this.state.token);
      if(this.state.token == null){
        return this.props.navigation.navigate('Login');
      }
    }
    return this.setState({activeNav});
  }
  //Fungsi untuk mengganti halaman 
  renderFooter(){
    switch(this.state.activeNav){
      case 1:
        return(<Home page={this.props.navigation}/>);
      case 2:
        return(<Karyawan page={this.props.navigation}/>);
      case 3:
        return(<Profile page={this.props.navigation}/>);
    }
  }

  render() {
    return (
      <Container>
        {this.renderFooter()}
        <Footer>
          <FooterTab>
            <Button vertical active={this.state.activeNav == 1} onPress={() => this.gantiPage(1)}>
              <Icon active type="FontAwesome" name="home" />
              <Text>Umah</Text>
            </Button>
            <Button vertical active={this.state.activeNav == 2} onPress={() => this.gantiPage(2)}>
              <Icon type="FontAwesome" name="users" />
              <Text>Karyawan</Text>
            </Button>
            {/* <Button vertical active={this.state.nyala == 3} onPress={() => this.setState({nyala: 3})}> */}
            <Button vertical active={this.state.activeNav == 3} onPress={() => this.gantiPage(3)}>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}