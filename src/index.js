import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import configFunction from './configurations'
import 'bootstrap/dist/css/bootstrap.min.css';

const configs = configFunction()

ReactDOM.render(
  <Provider store={configs.store}>
    <PersistGate loading={null} persistor={configs.persistor}>
      <App />
    </PersistGate>
  </Provider>

  , document.getElementById('root')
);