import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Text } from 'native-base';
export default class Home extends Component {
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
            <Button transparent>
              <Icon name='search' />
            </Button>
            <Button transparent>
              <Icon name='heart' />
            </Button>
            <Button transparent>
              <Icon name='more' />
            </Button>
          </Right>
        </Header>
        <Content>
            <Text>Selamat Datang HOME</Text>
        </Content>
      </Container>
    );
  }
}