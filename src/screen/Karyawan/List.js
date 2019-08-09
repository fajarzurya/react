import React, { Fragment, Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import HeaderQ from '../Component/HeaderQ';
import { DEFINE_API } from '../../config/network/api';
import {ActivityIndicator, RefreshControl } from 'react-native'; //Package untuk Animasi Loading

export default class ListKaryawan extends Component {
    constructor(props){
        //React punya 2 variabel 'props' dan 'state'
        super(props); //variabel props untuk menampung data statis
        const {navigation} = this.props;
        this.state = { //variabel state untuk menampung data dinamis
          data_karyawan: [], //array kosong
          refresh: false, 
        }
      }
    
    // Get data dari API dengan metode Promise
      getKaryawanPromise(){
        axios.get(DEFINE_API.GET_EMP)
        .then(response => {
          this.setState({data_karyawan: response.data.data}); //Set data dari API ke variabel data karyawan
          console.log(this.state.data_karyawan);
        })
      }
    
    //   Get data dari API dengan metode Async
      async getKaryawanAsync(){
          try{
              let response = await axios.get(DEFINE_API.GET_EMP);
              return this.setState({data_karyawan: response.data.data, refresh: false}); //Set data dari API ke variabel data karyawan
          }catch(fail){
              console.log(fail.response);
          }
      }

      //Fungsi Refresh
      Refresh(){
        this.setState({refresh:true}); //animasi refresh muncul
        this.getKaryawanAsync();
      }

    //   LifeCycle React ketika halaman Mount
      componentDidMount(){
        // this.getKaryawanPromise();
        this.getKaryawanAsync();
      }
    
    //   LifeCycle React ketika halaman sudah di Unmount
      componentWillUnmount(){
        console.log('Pindah Halaman');
      }
    
      renderListK(){
        if(this.state.data_karyawan.length==0){
            /* Memunculkan Loading */
            return(
                <ActivityIndicator size='large' color='#0F68EB'/>
            );
        }else{
            return(
                <Fragment>
                    {/* Looping Data dari API yang ditampung di variabel data karyawan  */ }
                    {this.state.data_karyawan.map(a => { 
                    return(
                      <ListItem avatar key={a.id} onPress={() => this.props.navigation.navigate('DKaryawan',{detail: a})}>
                        <Left>
                          <Thumbnail source={{ uri: a.image}} />
                        </Left>
                        <Body>
                          <Text>{a.nama}</Text>
                          <Text note>{a.email}}</Text>
                        </Body>
                        <Right>
                          <Text note>{a.jabatan}</Text>
                        </Right>
                      </ListItem>
                    );
                  })}
                </Fragment>
              );
        }
      }

      render() {
        return (
          <Container>
              {/* Memanggil komponen HeaderQ */}
            <HeaderQ title="List Employee" nav={this.props.navigation}/>
            <Content refreshControl={
              // Memanggil komponen refreshcontrol
              <RefreshControl refreshing={this.state.refresh} onRefresh={() => this.Refresh()}/>
            }>
              <List>
                {this.renderListK()}
              </List>
            </Content>
          </Container>
        );
      }
}