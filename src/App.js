import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import Routers from './Routers';
import {LogBox} from "react-native";

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
])


const App = () => {
  return (
    <Routers/>
  )
}

export default App