console.log('APP ENTRYPOINT: App.tsx loaded');

import 'react-native-url-polyfill/auto';
import { decode as atob, encode as btoa } from 'base-64';

if (!global.atob) global.atob = atob;
if (!global.btoa) global.btoa = btoa;

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/store';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ReduxProvider>
  );
}
