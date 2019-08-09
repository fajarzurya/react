import React, { Component } from 'react';
import { Container, Content, Item, Input, Icon, View, Button, Text, Label, Picker } from 'native-base';
import HeaderQ from '../Component/HeaderQ';
import { DEFINE_API } from '../../config/network/api';
export default class Add extends Component {
    constructor(props){
        super(props);
        this.state = {
            nama:'',
            alamat:'',
            mail:'',
            password:'',
            confirm:'',
            jabatan: 1,
            jabatanAPI: [],
        };
    }
    componentDidMount(){
        this.getJabatanAPI();
    }

    async storeKaryawan(){
        try{
            let formA = {
                name: this.state.nama,
                alamat: this.state.alamat,
                jabatan_id: this.state.jabatan,
                email: this.state.mail,
                password: this.state.password,
                c_password: this.state.confirm
            };
            let add = await axios.post(DEFINE_API.ADD_EMP,formA);
            alert('Data Berhasil disimpan');
            this.props.navigation.navigate('LKaryawan');
            //console.log(add);
        }catch(fail){
            console.log(fail);
        }
    }

    async getJabatanAPI(){
        try{
            let jabatan = await axios.get(DEFINE_API.GET_JBT);
            //console.log(jabatan);
            return this.setState({jabatanAPI: jabatan.data.data});
            //console.log(this.state.jabatanAPI);
        }catch(fail){
            console.log(fail);
        }
    }

    render() {
    return (
      <Container>
        <HeaderQ title="Add Employee" nav={this.props.navigation}/>
        <Content>
          <Item>
            <Input placeholder='Nama' onChangeText={(nama) => this.setState({nama})}/>
            <Icon active name='person' />
          </Item>
          <Item>
            <Input placeholder='Alamat' onChangeText={(alamat) => this.setState({alamat})}/>
            <Icon active name='home' />
          </Item>
          <Item>
            <Input placeholder='E-mail' onChangeText={(mail) => this.setState({mail})}/>
            <Icon active name='mail' />
          </Item>
          <Item>
            <Input placeholder='Password' secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
            <Icon active name='key' />
          </Item>
          <Item>
            <Input placeholder='Confirm Password' secureTextEntry={true} onChangeText={(confirm) => this.setState({confirm})}/>
            <Icon active name='key' />
          </Item>
          <Item>
            <Label>Jabatan : </Label>
            <Item picker>
                <Picker
                selectedValue={this.state.jabatan}
                onValueChange={(jabatan) => this.setState({jabatan})}
                >
                    {this.state.jabatanAPI.map(j => {
                        return(
                            <Picker.Item label={j.jabatan} value={j.id} key={j.id}/>
                        );
                    })}
                </Picker>
            </Item>
          </Item>
          <View style={{padding:10}}>
            <Button block info onPress={() => this.storeKaryawan()}>
                <Icon active name='add' />
                <Text>Tambah</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}