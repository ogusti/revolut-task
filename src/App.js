import React from 'react';
import { Layout, Row, Col } from 'antd';
import Wallet from './components/Wallet';
import Converter from './components/Converter';
import OperationsHistory from './components/OperationsHistory';
import './App.css';

const App = () => (
  <Row justify="center">
    <Col span={18}>
      <Layout className="app">
        <Wallet />
        <Converter />
        <OperationsHistory />
      </Layout>
    </Col>
  </Row>
);

export default App;
