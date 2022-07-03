import { 
  View, Text, ScrollView,
  StyleSheet, ImageBackground,
  FlatList, TouchableOpacity,
  Image, StatusBar
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import { useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { url } from '../components/url';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { dataFilmsSelector } from '../Redux/selectors';

const HomeScreen = ({navigation}) => {

  const scrollRef = useRef(null);
  const {width: screenWidth} = Dimensions.get('window')
  const {height: screenHeight} = Dimensions.get('window')
  const dataFilms = useSelector(dataFilmsSelector);
 
  const sortingData = dataFilms.sort(function(e1, e2){return e2.point - e1.point});
  const dataFilmTop = sortingData.slice(0,5)
  dataFilmTop.map((element, index)=> {
    element.top = index + 1;
  })
  
  const [colorButtonTop,setColorButtonTop] = useState("white");
  const [renderTop, setRenderTop] = useState(true)

  const [colorButtonClassify,setColorButtonClassify] = useState("#7CDFF6");
  const [renderClassify, setRenderClassify] = useState(false)

  const [colorButtonAll,setColorButtonAll] = useState("#7CDFF6");
  const [renderAll, setRenderAll] = useState(false)

  const [dataFilmPopular, setDataFilmPopular] = useState([]);
  const [dataFilmOdd, setDataFilmOdd] = useState([]);
  //Action
  // Adventure
  // Comedy
  // Fantasy
  // Thriller
  // Animation
  const [dataFilmAction, setDataFilmAction] = useState([])
  const [dataFilmAdventure, setDataFilmAdventure] = useState([])
  const [dataFilmComedy, setDataFilmComedy] = useState([])
  const [dataFilmFantasy, setDataFilmFantasy] = useState([])
  const [dataFilmThriller, setDataFilmThriller] = useState([])
  const [dataFilmAnimation, setDataFilmAnimation] = useState([])



  useEffect(()=> {
    let toltalPiont = 0
    dataFilms.map((element) => {
      toltalPiont += element.point;
    })
    const avgPoint = toltalPiont/dataFilms.length;
    const newArray1 = []
    const newArray2 = [];
    const Action = []
    const Adventure = []
    const Comedy = []
    const Fantasy = []
    const Thriller = []
    const Animation = []
    dataFilms.map((film) => {
      if (film.point > avgPoint){
        newArray1.push(film);
      }
      if (film.type == 'Phim Lẻ'){
        newArray2.push(film);
      }

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
    setDataFilmPopular(newArray1)
    setDataFilmOdd(newArray2)
  },[dataFilms])

  useEffect(() => {
    let index =0;
    setInterval(() => {
      scrollRef.current.scrollTo({x: (index*screenWidth), y: 0, animated: true});
      index += 1;
      if(index === dataFilmTop.length){
        index=0;
      }
    },3000)
  },[dataFilmTop])

  const renderItemTop = ( element, index ) => (
    <ScrollView key={index} 
    bounces ={false}
    style={[styles.ItemTop, {width: screenWidth} ]}>
      <ImageBackground
      source= {{uri: `${url}/images/${element.idImageVideo}/1.jpeg`}}
      style={styles.ImageBackground}
      opacity = {0.3}
      resizeMode = 'cover'
      >
        <View style={styles.viewImage}>
          <Image 
          source={{uri: `${url}/images/topImages/top${element.top}.png`}}
          style={styles.imageTop}
          resizeMode = 'stretch'
          />
          <Image 
          source={{uri: `${url}/images/${element.idImageVideo}/0.jpeg`}}
          style={styles.imageAvt}
          resizeMode = 'stretch'
          />
        </View>
        <View style= {styles.viewTitleBackGround}>
          <Text style = {styles.nameFilm}>{element.nameVn}</Text>
          <Text>Đánh Giá: {element.point}</Text>
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
      <LinearGradient
      colors={['#B993D6','#8CA6DB']}
      style= {{height: '100%',}}
      >
        <View style = {styles.viewDetails}>
          <Text style ={{fontSize: 20, color: '#F9D423'}}>Nội Dung Phim</Text>
          <Text style ={{marginTop: 10,}}>{element.content}</Text>
        </View>
      </LinearGradient>
    </ScrollView>
  );

  const renderFilmClassify = (item, index) => {
    return (
      <TouchableOpacity 
      key={index}
      style={styles.ItemClassify}
      onPress={() => {
        navigation.navigate('DetailsScreen', { idFilm: item._id})
      }}
      >
      <Image 
      source={{uri: `${url}/images/${item.idImageVideo}/0.jpeg`}}
      style={styles.imageClasify}
      resizeMode = 'stretch'
      />
    </TouchableOpacity>
    );
  };

  const renderItemPopular = ({ item }) => {
    return (
      <TouchableOpacity 
      style={styles.ItemPopular}
      onPress={() => {
        navigation.navigate('DetailsScreen', { idFilm: item._id})
      }}
      >
      <Image 
      source={{uri: `${url}/images/${item.idImageVideo}/0.jpeg`}}
      style={styles.imagePopular}
      resizeMode = 'stretch'
      />
    </TouchableOpacity>
    );
  };
  const renderAllFilms = ({ item }) => {
    return (
      <TouchableOpacity 
      style={styles.itemFilmAll}
      onPress={() => {
        navigation.navigate('DetailsScreen', { idFilm: item._id})
      }}
      >
      <Image 
      source={{uri: `${url}/images/${item.idImageVideo}/0.jpeg`}}
      style={styles.imageFilmAll}
      resizeMode = 'stretch'
      />
      <View style={[styles.viewContentFilmAll, {width: screenWidth/10*5.7}]}>
        <Text style= {styles.textNameAll}>{item.nameVn}</Text>
        <Text>Đánh Giá: {item.point}</Text>
        <Text>Trạng Thái: {item.status}</Text>
        <Text>Loại Phim: {item.type}</Text>
        <Text>Quốc Gia: {item.country}</Text>
        <Text>Thời Lượng: {item.durations} phút</Text>
        <Text>Ngày Ra Mắt: {item.releaseDay} </Text>
      </View>
    </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}
    > 
      <View style={styles.View1}>
        <Text style={styles.popularTitle}>Thịnh Hành</Text>
        <FlatList
          horizontal={true}
          data={dataFilmPopular}
          renderItem={renderItemPopular}
        />
      </View>
      <View style={styles.View2}>
        <View style={styles.viewButton}>
          <ScrollView 
          horizontal={true}
          alignItems = 'center'
          >
              <TouchableOpacity onPress={() => {
                setColorButtonTop("white")
                setColorButtonClassify("#7CDFF6")
                setColorButtonAll("#7CDFF6")
                
                setRenderTop(true)
                setRenderClassify(false)
                setRenderAll(false)
              }}
              style={[styles.TypeButton,{backgroundColor: colorButtonTop }]}
              >
                <Text style = {styles.textTypeButton}>Bảng Xếp Hạng</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setColorButtonTop("#7CDFF6")
                setColorButtonClassify("white")
                setColorButtonAll("#7CDFF6")

                setRenderTop(false)
                setRenderClassify(true)
                setRenderAll(false)
              }}
              style={[styles.TypeButton, {backgroundColor: colorButtonClassify }]}
              >
                <Text style = {styles.textTypeButton}>Phân Loại</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setColorButtonTop("#7CDFF6")
                setColorButtonClassify("#7CDFF6")
                setColorButtonAll("white")

                setRenderTop(false)
                setRenderClassify(false)
                setRenderAll(true)
              }}
              style={[styles.TypeButton, {backgroundColor: colorButtonAll }]}
              >
                <Text style = {styles.textTypeButton}>Tất cả</Text>
              </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={styles.view3}>
          <ScrollView 
          pagingEnabled
          horizontal = {true}
          ref = {scrollRef}
          bounces ={false}
          >
            {renderTop&&dataFilmTop.map(renderItemTop)}
          </ScrollView>

          <LinearGradient
          colors={['#BE93C5','#7BC6CC']}
          style={styles.viewClassify}
          >
            {renderClassify&&
              <ScrollView
              style={{height: screenHeight/10*6.2}}
              >
                
                <Text style={styles.textClassify}>Phim Lẻ</Text>
                <ScrollView 
                horizontal={true}
                style={styles.viewClassifyItem}>
                  {dataFilmOdd.map(renderFilmClassify)} 
                </ScrollView>

                <Text style={styles.textClassify}>Action</Text>
                <ScrollView 
                horizontal={true}
                style={styles.viewClassifyItem}>
                  {dataFilmAction.map(renderFilmClassify)} 
                </ScrollView>

                <Text style={styles.textClassify}>Adventure</Text>
                <ScrollView 
                horizontal={true}
                style={styles.viewClassifyItem}>
                  {dataFilmAdventure.map(renderFilmClassify)} 
                </ScrollView>

                <Text style={styles.textClassify}>Comedy</Text>
                <ScrollView 
                horizontal={true}
                style={styles.viewClassifyItem}>
                  {dataFilmComedy.map(renderFilmClassify)} 
                </ScrollView>

                <Text style={styles.textClassify}>Fantasy</Text>
                <ScrollView 
                horizontal={true}
                style={styles.viewClassifyItem}>
                  {dataFilmFantasy.map(renderFilmClassify)} 
                </ScrollView>

                <Text style={styles.textClassify}>Thriller</Text>
                <ScrollView 
                horizontal={true}
                style={styles.viewClassifyItem}>
                  {dataFilmThriller.map(renderFilmClassify)} 
                </ScrollView>

                <Text style={styles.textClassify}>Animation</Text>
                <ScrollView 
                horizontal={true}
                style={[styles.viewClassifyItem,{marginBottom:80}]}>
                  {dataFilmAnimation.map(renderFilmClassify)} 
                </ScrollView>
              </ScrollView>
            }
          </LinearGradient>
          
          <LinearGradient
          colors={['#BE93C5','#7BC6CC']}
          >
            {renderAll&&
            <FlatList
            data={dataFilms}
            renderItem={renderAllFilms}
            />
            } 
          </LinearGradient>
        </View>
      </View> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  View1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B993D6',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  popularTitle: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
  },
  ItemPopular: {
    marginHorizontal: 10,
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 10,
    shadowOpacity: 0.55,
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowRadius: 4.5,
  },
  imagePopular: {
    width: 120, 
    height: 180, 
    borderRadius: 20,
  },
  View2: {
    flex: 2,
  },
  viewImage: {
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  ItemTop: {
    flex: 1,
  },
  imageAvt: {
    width: 100, 
    height: 150,
    borderRadius: 20,
    marginBottom: 10,
  },
  imageTop: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  ImageBackground: {
    flex: 1,
    height: 220,
    flexDirection: 'row',
  },
  viewButton: {
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#7CDFF6',
    height:40,
  },
  TypeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 170,
    height:30,
  },
  textTypeButton: {
    fontSize: 20,
  },
  viewTitleBackGround: {
    justifyContent: 'flex-end',
    flex:1, 
    marginLeft: 10,
    marginBottom: 20,
  },
  viewDetails: {
    flex: 1,
    marginTop:10,
    marginHorizontal: 10,
    marginBottom: 80,
  },
  iconPlay: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#7CDFF6',
    borderRadius: 20,
    shadowOpacity: 0.55,
    shadowOffset: {
      height: 10,
    },
    shadowRadius: 4.5,
  },
  nameFilm: {fontSize: 20, 
    color: '#000100', 
    marginBottom: 10, 
    fontWeight: 'bold'
  },
  itemFilmAll: {
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
  imageFilmAll: {
    width: 120, 
    height: 180, 
    borderRadius: 20,
  },
  viewContentFilmAll: {
    marginLeft: 10,
    marginTop: 5,
  },
  textNameAll: {
    textAlign: 'center', 
    color: '#0F2027',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ItemClassify: {
    marginHorizontal: 10,
    marginBottom:15,
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowRadius: 4.5,
  },
  imageClasify: {
    width: 120, 
    height: 180, 
    borderRadius: 20,
  },
  viewClassify: {
    flex: 1,
    position: 'absolute',
  },
  viewClassifyItem: {
    flexDirection: 'row',
  },
  view3: {
    flex: 1,
  },
  textClassify: {
    fontSize: 20,
    marginLeft: 10,
    marginVertical: 10,
    color: '#2F0743',
    fontWeight: 'bold',
    textAlign: 'center',
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowRadius: 4.5,
    marginBottom: 15,
  }
})
export default HomeScreen

