import { View, Text, SafeAreaView, 
  TextInput, Button, StyleSheet,
  ImageBackground, TouchableOpacity,
  Alert
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Login_DataUser } from '../Redux/Actions/UpdateDataUser';
import { User } from '../Redux/actions';
import backGround from '../Assets/Images/backGround2.png';
import IconBack from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {url} from '../components/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ navigation} ) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState ('')
  const [pass, setPass] = useState ('')
  // const dataStore = useSelector((state)=> state);
  //   console.log('dataStore sign in: ', dataStore)
  // useEffect(() => {
  //   console.log('Go Sign In');
  // },[])

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('idUser', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const signUpHandler = () => {
    if(email != '' && pass != '') {
      axios.post(`${url}/users/login`,{
        email: email,
        pass: pass,
      })
        .then(res => {
          const login = res.data;
          // console.log('res: ',login);
          if(login.checkEmail==undefined){
            const dataUser = login.user;
            const _id = dataUser._id;
            const emailUser = dataUser.email;
            const nameUser = dataUser.name;
            const listPlay = dataUser.listPlay;
            const listCmt = dataUser.listCmt;
            const listLike = dataUser.listLike;
            const listHistory = dataUser.listHistory;
            
            storeData(dataUser)
            dispatch(User(_id, emailUser, nameUser, listCmt, listLike, listHistory, listPlay))
  
            navigation.navigate('HomeTab', { screen: 'HomeScreen' })
          } else{
            Alert.alert('Email is not registered!!!','Sign up now.',[{
              text: 'Sign Up',
              onPress: () => {navigation.navigate('SignUpScreen')},
              styles: 'cancel'
            },{
              text: 'Cancel',
              styles: 'cancel'
            }])
          }
          
        })
    }else{
      Alert.alert('Please enter enough information !!!')
    }
  }
  return (
    <View style={styles.container}>
      <ImageBackground source = {backGround}
      resizeMode = 'stretch'
      opacity = {0.2}
      style={styles.backGround}
      >
        <TouchableOpacity style = {styles.header}>
          <IconBack
          onPress={() => navigation.navigate('FirstScreen')}
          name = 'chevron-back'
          size = {28} 
          style={styles.IconBack}
          />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={styles.textTitle}>Sign In</Text>
        </View>
        <View style={styles.input}>
          <Text style={styles.textInput}>Email</Text>
          <TextInput
          paddingLeft={10}
          placeholderTextColor = "yellow"
          placeholder = 'abc@example.com'
          autoCapitalize = 'none'
          clearButtonMode = 'while-editing'
          keyboardType = 'email-address'
          selectionColor = 'yellow'
          spellCheck = {false}
          style = {styles.boxInput}
          onChangeText = {setEmail}
          />
          <Text style={styles.textInput}>Password</Text>
          <TextInput
          clearButtonMode = 'while-editing'
          secureTextEntry = {true}
          placeholder = '*******' 
          placeholderTextColor = "yellow"
          spellCheck = {false}
          selectionColor = 'yellow'
          paddingLeft={10}
          style = {styles.boxInput}
          onChangeText = {setPass}
          />
        </View>
        <View style={styles.viewButton}>
          <TouchableOpacity 
          onPress = {signUpHandler}
          style={styles.button}>
            <Text style={styles.textButton}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUp}>
          <Text style = {{color: 'white'}}>You don't have an account? </Text>
          <TouchableOpacity onPress={()=> navigation.navigate('SignUpScreen')}
          > 
            <Text style={{color: 'yellow'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    height: "100%",
    width: "100%",
  },
  backGround: {
    height: "100%",
    width: "100%",
  },
  header:{
    height: '10%',
    width: "100%",
  },
  IconBack: {
    marginTop: 40,
    marginLeft: 10,
    color: 'black'
  },
  title:{
    height: '20%',
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'yellow'
  },
  input:{
    height: '20%',
    width: "100%",
  },
  boxInput: {
    height: '25%',
    borderWidth: 1,
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom:5,
    borderRadius: 10,
    shadowOpacity: 5,
    shadowRadius: 5,
    shadowOffset: {width: 5,height: 5},
    shadowColor: 'black',
  },
  textInput: {
    fontSize: 20,
    marginLeft: 10,
    color: 'yellow',
  },
  viewButton:{
    height: '20%',
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'yellow',
    borderRadius: 20,
    height: '30%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 5,
    shadowOffset: {width: 5,height: 5},
    shadowColor: 'black',
  },
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  signUp:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 40,
  }
})

export default SignInScreen
