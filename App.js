/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import { useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';


import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'

import AppNavigator from './src/navigator'
import configureStore from './src/store'

const store = configureStore()

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
   <Provider store={store} >
     <NavigationContainer>
       <AppNavigator />
     </NavigationContainer>
   </Provider>
  );
};

export default App;

