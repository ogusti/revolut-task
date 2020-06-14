import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from './store/reducers';
import App from './App';

const isProduction = process.env.NODE_ENV === 'production';

const logger =
  !isProduction &&
  createLogger({
    collapsed: true,
  });

const store = isProduction
  ? createStore(reducers, applyMiddleware(thunk))
  : createStore(reducers, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
