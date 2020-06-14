import React from 'react';
import { Layout, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import Wallet from './components/Wallet';
import Converter from './components/Converter';
import OperationsHistory from './components/OperationsHistory';
import ErrorPage from './components/ErrorPage';
import './App.css';

const App = () => {
  const hasError = useSelector((state) => state.error);

  return hasError ? (
    <ErrorPage />
  ) : (
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
};

export default App;
