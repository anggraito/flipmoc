/* eslint-disable react-native/no-inline-styles */
import * as React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

import SplaschScreen from './modul/component'
import TransactionList from './modul/component/Transaction/TransactionList'
import TransactionDetail from './modul/component/Transaction/TransactionDetail'

const Stack = createStackNavigator();

const navigationScreen = [
  { name: 'SplashScreen', component: SplaschScreen,
    option: { headerTransparent: true },
  },
  { name: 'TransactionListScreen', component: TransactionList },
  { name: 'TransactionDetailScreen', component: TransactionDetail },

];

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      {navigationScreen.map((pages, idx) => {
        return (
        <Stack.Screen
          key={idx}
          options={{headerShown: false}}
          //options={pages.option}
          {...pages}
        />
      )})}
    </Stack.Navigator>
  );
}

export default AppNavigator;
