import { View, Text, TouchableOpacity,
  StyleSheet, Image, TouchableWithoutFeedback,
  Keyboard, TextInput, Dimensions,
  ScrollView, ImageBackground, FlatList
} from 'react-native'
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { dataFilmsSelector } from '../Redux/selectors';
import { useSelector} from 'react-redux';
import SearchIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import { url } from '../components/url'

const SearchScreen = ({navigation}) => {
  const dataFilms = useSelector(dataFilmsSelector);
  const [input, setInput] = useState('Vd: Sonic');
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showFalseResult, setShowFalseResult] = useState(false);
  const [dataResult, setDataResult] = useState([]);
  const {width: screenWidth} = Dimensions.get('window')
  const {height: screenHeight} = Dimensions.get('window')

  const [dataFilmAction, setDataFilmAction] = useState([])
  const [dataFilmAdventure, setDataFilmAdventure] = useState([])
  const [dataFilmComedy, setDataFilmComedy] = useState([])
  const [dataFilmFantasy, setDataFilmFantasy] = useState([])
  const [dataFilmThriller, setDataFilmThriller] = useState([])
  const [dataFilmAnimation, setDataFilmAnimation] = useState([])
  //#030303
  const [colorAction, setColorAction] = useState('#37746B')
  const [colorAdventure, setColorAdventure] = useState('#37746B')
  const [colorComedy, setColorComedy] = useState('#37746B')
  const [colorFantasy, setColorFantasy] = useState('#37746B')
  const [colorThriller, setColorThriller] = useState('#37746B')
  const [colorAnimation, setColorAnimation] = useState('#37746B')

  const [showAction, setShowAction] = useState(false)
  const [showAdventure, setShowAdventure] = useState(false)
  const [showComedy, setShowComedy] = useState(false)
  const [showFantasy, setShowFantasy] = useState(false)
  const [showThriller, setShowThriller] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(()=> {
    const Action = []
    const Adventure = []
    const Comedy = []
    const Fantasy = []
    const Thriller = []
    const Animation = []

    dataFilms.map((film) => {
      const genre = film.genre;
      genre.map((element) => {
        if(element == 'Action'){
          Action.push(film)
        }
        if(element == 'Adventure'){
          Adventure.push(film)
        }
        if(element == 'Comedy'){
          Comedy.push(film)
        }
        if(element == 'Fantasy'){
          Fantasy.push(film)
        }
        if(element == 'Thriller'){
          Thriller.push(film)
        }
        if(element == 'Animation'){
          Animation.push(film)
        }
      })
    })
    setDataFilmAction(Action)
    setDataFilmAdventure(Adventure)
    setDataFilmComedy(Comedy)
    setDataFilmFantasy(Fantasy)
    setDataFilmThriller(Thriller)
    setDataFilmAnimation(Animation)
  },[])

  const SearchHandler = () => {
    const newInput = input.toLowerCase().slice(0,3);
    const result = [];
    dataFilms.map((element) => {
      const naemEn = element.nameEn.toLowerCase().slice(0,3)
      if(naemEn === newInput){
        result.push(element);
      }
    })
    if(result.length != 0){
      setShowFalseResult(false)
      setDataResult(result)
      setShowResult(true)

      setColorAction('#37746B')
      setColorAdventure('#37746B')
      setColorComedy('#37746B')
      setColorFantasy('#37746B')
      setColorThriller('#37746B')
      setColorAnimation('#37746B')

      setShowAction(false)
      setShowAdventure(false)
      setShowComedy(false)
      setShowFantasy(false)
      setShowThriller(false)
      setShowAnimation(false)
    }else {
      setShowResult(false)
      setShowFalseResult(true)

      setColorAction('#37746B')
      setColorAdventure('#37746B')
      setColorComedy('#37746B')
      setColorFantasy('#37746B')
      setColorThriller('#37746B')
      setColorAnimation('#37746B')

      setShowAction(false)
      setShowAdventure(false)
      setShowComedy(false)
      setShowFantasy(false)
      setShowThriller(false)
      setShowAnimation(false)
    }
  }
  const renderResult = (element, index) => {
    return (
      <ScrollView
      key={index}
      bounces = {false}
      >
        <ImageBackground
        source= {{uri: `${url}/images/${element.idImageVideo}/1.jpeg`}}
        style={styles.ImageBackground}
        opacity = {0.3}
        resizeMode = 'cover'
        >
          <View style={styles.viewImage}>
            <Image 
            source={{uri: `${url}/images/${element.idImageVideo}/0.jpeg`}}
            style={styles.imageAvt}
            resizeMode = 'stretch'
            />
          </View>
          <View style= {styles.viewTitleBackGround}>
            <Text style = {styles.nameFilm}>{element.nameEn}</Text>
            <Text style ={{color: '#CAC531',}}>Đánh Giá: {element.point}</Text>
            <TouchableOpacity 
            onPress={() => {
            navigation.navigate('DetailsScreen', { idFilm: element._id})
            }}
            style= {styles.iconPlay}>
            <Icon name="play-circle" size={30} />
            <Text>Xem Phim </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    )
  }

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
    <TouchableWithoutFeedback 
    onPress={Keyboard.dismiss}
    style={styles.container}
    > 
    <LinearGradient colors={['#1f4037', '#99f2c8']}
    style={styles.container}>
      <View style={styles.viewHeader}>
        <Text style={styles.textHeder}>Tìm Kiếm</Text>
      </View>

      <View style={styles.viewInput}>
        <TextInput
        style={[styles.boxInput, {width: screenWidth/10*7}]}
        placeholder={input}
        clearButtonMode ='always'
        placeholderTextColor = {'white'}
        paddingLeft={10}
        onChangeText = {setInput}
        keyboardType = "default"
        secureTextEntry = {false}
        />
        <TouchableOpacity>
        <SearchIcon
        onPress={SearchHandler}
        name = 'ios-search-sharp'
        size = {35}
        />
        </TouchableOpacity>
      </View>
      <View
      style={styles.ViewFilter}>
        <ScrollView
        horizontal={true}
        >
          <TouchableOpacity
          onPress={()=>{
            setColorAction('#030303')
            setColorAdventure('#37746B')
            setColorComedy('#37746B')
            setColorFantasy('#37746B')
            setColorThriller('#37746B')
            setColorAnimation('#37746B')

            setShowAction(true)
            setShowAdventure(false)
            setShowComedy(false)
            setShowFantasy(false)
            setShowThriller(false)
            setShowAnimation(false)

            setShowResult(false)
            setShowFalseResult(false)
          }}
          style={[styles.viewButtonFilter,{marginLeft: 10, backgroundColor: colorAction}]}>
            <Text style={styles.textFilter}>Action</Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={()=>{
            setColorAction('#37746B')
            setColorAdventure('#030303')
            setColorComedy('#37746B')
            setColorFantasy('#37746B')
            setColorThriller('#37746B')
            setColorAnimation('#37746B')

            setShowAction(false)
            setShowAdventure(true)
            setShowComedy(false)
            setShowFantasy(false)
            setShowThriller(false)
            setShowAnimation(false)

            setShowResult(false)
            setShowFalseResult(false)
          }} 
          style={[styles.viewButtonFilter, {backgroundColor: colorAdventure}]}>
            <Text style={styles.textFilter}>Adventure</Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={()=>{
            setColorAction('#37746B')
            setColorAdventure('#37746B')
            setColorComedy('#030303')
            setColorFantasy('#37746B')
            setColorThriller('#37746B')
            setColorAnimation('#37746B')

            setShowAction(false)
            setShowAdventure(false)
            setShowComedy(true)
            setShowFantasy(false)
            setShowThriller(false)
            setShowAnimation(false)

            setShowResult(false)
            setShowFalseResult(false)
          }} 
          style={[styles.viewButtonFilter, {backgroundColor: colorComedy}]}>
            <Text style={styles.textFilter}>Comedy</Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={()=>{
            setColorAction('#37746B')
            setColorAdventure('#37746B')
            setColorComedy('#37746B')
            setColorFantasy('#030303')
            setColorThriller('#37746B')
            setColorAnimation('#37746B')

            setShowAction(false)
            setShowAdventure(false)
            setShowComedy(false)
            setShowFantasy(true)
            setShowThriller(false)
            setShowAnimation(false)

            setShowResult(false)
            setShowFalseResult(false)
          }} 
          style={[styles.viewButtonFilter, {backgroundColor: colorFantasy}]}>
            <Text style={styles.textFilter}>Fantasy</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={()=>{
            setColorAction('#37746B')
            setColorAdventure('#37746B')
            setColorComedy('#37746B')
            setColorFantasy('#37746B')
            setColorThriller('#030303')
            setColorAnimation('#37746B')

            setShowAction(false)
            setShowAdventure(false)
            setShowComedy(false)
            setShowFantasy(false)
            setShowThriller(true)
            setShowAnimation(false)

            setShowResult(false)
            setShowFalseResult(false)
          }} 
          style={[styles.viewButtonFilter, {backgroundColor: colorThriller}]}>
            <Text style={styles.textFilter}>Thriller</Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={()=>{
            setColorAction('#37746B')
            setColorAdventure('#37746B')
            setColorComedy('#37746B')
            setColorFantasy('#37746B')
            setColorThriller('#37746B')
            setColorAnimation('#030303')

            setShowAction(false)
            setShowAdventure(false)
            setShowComedy(false)
            setShowFantasy(false)
            setShowThriller(false)
            setShowAnimation(true)

            setShowResult(false)
            setShowFalseResult(false)
          }}
          style={[styles.viewButtonFilter, {marginRight: 10, backgroundColor: colorAnimation}]}>
            <Text style={styles.textFilter}>Animation</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.viewResult}>
        {showFalseResult&&<Text style={styles.textResult}>Không tìm thấy film!!!</Text>}
        {showResult&&dataResult.map(renderResult)}
        {showAction&&
          <FlatList
          data={dataFilmAction}
          renderItem={renderFilm}
          />
        }
        {showAdventure&&
          <FlatList
          data={dataFilmAdventure}
          renderItem={renderFilm}
          />
        }
        {showComedy&&
          <FlatList
          data={dataFilmComedy}
          renderItem={renderFilm}
          />
        }
        {showFantasy&&
          <FlatList
          data={dataFilmFantasy}
          renderItem={renderFilm}
          />
        }
        {showThriller&&
          <FlatList
          data={dataFilmThriller}
          renderItem={renderFilm}
          />
        }
        {showAnimation&&
          <FlatList
          data={dataFilmAnimation}
          renderItem={renderFilm}
          />
        }
      </View>
    </LinearGradient> 
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewHeader: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeder: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#CAC531'
  },
  viewInput: {
    flexDirection: 'row',
    marginTop: 10,
    shadowColor: '#D3CCE3',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowRadius: 4.5,
  },
  boxInput: {
    marginHorizontal: 30,
    borderRadius: 20,
    borderWidth: 1,
    height: 35,
  },
  viewResult: {
    flex: 1,
    marginTop: 20,
  },
  textResult: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#CAC531'
  },
  ImageBackground: {
    height: 220,
    flexDirection: 'row',
    shadowColor: 'white',
  },
  viewImage: {
    marginLeft: 10,
    justifyContent: 'flex-end',
    shadowOpacity: 0.65,
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowRadius: 4.5,
  },
  imageAvt: {
    width: 100, 
    height: 150,
    borderRadius: 20,
    marginBottom: 10,
  },
  viewTitleBackGround: {
    justifyContent: 'flex-end',
    flex:1, 
    marginHorizontal: 15,
    marginBottom: 20,
    shadowOpacity: 0.75,
    shadowOffset: {
      height: 12,
      width: 10,
    },
    shadowRadius: 4.5,
  },
  nameFilm: {fontSize: 20, 
    color: '#CAC531', 
    marginBottom: 10, 
    fontWeight: 'bold'
  },
  iconPlay: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#7CDFF6',
    borderRadius: 20,
  },
  ViewFilter: {
    marginTop: 20,
    height: 50,
  },
  viewButtonFilter: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    borderRadius: 15,
    marginVertical: 7,
    width: 100,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 5,
      height: 5,
    
    },
    shadowRadius: 5,
    shadowColor: 'white',
  },
  textFilter: {
    color: 'yellow',
    fontSize: 18,
    textAlign: 'center',
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
  imageFilm: {
    width: 120, 
    height: 180, 
    borderRadius: 20,
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
  text: {
    color: 'white',
    marginLeft: 5,
  }
})
export default SearchScreen