import React from "react";
import { ImageBackground , StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Video from 'react-native-video';
import loading from '../Assets/Images/loading_black.gif';
import { url } from '../components/url';
import Icon from 'react-native-vector-icons/Ionicons';


export default  PlayScreen = ({navigation, route}) => {
  const {dataFilm} = route.params;
  const idVideo = dataFilm.idImageVideo;
  const name = dataFilm.nameEn
    return (
      <View style = {styles.container}>
        <View style = {styles.viewBack}>
          <TouchableOpacity
          style = {styles.back}
          onPress= {()=> navigation.goBack()}
          >
            <Icon
            name = 'chevron-back-outline'
            size = {30}
            color = {'white'}
            />
          </TouchableOpacity>
        </View>
        <View style = {styles.viewName}>
        <Text style = {styles.Name}>{name}</Text>
        </View>
        <ImageBackground source = {loading} 
        resizeMode = 'contain'
        style = {styles.viewView}>
          <Video source={{ uri: `${url}/video/${idVideo}.mp4`}}   
            ref={(ref) => {
            this.player = ref
          }}
          controls 
          onBuffer={this.onBuffer}                
          onError={this.videoError}               
          style={styles.Video} />
        </ImageBackground>
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  viewBack: {
    marginTop: 40,
  },
  back: {
    marginLeft: 10,
  },
  viewView: {
    flex: 1,
    marginBottom: 230,
    // backgroundColor: 'red'
  },
  Video: {
    position: 'absolute',
    top: 90,
    left: 0,
    bottom: 90,
    right: 0,
  },
  viewName: {
    // backgroundColor: 'blue',
    marginTop: 80,
  },
  Name: {
    fontSize: 25,
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  }
});