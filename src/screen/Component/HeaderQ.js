import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
export default class HeaderQ extends Component {
      render() {
        return (
            <Header>
              <Left>
                <Button transparent onPress={() => this.props.nav.goBack()}>
                  <Icon name='arrow-back' />
                </Button>
              </Left>
              <Body>
                <Title>{this.props.title}</Title>
              </Body>
              <Right/>
            </Header>
        );
      }
}