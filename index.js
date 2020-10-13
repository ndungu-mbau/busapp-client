/**
 * @format
 */
import React from 'react'
import {AppRegistry} from 'react-native';
import { StyleProvider } from 'native-base'
import getTheme from './native-base-theme/components'
import App from './App';
import {name as appName} from './app.json';

const AppWithTheme = () => {
  return (
  <StyleProvider style={getTheme()}>
    <App></App>
  </StyleProvider>)
}

AppRegistry.registerComponent(appName, () => AppWithTheme);
