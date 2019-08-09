import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Footer, Button, FooterTab, Text, View } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage'; 
import { DEFINE_API } from '../../config/network/api';
import HeaderQ from '../Component/HeaderQ';
import {DeviceEventEmitter} from 'react-native';
export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  async componentDidMount(){
    let token = await AsyncStorage.getItem('login');
    console.log(token);
  }
// Post data username dan password ke API
  async storeLogin(){
      try{
        //Mengambil data dari variabel state untuk disimpan ke variabel API (email & password)
        let formD = {
          email: this.state.username, 
          password: this.state.password,
        }
        //Posting data 
        let login = await axios.post(DEFINE_API.LOGIN,formD);
        let token = login.data.success.token;
        //Menyimpan token ke variabel login dengan media AsyncStorage
        await AsyncStorage.setItem('login',token);
        // Broadcast dengan nama event login
        DeviceEventEmitter.emit('event_login','login');
        // Redirect ke Menu Main
        this.props.navigation.navigate('Main');
        console.log('Sukses!! '+ token);
      }catch(fail){
        console.log(fail);
      }
  }

  render() {
    return (
      <Container>
        <HeaderQ title="Login" nav={this.props.navigation}/>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={(username) => this.setState({username})}/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input onChangeText={(password) => this.setState({password})} secureTextEntry={true}/>
            </Item>
          </Form>
          <View style={{padding:10}}>
            <Button block info onPress={() => this.storeLogin()}>
                <Text>Sign In</Text>
            </Button>
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button>
              <Text>Register</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}