import { 
  View, Text, StyleSheet, 
  TouchableOpacity, Image,
  FlatList
} from 'react-native';
import React, {useEffect, useState} from 'react';
import { useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { url } from '../components/url';
import { dataFilmsSelector } from '../Redux/selectors';
import { dataUserSelector } from '../Redux/selectors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
    const clearAll = async () => {
      try {
        await AsyncStorage.clear()
      } catch(e) {
        // clear error
      }
      console.log('Clear token')
    }
    const dataUser = useSelector(dataUserSelector)
    const dataFilms = useSelector(dataFilmsSelector)

    const listLike = dataUser.listLike;
    const listHistory = dataUser.listHistory;

    const [dataList, setDataList] = useState([]);
    const [dataHistory, setDataHistory] = useState([]);

    useEffect(()=> {
      const array1 = [];
      listLike.map((idFilm) => {
        dataFilms.map((element) => {
          if(idFilm === element._id){
            array1.push(element);
          }
        })
      })
      setDataList(array1);
      const array2 = [];
      listHistory.map((idFilm) => {
        dataFilms.map((element) => {
          if(idFilm === element._id){
            array2.push(element);
          }
        })
      })
      setDataHistory(array2);
    },[dataUser])

    
    const renderList = ({ item }) => {
      return (
        <TouchableOpacity 
        style={styles.Item}
        onPress={() => {
          navigation.navigate('DetailsScreen', { idFilm: item._id})
        }}
        >
        <Image 
        source={{uri: `${url}/images/${item.idImageVideo}/0.jpeg`}}
        style={styles.image}
        resizeMode = 'stretch'
        />
      </TouchableOpacity>
      );
    };
  return (
    <LinearGradient 
    colors={['#135058','#F1F2B5']}
    style={styles.container}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
        onPress={() => {
          clearAll();
          navigation.navigate('FirstScreen')
        }}
        >
          <Icon
          name = 'log-out'
          size = {30}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.viewUser}>
        <LinearGradient 
        colors={['#134E5E','#71B280','#292E49']}
        style={styles.boderUser}>
          <Text style={styles.name}>{dataUser.name}</Text>
          <Text style={styles.email}>{dataUser.email}</Text>
        </LinearGradient>
      </View>
      <View style={styles.viewList}>
        <View style={styles.viewLike}>
          <Text style={styles.textLike}>Film Yêu Thích</Text>
          <FlatList
          horizontal= {true}
          data = {dataList}
          renderItem = {renderList}
          />
        </View>
        <View style={styles.viewHistory}>
          <Text style={styles.textHistory}>Lịch Sử</Text>
          <FlatList
          horizontal= {true}
          data = {dataHistory}
          renderItem = {renderList}
          />
        </View>
      </View>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewHeader: {
    marginTop:45,
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
    
  },
  viewUser: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowRadius: 4.5,
  },
  boderUser: {
    height: '80%',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 30,
  },
  viewList: {
    flex: 2,
    marginBottom: 80,
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowRadius: 4.5,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  email: {
    color: '#e9d362',
    fontSize: 16,
  },
  viewLike: {
    marginHorizontal: 10,
  },
  viewHistory: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  textLike: {
    fontSize: 20,
    color: '#f85032',
  },
  textHistory: {
    fontSize: 20,
  },
  Item: {
    marginHorizontal: 10,
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 10,
  },
  image: {
    width: 120, 
    height: 180, 
    borderRadius: 20,
  },
})
export default ProfileScreen