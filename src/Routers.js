import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FirstScreen from './Screens/FirstScreen';
import SignUpScreen from './Screens/SignUpScreen';
import SignInScreen from './Screens/SignInScreen';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import SearchScreen from './Screens/SearchScreen';
import PlaylistScreen from './Screens/PlaylistScreen';
import DetailsScreen from './Screens/DetailsScreen';
import PlayScreen from './Screens/PlayScreen';
import Token from './Screens/Token';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import Icon from 'react-native-vector-icons/AntDesign'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel:false,
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
        tabBarActiveBackgroundColor: "white",
        tabBarStyle: {
          height: 50,
          position: 'absolute',
          marginHorizontal: 40,
          marginBottom: 25,
          // borderTopWidth: 1,
          // borderTopColor: 'black',
          // borderWidth: 1,
          backgroundColor: '#7CDFF6',
          borderRadius: 20,
          // elevation: 5,
          // shadowColor: 'white',
          shadowOpacity: 0.55,
          shadowOffset: {
            width: 5,
            height: 10,
          },
          shadowRadius: 4.5,
          
        }
      }}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarItemStyle: {
            marginVertical: 5,
            marginLeft: 10,
            height: 40,
            borderRadius: 20,
          },
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={26} color={color} />
          ),
        }}/>
      <Tab.Screen name="SearchScreen" component={SearchScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarItemStyle: {
            marginVertical: 5,
            height: 40,
            borderRadius: 20,
          },
          tabBarIcon: ({ color }) => (
            <Icon name="search1" color= {color} size={26} />
          ),
        }}/>
      <Tab.Screen name="PlaylistScreen" component={PlaylistScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarItemStyle: {
            marginVertical: 5,
            height: 40,
            borderRadius: 20,
          },
          tabBarIcon: ({ color }) => (
            <Icon name="menu-fold" color= {color} size={26} />
          ),
        }}/>
      <Tab.Screen name="ProfileScreen" component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarItemStyle: {
            marginVertical: 5,
            height: 40,
            borderRadius: 20,
            marginRight: 10,
          },
          tabBarIcon: ({ color }) => (
            <Icon name="user" color= {color} size={26} />
          ),
        }}/>
    </Tab.Navigator>
  );
}

export default function Routers() {
  return (
      <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator screenOptions= {{headerShown : false}}>
                <Stack.Screen name='Token' component={Token}/>
                <Stack.Screen name='FirstScreen' component={FirstScreen}/>
                <Stack.Screen name='SignUpScreen' component={SignUpScreen}/>
                <Stack.Screen name='SignInScreen' component={SignInScreen}/>
                <Stack.Screen name='DetailsScreen' component={DetailsScreen}/>
                <Stack.Screen name='PlayScreen' component={PlayScreen}/>
                <Stack.Screen name='HomeTab' component={HomeTab}/>
            </Stack.Navigator>
        </NavigationContainer>
      </Provider>
  );
}