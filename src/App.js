import React from 'react';
import { connect } from 'react-redux';
import {
  fetchExchangeRates,
  changeCurrencyFrom,
  changeCurrencyTo,
  onChangeAmountField,
  exchangeCurrency,
} from './store/actions';
import { Layout } from 'antd';
import Wallet from './Components/Wallet';
import Converter from './Components/Converter';
import OperationsHistory from './Components/OperationsHistory';
import './App.css';

const App = (props) => {
  return (
    <Layout className="app">
      <Wallet />
      <Converter />
      <OperationsHistory />
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchExchangeRatesData: () => {
    dispatch(fetchExchangeRates());
  },
  updateCurrencyFrom: (updatedCurrency) => {
    dispatch(changeCurrencyFrom(updatedCurrency));
  },
  updateCurrencyTo: (updatedCurrency) => {
    dispatch(changeCurrencyTo(updatedCurrency));
  },
  onChangeAmount: (updatedAmount) => {
    dispatch(onChangeAmountField(updatedAmount));
  },
  onExchangeCurrency: () => {
    dispatch(exchangeCurrency());
  },
});

const mapStateToProps = (state) => ({
  isLoaded: state.isLoaded,
  exchangeRates: state.exchangeRates,
  currencyFrom: state.currencyFrom,
  currencyTo: state.currencyTo,
  amount: state.amount,
  wallet: state.wallet,
  operationsHistory: state.operationsHistory,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
