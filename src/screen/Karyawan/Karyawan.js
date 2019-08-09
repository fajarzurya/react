import React, { Component } from 'react';
import { Container, Header, Left, Body, Button, Icon, Right, Title, Text, Content, Card, CardItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
export default class Karyawan extends Component {
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
              <Text>Cancel</Text>
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Grid>
            <Col>
              <Card>
                <CardItem button onPress={() => this.props.page.navigate('LKaryawan')}>
                  <Text>List Employee</Text>
                </CardItem>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardItem button onPress={() => alert("This is Card Footer")}>
                  <Text>Add Employee</Text>
                </CardItem>
              </Card>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}
  // constructor(props){
  //   // super(props);
  //   // this.state = {
  //   //   data_karyawan: []
  //   // }
  // }

  // componentDidMount(){
  //   //this.getKaryawan();
  // }

  // componentWillUnmount(){
  //   //console.log('Pindah Halaman');
  // }