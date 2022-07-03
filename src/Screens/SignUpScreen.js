import { View, Text, SafeAreaView, 
  TextInput, Button, StyleSheet,
  ImageBackground, TouchableOpacity, Alert,
  
 } from 'react-native'
import React, { useEffect, useState } from 'react';
import backGround from '../Assets/Images/backGround2.png'
import IconBack from 'react-native-vector-icons/Ionicons';
import {url} from '../components/url';
import axios from 'axios'


const SignInScreen = ({ navigation} ) => {
  const [name, setName] =  useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] =  useState('')
  const signUpHandler = () => {
    if( name != '' && email != '' && pass != '') {
      axios.post(`${url}/users/store2`, {
        name: name,
        email: email,
        pass: pass,
      })
        .then(res => {
          if(res.data){
            Alert.alert('Sign Up success!','',[
              {
                text: "Cancel",
                onPress: () => navigation.navigate('FirstScreen'),
                style: "cancel"
              },
              {
                text: "Sign In",
                onPress: () => navigation.navigate('SignInScreen'),
                style: 'cancel'
              },
              // { text: "OK", onPress: () => console.log("OK Pressed") }
            ])
          } else {
            Alert.alert('The Email was registered !!!')
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
          <Text style={styles.textTitle}>Sign Up</Text>
        </View>

        <View style={styles.input}>
          <Text style={styles.textInput}>Name</Text>
          <TextInput
          paddingLeft={10}
          maxLength={12}
          placeholderTextColor = "black"
          placeholder = 'VD: Nguyễn Văn A'
          clearButtonMode = 'while-editing'
          selectionColor = 'yellow'
          spellCheck = {false}
          onChangeText = {setName}
          style = {styles.boxInput}
          />

          <Text style={styles.textInput}>Email</Text>
          <TextInput
          paddingLeft={10}
          placeholderTextColor = "black"
          placeholder = 'abc@example.com'
          autoCapitalize = 'none'
          clearButtonMode = 'while-editing'
          keyboardType = 'email-address'
          selectionColor = 'yellow'
          spellCheck = {false}
          onChangeText = {setEmail}
          style = {styles.boxInput}
          />

          <Text style={styles.textInput}>Password</Text>
          <TextInput
          clearButtonMode = 'while-editing'
          secureTextEntry = {true}
          placeholder = '*******' 
          placeholderTextColor = "black"
          spellCheck = {false}
          selectionColor = 'yellow'
          paddingLeft={10}
          onChangeText = {setPass}
          style = {styles.boxInput}
          />
        </View>
        <View style={styles.viewButton}>
          <TouchableOpacity onPress={signUpHandler}
          style={styles.button}>
            <Text style={styles.textButton}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    flex: 1,
  },
  backGround: {
    flex: 1,
  },
  header:{
    flex: 2,
    justifyContent: 'center',
    // backgroundColor:'red'
  },
  IconBack: {
    marginLeft: 10,
    color: 'black'
  },
  title:{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'pink',
  },
  textTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'yellow'
  },
  input:{
    flex: 5,
    // justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  boxInput: {
    height: 40,
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
    flex: 7,
    alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'green',
  },
  button: {
    marginTop: 70,
    backgroundColor: 'yellow',
    borderRadius: 20,
    height: 50,
    width: 100,
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
})

export default SignInScreen
