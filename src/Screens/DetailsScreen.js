import { 
  View, Text, ImageBackground,
  StyleSheet, ScrollView,
  Dimensions, StatusBar, TouchableOpacity,
  Image, TextInput
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {url} from '../components/url';
import YoutubePlayer from "react-native-youtube-iframe";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {Update_ListLike} from '../Redux/actions';
import {Update_ListPlay} from '../Redux/actions';
import {Update_ListHistory} from '../Redux/actions';
import { Films } from '../Redux/actions';
import { Cmts } from '../Redux/actions';
import { dataFilmsSelector } from '../Redux/selectors';
import { dataUserSelector } from '../Redux/selectors';
import { dataCastSelector } from '../Redux/selectors';
import { dataCmtsSelector } from '../Redux/selectors';

const DetailsScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {idFilm} = route.params;
  const scrollRef = useRef();
  const {width: screenWidth} = Dimensions.get('window')
  const {height: screenHeight} = Dimensions.get('window')

  const [cmt, setCmt] = useState('...')
  const [showCmts, setShowCmts] = useState()
  const dataCast = useSelector(dataCastSelector);
  const dataCmtsFilms = useSelector(dataCmtsSelector);
  const dataCmtsFilm = dataCmtsFilms.filter((element, index) => {
    return element.idFilm === idFilm;
  }).reverse();
  const dataFilms = useSelector(dataFilmsSelector);
  const dataFilm = dataFilms.filter((element, index) => {
    return element._id === idFilm;
  })[0]
  const dataCastFilm = dataCast.filter((element) => {
    return element._id === dataFilm.castId
  })[0].cast

  const dataUser = useSelector(dataUserSelector);
  // console.log('data User Store: ', dataUser)
  const listLike = dataUser.listLike;
  const listPlay = dataUser.listPlay;

  const likeUser = listLike.filter((element)=> {
    return element == dataFilm._id
  })
  const playUser = listPlay.filter((element)=> {
    return element == dataFilm._id
  })
  const imagesAraay = [];
  for (let i=1; i<=dataFilm.imagesNumber; i++) {
    imagesAraay.push(`${url}/images/${dataFilm.idImageVideo}/${i}.jpeg`)
  }
  const [checkLike, setCheckLike] = useState(true);
  const [checkList, setCheckList] = useState(true);

  const [colorButtonDetails, setColorButtonDetails] = useState('#f85032');
  const [colorButtonCmts, setColorButtonCmts] = useState('#BBAA56');

  const [showDetails, setShowDetails] = useState(true);
  const [showCmtsFilm, setShowCmtsFilm] = useState(true);

  useEffect(()=>{
    if(likeUser.length === 1){
      setCheckLike(false)
    }
    if(playUser.length === 1){
      setCheckList(false)
    }
  },[])

  useEffect(()=> {
    if(dataCmtsFilm.length !== 0){
      setShowCmtsFilm(true)
    }else{
      setShowCmtsFilm(false)
    }
  },[dataCmtsFilm])
  useEffect(() => {
    let index =0;
    let imagesNumber = dataFilm.imagesNumber +1 
    setInterval(() => {
      scrollRef.current?.scrollTo({x: (index*screenWidth), y: 0, animated: true});
      index += 1;
      if(index === imagesNumber){
        index=0;
      }
    },3000)
  },[dataFilms])
  const ButtonLikeHandler = () => {
    axios.post(`${url}/users/listLike`, {
      idFilm: dataFilm._id,
      idUser: dataUser._id,
      point: dataFilm.point,
    })
      .then((res) => {
        const dataFilms = res.data.dataFilms;
        const listLike = res.data.listLike;
        setCheckLike(!checkLike)
        dispatch(Update_ListLike(listLike))
        dispatch(Films(dataFilms))
      })
  }
  const ButtonPlayListHandler = () => {
    axios.post(`${url}/users/listPlay`, {
      idFilm: dataFilm._id,
      idUser: dataUser._id,
    })
      .then((res) => {
        const listPlay = res.data.listPlay;
        setCheckList(!checkList)
        dispatch(Update_ListPlay(listPlay))
      })
  }

  const playHandler = () => {
    // navigation.navigate('PlayScreen');
    axios.post(`${url}/users/listHistory`, {
      idFilm: dataFilm._id,
      idUser: dataUser._id,
    })
      .then((res) => {
        const listHistory = res.data.listHistory;
        dispatch(Update_ListHistory(listHistory))
        navigation.navigate('PlayScreen', {
          dataFilm: dataFilm
        });
      })
  }
  const ButtonCmtHandler = () => {
    axios.post(`${url}/cmts/create`, {
      idFilm: dataFilm._id,
      nameUser: dataUser.name,
      idUser: dataUser._id,
      content: cmt,
    })
      .then((res) => {
        const dataRes = res.data.dataCmtsFilms;
        dispatch(Cmts(dataRes))
      })
  }

  const renderImages = (element, index) => {
    return (
        <Image
        key = {index}
        source= {{uri: `${element}`}}
        style={{width: screenWidth, height: 210}}
        resizeMode = 'cover'
        >
        </Image>
    )
  }

  const renderCast = (item, index) => {
    const imagesName = item.nameCast.replace(' ','')
    return(
      <View 
      key = {index}
      style={styles.viewCast}>
        <View style={styles.viewImageCast}>
          <Image
          source = {{uri: `${url}/images/${dataFilm.idImageVideo}/${imagesName}.jpeg`}}
          style={styles.imagesCast}
          />
        </View>
        <Text style = {styles.nameCast}>{item.nameCast}</Text>
        <Text>Vai Diễn</Text>
        <Text>{item.role}</Text>
      </View>
    )
  }

  const renderCmts = (element, index) => {
    return(
      <View
      key ={index}
      style = {styles.itemCmts}
      >
        <Text style={styles.nameUser}>{element.nameUser}</Text>
        <Text style={styles.day}>{element.createdAt.slice(0, 10)}</Text>
        <Text style={styles.content}>{element.content}</Text>
      </View>
    )
  }
  return (
    <LinearGradient 
    colors={['#333333', '#e9d362']}
    style = {styles.container}>
      <StatusBar
      barStyle = 'light-content'
      />
      <View style={styles.viewHeader}>
        <View style={styles.textHeader}>
          <Text style={{fontWeight: 'bold', fontSize: 30, color: 'white'}}>Chi Tiết Phim</Text>
        </View>
        <TouchableOpacity 
        onPress={()=> navigation.goBack()}
        style = {styles.iconHeader}>
          <Icon
          name = 'chevron-back-outline'
          size = {24}
          color = {'white'}
          />
        </TouchableOpacity>
      </View>
      <ScrollView 
      pagingEnabled
      bounces = {false}
      horizontal={true}
      ref = {scrollRef}
      style = {styles.viewImage}
      >
        <YoutubePlayer
          height={210}
          width ={screenWidth}
          videoId={dataFilm.idTrailer} 
          />
      {imagesAraay.map(renderImages)}
      </ScrollView>
      <View style={styles.view2}>
        <ScrollView
        bounces={false}
        >
          <View style = {styles.viewName}>
            <Text style={styles.TextName}>{dataFilm.nameVn}</Text>
          </View>
          <View style = {styles.viewButton}>
              <TouchableOpacity
              onPress={ButtonLikeHandler}
              >
                <Icon
                name = {checkLike?'ios-heart-outline':'ios-heart-sharp'}
                size = {35}
                />
              </TouchableOpacity>

              <TouchableOpacity 
              style = {styles.buttonPlay}
              onPress = {playHandler} 
              >
                <Icon
                name='ios-play-circle-outline'
                size ={30}
                />
                <Text>Xem Phim </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Icon2
                onPress={ButtonPlayListHandler}
                name = {checkList?'playlist-plus':'playlist-check'}
                size = {35}
                />
              </TouchableOpacity>
          </View>
          <View style={styles.viewButtonDetailsCmts}>
              <TouchableOpacity
                style = {[styles.buttonDetailsCmts,{backgroundColor: colorButtonDetails}]}
                onPress = {()=>{
                  setColorButtonDetails('#f85032')
                  setColorButtonCmts('#BBAA56')
                  setShowDetails(true)
                  setShowCmts(false)
                }}
              >
                <Text style={styles.textButtonDetailsCmts}>Giới Thiệu</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style = {[styles.buttonDetailsCmts,{backgroundColor: colorButtonCmts}]}
                onPress = {()=>{
                  setColorButtonDetails('#BBAA56')
                  setColorButtonCmts('#f85032')
                  setShowDetails(false)
                  setShowCmts(true)
                }}
              >
                <Text style={styles.textButtonDetailsCmts}>Bình Luận({dataCmtsFilm.length!=0 ? dataCmtsFilm.length : 0})</Text>
              </TouchableOpacity>
            </View>
          {showDetails&&<View style={styles.ViewAllDetails}>
            <View style = {{flexDirection: 'row', marginTop: 10}}>
              <View style={styles.viewAvt}>
                <Image 
                source={{uri: `${url}/images/${dataFilm.idImageVideo}/0.jpeg`}}
                style={styles.imageAvt}
                resizeMode = 'stretch'
                />
              </View>
              <View style ={styles.viewDetails}>
                <Text style= {styles.textNameEn}>{dataFilm.nameEn}</Text>
                <Text>Đánh Giá: {dataFilm.point}</Text>
                <Text>Trạng Thái: {dataFilm.status}</Text>
                <Text>Loại Phim: {dataFilm.type}</Text>
                <Text>Quốc Gia: {dataFilm.country}</Text>
                <Text>Thời Lượng: {dataFilm.durations} phút</Text>
                <Text>Ngày Ra Mắt: {dataFilm.releaseDay} </Text>
              </View>
            </View>
            <View style={styles.viewContent}>
              <Text style={styles.titleContent}>Nôi Dung Phim:</Text>
              <Text>{dataFilm.content}</Text>
              <Text style={styles.textCast}>Diễn Viên Nổi Bật</Text>
              <ScrollView
              horizontal= {true}
              >
                {dataCastFilm.map(renderCast)}
              </ScrollView>
            </View>
          </View>}
        {showCmts&&
        <View style={styles.viewCmts}>
          <View style={styles.viewInput}>
            <TextInput
            paddingLeft={10}
            autoCapitalize = 'none'
            clearButtonMode = 'while-editing'
            selectionColor = 'white'
            placeholderTextColor={'white'}
            spellCheck = {false}
            style = {[styles.boxInput, { width: screenWidth/10*8}]}
            placeholder = {cmt}
            onChangeText = {setCmt}
            />
            <TouchableOpacity>
              <Icon
              name = 'arrow-redo'
              size = {30}
              onPress = {ButtonCmtHandler}
              />
            </TouchableOpacity>
          </View>
          {showCmtsFilm&&
          <ScrollView
          style={{height:screenHeight/10*4, marginBottom: 30}}>
            {dataCmtsFilm.map(renderCmts)}
          </ScrollView>}
        </View>}
        </ScrollView>
      </View>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewHeader: {
    flex: 0.2,
    marginTop: 30,
  },
  viewImage: {
    flex: 1
  },
  view2: {
    flex: 2.3,
  },
  iconHeader: {
    position: 'absolute',
    marginLeft: 10,
    marginTop: 10,
  },
  textHeader: {
    marginTop: 5,
    alignItems: 'center',
  },
  ImageBackground: {
    // height: 210,
  },
  viewName: {
    // justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },
  TextName: {
    textAlign: 'center',
    fontSize: 27,
    fontWeight: 'bold',
    color: '#f85032'
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonPlay: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#f85032',
    borderRadius: 20,
    shadowOpacity: 0.55,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowRadius: 4.5,
  },
  imageAvt: {
    width: 100, 
    height: 150,
    borderRadius: 20,
    marginBottom: 10,
  },
  viewAvt: {
    shadowOpacity: 0.55,
    marginLeft: 10,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowRadius: 4.5,
  },
  viewDetails: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  textNameEn: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewContent: {
    marginHorizontal: 10,
    // marginBottom: 30,
  },
  titleContent: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  viewCast: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    marginBottom:30
  },
  textCast: {
    marginTop: 10,
    fontSize: 16,
    color: '#c31432',
    fontWeight: 'bold',
  },
  viewImageCast: {
    marginBottom: 10,
    shadowOpacity: 0.55,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowRadius: 4.5,
  },
  imagesCast: {
    height: 70,
    width: 70,
    borderRadius: 30,
  },
  nameCast: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewButtonDetailsCmts: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 40,
    marginTop: 10,
    shadowOpacity: 0.55,
    shadowOffset: {
      height: 5,
      width: 5,
    },
  },
  buttonDetailsCmts: {
    height: 30,
    width: 115,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  textButtonDetailsCmts: {
    color: 'white',
  },
  viewCmts: {
    flex: 1,
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
  boxInput: {
    color: 'white',
    height: 40,
    marginRight:10,
    borderWidth: 1,
    borderRadius: 5,
    shadowOpacity: 5,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 5,
  },
  itemCmts: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  nameUser: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  day: {
    fontSize: 12,
    color: 'gray'
  },
  content: {
    fontSize: 16,
    color: 'white',
  }
})
export default DetailsScreen