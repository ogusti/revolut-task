import React from 'react';
import { Layout } from 'antd';
import Wallet from './components/Wallet';
import Converter from './components/Converter';
import OperationsHistory from './components/OperationsHistory';
import './App.css';

const App = () => (
  <Layout className="app">
    <Wallet />
    <Converter />
    <OperationsHistory />
  </Layout>
);

export default App;
