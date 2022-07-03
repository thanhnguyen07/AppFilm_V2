import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import { User } from '../Redux/actions';
import { Films } from '../Redux/actions';
import { Cast } from '../Redux/actions';
import { Cmts } from '../Redux/actions';
import axios from 'axios';
import { url } from '../components/url'

const Token = ({navigation}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${url}/films/data`)
            .then((res) =>{
                const dataFilms = res.data;
                dispatch(Films(dataFilms))
            })
        axios.get(`${url}/cast/data`)
            .then((res) =>{
                const dataCast = res.data;
                dispatch(Cast(dataCast))
            })
        axios.get(`${url}/cmts/data`)
            .then((res) =>{
                const dataCmts = res.data;
                dispatch(Cmts(dataCmts))
            })
},[])
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('idUser')
            const dataUser = JSON.parse(jsonValue)
            // console.log(dataUser);
            if(dataUser !== null) {
                const _id = dataUser._id;
                const emailUser = dataUser.email;
                const nameUser = dataUser.name;
                const listPlay = dataUser.listPlay;
                const listCmt = dataUser.listCmt;
                const listLike = dataUser.listLike;
                const listHistory = dataUser.listHistory;
            
                dispatch(User(_id, emailUser, nameUser, listCmt, listLike, listHistory, listPlay))
                navigation.navigate('HomeTab', { screen: 'HomeScreen' })
            } else{           
                navigation.navigate('FirstScreen');
            }
        } catch(e) {
            // error reading value
        }
    }
    getData()

    return (
        <View style= {styles.container}>
            {console.log('render token')}
            <ActivityIndicator size='large'/>
        </View>
    )
}
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center"
        },
    })
export default Token