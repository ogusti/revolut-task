import React from 'react';
import { connect } from 'react-redux';
import {
  fetchExchangeRates,
  changeCurrencyFrom,
  changeCurrencyTo,
  onChangeAmountField,
  exchangeCurrency,
} from '../../store/actions';
import { Layout } from 'antd';
import './Wallet.css';

const { Header } = Layout;

const values = [
  { value: 'USD', symbol: '$' },
  { value: 'EUR', symbol: '€' },
  { value: 'GBP', symbol: '£' },
];

const Wallet = (props) => {
  const { wallet } = props;

  const currencySymbol = (currency) =>
    values.find(({ value }) => value === currency).symbol;

  return (
    <Header className="wallet">
      <div className="wallet__card">
        <div>{wallet.EUR.currency}</div>
        <div>
          {wallet.EUR.amount} {currencySymbol(wallet.EUR.currency)}
        </div>
      </div>
      <div className="wallet__card">
        <div>{wallet.USD.currency}</div>
        <div>
          {wallet.USD.amount} {currencySymbol(wallet.USD.currency)}
        </div>
      </div>
      <div className="wallet__card">
        <div>{wallet.GBP.currency}</div>
        <div>
          {wallet.GBP.amount} {currencySymbol(wallet.GBP.currency)}
        </div>
      </div>
    </Header>
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

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
