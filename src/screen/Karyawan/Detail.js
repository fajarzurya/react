import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Left, Body, Thumbnail, Text, Button, Icon } from 'native-base';
import HeaderQ from '../Component/HeaderQ';

export default class Detail extends Component{
    constructor(props){
        super(props);
        const {navigation}=this.props;
        // Get data dari variabel detail di file List.js
        this.state = {
            detail: navigation.getParam('detail'),
        };
    }

    render(){
        return(
            <Container>
                {/* Memanggil komponen HeaderQ */}
                <HeaderQ title="Detail Karyawan" nav={this.props.navigation}/>
                <Content>
                <Card style={{flex: 0}}>
                    <CardItem>
                    <Left>
                        <Thumbnail source={{uri: this.state.detail.image}} />
                        <Body>
                        <Text>{this.state.detail.nama}</Text>
                        <Text note>{this.state.detail.email}</Text>
                        </Body>
                    </Left>
                    </CardItem>
                    <CardItem>
                    <Left>
                        <Button transparent textStyle={{color: '#87838B'}}>
                        <Icon name="logo-github" />
                        <Text>1,926 stars</Text>
                        </Button>
                    </Left>
                    </CardItem>
                </Card>
                </Content>
            </Container>
        );
    }
}