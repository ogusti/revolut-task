import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import {
  fetchExchangeRates,
  changeCurrencyFrom,
  changeCurrencyTo,
  onChangeAmountField,
  exchangeCurrency,
} from '../../store/actions';
import { Layout } from 'antd';
import './OperationsHistory.css';

const { Footer } = Layout;

const OperationsHistory = (props) => {
  const {
    fetchExchangeRatesData,
    currencyFrom,
    currencyTo,
    wallet,
    operationsHistory,
  } = props;

  useEffect(() => {
    fetchExchangeRatesData();
    // setInterval(() => fetchExchangeRatesData(), 10000);
  }, [fetchExchangeRatesData, currencyFrom, currencyTo, wallet]);

  return (
    <Footer>
      <ul className="history">
        {operationsHistory.map((operation, index) => (
          <li
            className="history__operation"
            key={`${operation.date} + ${index}`}
          >
            <div>{dayjs(operation.date).format('MM/DD/YYYY, h:mm')}</div>
            <div>
              -{operation.from.amount} {operation.from.currency}
            </div>
            <div>
              +{operation.to.amount} {operation.to.currency}
            </div>
          </li>
        ))}
      </ul>
    </Footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(OperationsHistory);
