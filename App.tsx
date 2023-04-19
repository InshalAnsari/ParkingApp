import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types';
import SlotsInput from './src/screens/SlotsInput';
import BookedSlots from './src/screens/BookedSlots';
const {Navigator , Screen} = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
    <Navigator initialRouteName="SlotsInput" screenOptions={{
      headerShown:false
    }}>
      <Screen name="SlotsInput" component={SlotsInput} />
      <Screen name="BookedSlots" component={BookedSlots} />
    </Navigator>
  </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})