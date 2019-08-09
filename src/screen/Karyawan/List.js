import React, { Fragment, Component } from 'react';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base';
import HeaderQ from '../Component/HeaderQ';
import { DEFINE_API } from '../../config/network/api';
import {ActivityIndicator, RefreshControl, Alert } from 'react-native'; //Package untuk Animasi Loading
import AsyncStorage from '@react-native-community/async-storage';
import {DeviceEventEmitter} from 'react-native';
export default class ListKaryawan extends Component {
    constructor(props){
        //React punya 2 variabel 'props' dan 'state'
        super(props); //variabel props untuk menampung data statis
        const {navigation} = this.props;
        this.state = { //variabel state untuk menampung data dinamis
          data_karyawan: [], //array kosong
          refresh: false, 
        }
        DeviceEventEmitter.addListener('event_update',() => {
          console.log('Listen Update!!');
          this.getKaryawanAsync();
        });
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
              console.log(fail);
          }
      }

      //Fungsi Refresh
      refresh(){
        this.setState({refresh:true}); //animasi refresh muncul
        this.getKaryawanAsync();
      }

      // Alert Delete
      alertDel(params){
        Alert.alert(
          'Warning!',
          `Anda yakin menghapus data ini ${params.nama} ?`, //menggabungkan string dan syntax js dengan petik (``)
          [
            //{text: 'Tidak', onPress: () => console.log('Ask me later pressed')},
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => this.deleteData(params.id)},
          ],
          {cancelable: false},
        );
      }

      async deleteData(params){
        let formDel = {id: params}; //var kiri (id) sesuai dengan field backend, var kanan sesuai param
        let token = await AsyncStorage.getItem('login'); //mengambil token 'login' dari Local Storage
        // let head = { //header sebagai perantara ke API
        //   headers: { //var kiri (headers) sesuai dengan field backend
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${token}`
        //   }
        // };
        try{
          if(token != null){
            //let hapus = await axios.post(DEFINE_API.DEL_EMP, formDel, head); //eksekusi delete 
            let hapus = await axios.post(DEFINE_API.DEL_EMP, formDel);
            console.log(hapus);
            this.getKaryawanAsync();
          }else{
            alert('Anda Belum Login');
            setTimeout(() => {this.props.navigation.navigate('Login')},500);
          }
          
        }catch(fail){
          console.log(fail);
        }
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
                          <Text note>{a.email}</Text>
                          <Text note>{a.jabatan}</Text>
                        </Body>
                        <Right>
                          <Button bordered danger onPress={() => this.alertDel(a)}>
                            <Text>Delete</Text>
                          </Button>
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
              <RefreshControl refreshing={this.state.refresh} onRefresh={() => this.refresh()}/>
            }>
              <List>
                {this.renderListK()}
              </List>
            </Content>
          </Container>
        );
      }
}