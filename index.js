/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from '@/src/App';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';
import React from 'react';
import store from '@/src/lib/reduxToolkit/store';
const MainApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => MainApp);
