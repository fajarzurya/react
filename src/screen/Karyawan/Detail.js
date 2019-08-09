import React, { Component } from 'react';
import { Picker, Container, Content, Text, Button, Icon, Item, Input, Label, View } from 'native-base';
import HeaderQ from '../Component/HeaderQ';
import { DEFINE_API } from '../../config/network/api';
import {DeviceEventEmitter} from 'react-native';

export default class Detail extends Component{
    constructor(props){
        super(props);
        const {navigation}=this.props;
        // Get data dari variabel detail di file List.js
        this.state = {
            //detail: navigation.getParam('detail'),
            id: navigation.getParam('detail').id,
            nama: navigation.getParam('detail').nama,
            alamat:navigation.getParam('detail').alamat,
            jabatan: navigation.getParam('detail').jabatan_id,
            jabatanAPI: [],
        };
        console.log(this.state);
    }

    componentDidMount(){
        this.getJabatanAPI();
    }

    async updateKaryawan(){
        try{
            let formU = {
                id: this.state.id,
                nama: this.state.nama,
                alamat: this.state.alamat,
                jabatan_id: this.state.jabatan
            };
            let upd = await axios.post(DEFINE_API.UPD_EMP,formU);
            alert('Data Berhasil Diupdate');
            this.props.navigation.navigate('LKaryawan');
            DeviceEventEmitter.emit('event_update');
            this.props.navigation.goBack();
            console.log(upd);
        }catch(fail){
            console.log(fail.response);
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

    render(){
        return(
            <Container>
                {/* Memanggil komponen HeaderQ */}
                <HeaderQ title="Detail Karyawan" nav={this.props.navigation}/>
                <Content>
                    <Item>
                        <Input placeholder='Nama' onChangeText={(nama) => this.setState({nama})} value={this.state.nama}/>
                        <Icon active name='person' />
                    </Item>
                    <Item>
                        <Input placeholder='Alamat' onChangeText={(alamat) => this.setState({alamat})} value={this.state.alamat}/>
                        <Icon active name='home' />
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
                        <Button block info onPress={() => this.updateKaryawan()}>
                            <Icon active name='add' />
                            <Text>Update</Text>
                        </Button>
                    </View>
                    </Content>
            </Container>
        );
    }
}