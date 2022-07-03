import { View, Text, SafeAreaView, 
    StyleSheet, ImageBackground,
    Image, TouchableOpacity,
} from 'react-native'
import React, {useEffect, useState} from 'react'
import BackGround from '../Assets/Images/background.png';
import IconMovie from '../Assets/Images/IconMovie.png';
import { useDispatch, useSelector} from 'react-redux';
import { Films } from '../Redux/actions';
import { Cast } from '../Redux/actions';
import { Cmts } from '../Redux/actions';
import axios from 'axios';
import {url} from '../components/url';

const FirstScreen = ({navigation}) => {
    const [dataFilms, setDataFilms] = useState([]);
    // const dataStore = useSelector((state)=> state);
    // console.log('dataStore first: ', dataStore)
    const dispatch = useDispatch();
    // console.log('Data Films: ',dataFilms);
    useEffect(() => {
        axios.get(`${url}/films/data`)
            .then((res) =>{
                const dataFilms = res.data;
                setDataFilms(dataFilms);
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
  return (
    <View style = {styles.container}>
        <View style = {styles.ViewBackGround}>
            <ImageBackground 
            source={BackGround}
            resizeMode = 'stretch'
            style = {styles.BackGround}>
            </ImageBackground>
            <View style = {styles.TitleIcon}>
                <Image 
                source={IconMovie}
                style={{ width: 30, height: 30 }}
                />
                <Text style={styles.TextTitle}> MOVIE</Text>
            </View>             
        </View>
        <View style = {styles.ViewLogin}>
            <View style = {styles.ViewText}>
                <Text style = {styles.Text} >By creating an account you get access to an unlimited number of exercises</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}
            style = {styles.ButtonSignIn}>
                <Text style={styles.TextSignIn}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}
             style = {styles.ButtonSignUp}>
                <Text style={styles.TextSignUp}>Sign Up</Text>
            </TouchableOpacity>
            <View style = {styles.Line}></View>
            <TouchableOpacity style = {styles.ViewSignFacebookButton}>
            <Text style={styles.TextLoginFb}>Sign in with Facebook</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ViewBackGround: {
        flex: 1,
        
    },
    BackGround: {
        height: "95%",
        opacity: 0.2,
        shadowOpacity: 5,
        shadowOffset: {width: 0,height: 10}
    },
    TitleIcon: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        height: "11.6%",
        width: "100%",
        position: "absolute",
        bottom: 10,
    },
    TextTitle: {
        fontSize: 20,
    },
    ViewLogin: {
        flex: 1.1,
    },
    ViewText: {
        marginHorizontal: 30,
        flex: 1,
        alignItems: 'center',
    },
    Text: {
        fontSize: 16,
        textAlign: 'center',
        color: 'gray',
    },
    ButtonSignIn: {
        backgroundColor: "#C70C3C",
        marginHorizontal: 30,
        marginTop:30,
        marginBottom:30,
        borderRadius: 28,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 5,
        shadowRadius: 5,
        shadowOffset: {width: 5,height: 5}
    },
    TextSignIn: {
        fontSize: 16,
        color: 'white',
    },
    ButtonSignUp: {
        backgroundColor: "#E1E5F0",
        marginHorizontal: 30,
        borderRadius: 28,
        marginBottom:30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 5,
        shadowRadius: 5,
        shadowOffset: {width: 5,height: 5}
    },
    TextSignUp: {
        fontSize: 16,
        color: '#3544C4',
    },
    Line: {
        flex: 0.01,
        backgroundColor: 'black',
        marginHorizontal: 30,
        marginBottom:30,
    },
    ViewSignFacebookButton: {
        backgroundColor: "#3A559F",
        marginHorizontal: 30,
        borderRadius: 28,
        flex: 1,
        marginBottom:30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 5,
        shadowRadius: 5,
        shadowOffset: {width: 5,height: 5}
    },
    TextLoginFb: {
        fontSize: 16,
        color: 'white',
    },
  })
export default FirstScreen