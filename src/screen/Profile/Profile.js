import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage'; //Package untuk Local Storage
import {DeviceEventEmitter} from 'react-native';  // Package untuk broadcast
export default class Profile extends Component {
  //Fungsi delete token dari local storage
  async destroyToken(){
    await AsyncStorage.removeItem('login');
    DeviceEventEmitter.emit('event_login','logout');
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>SINFO</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.destroyToken()}>
              <Text>Logout</Text>
            </Button>
          </Right>
        </Header>
        <Content>
            <Text>Selamat Datang Menu Profile</Text>
        </Content>
      </Container>
    );
  }
}