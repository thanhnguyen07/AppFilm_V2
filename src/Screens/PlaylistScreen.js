import { View, Text, StyleSheet,
   FlatList, TouchableOpacity,
   Image, StatusBar
  } from 'react-native';
import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { dataUserSelector } from '../Redux/selectors';
import { dataFilmsSelector } from '../Redux/selectors';
import { url } from '../components/url';
import LinearGradient from 'react-native-linear-gradient';

const PlaylistScreen = ({navigation}) => {
  const dataUser = useSelector(dataUserSelector);
  const dataFilms = useSelector(dataFilmsSelector);
  // console.log(dataUser);
  // console.log(dataFilms);
  const listPlay = dataUser.listPlay;
  const [dataFilmPlayList, setDataFilmPlayList] = useState([])

  useEffect(()=>{
    const newArray = [];
    listPlay.map((idFilm) => {
      dataFilms.map((film) => {
        if(idFilm === film._id){
          newArray.push(film);
        }
      })
    })
    setDataFilmPlayList(newArray)
  },[dataFilms,dataUser])


  const renderFilm = ({ item }) => {
    return (
      <TouchableOpacity 
      style={styles.itemFilm}
      onPress={() => {
        navigation.navigate('DetailsScreen', { idFilm: item._id})
      }}
      >
      <Image 
      source={{uri: `${url}/images/${item.idImageVideo}/0.jpeg`}}
      style={styles.imageFilm}
      resizeMode = 'stretch'
      />
      <View style={styles.viewContentFilm}>
        <Text style= {styles.textName}>{item.nameVn}</Text>
        <Text style= {styles.text}>Đánh Giá: {item.point}</Text>
        <Text style= {styles.text}>Trạng Thái: {item.status}</Text>
        <Text style= {styles.text}>Loại Phim: {item.type}</Text>
        <Text style= {styles.text}>Quốc Gia: {item.country}</Text>
        <Text style= {styles.text}>Thời Lượng: {item.durations} phút</Text>
        <Text style= {styles.text}>Ngày Ra Mắt: {item.releaseDay} </Text>
      </View>
    </TouchableOpacity>
    );
  };

  return (
    <LinearGradient 
    colors={['#333333', '#e9d362']}
    style = {styles.container}>
      <View style={styles.viewHeader}>
        <View style={styles.textHeader}>
          <Text style={{fontWeight: 'bold', fontSize: 30, color: 'white'}}>Danh Sách Xem Sau</Text>
        </View>
      </View>
      <View style={styles.viewFilm}>
        <FlatList
          data={dataFilmPlayList}
          renderItem={renderFilm}
        />
      </View>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewHeader: {
    marginTop: 30,
  },
  textHeader: {
    marginTop: 5,
    alignItems: 'center',
  },
  viewFilm: {
    flex: 1,
    marginBottom: 80,
  },
  itemFilm: {
    flexDirection: 'row',
    borderRadius: 20,
    marginVertical: 10,
    marginLeft: 10,
    shadowOpacity: 0.55,
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowRadius: 4.5,
  },
  viewContentFilm: {
    flex: 1,
    marginLeft: 10,
    marginTop: 5,
  },
  textName: {
    textAlign: 'center', 
    color: '#f85032',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageFilm: {
    width: 120, 
    height: 180, 
    borderRadius: 20,
  },
  text: {
    color: 'white',
    marginLeft: 5,
  }
})
export default PlaylistScreen