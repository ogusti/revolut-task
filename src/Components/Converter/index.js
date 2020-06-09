import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchExchangeRates,
  changeCurrencyFrom,
  changeCurrencyTo,
  onChangeAmountField,
  exchangeCurrency,
} from '../../store/actions';
import {
  Layout,
  Row,
  Col,
  Button,
  Select,
  Radio,
  Typography,
  Form,
  InputNumber,
} from 'antd';
import './Converter.css';

const { Content } = Layout;

const values = [
  { value: 'USD', symbol: '$' },
  { value: 'EUR', symbol: '€' },
  { value: 'GBP', symbol: '£' },
];

const { Option } = Select;

const Converter = (props) => {
  const {
    fetchExchangeRatesData,
    currencyFrom,
    exchangeRates,
    isLoaded,
    currencyTo,
    updateCurrencyFrom,
    updateCurrencyTo,
    amount,
    onChangeAmount,
    wallet,
    onExchangeCurrency,
  } = props;

  useEffect(() => {
    fetchExchangeRatesData();
    // setInterval(() => fetchExchangeRatesData(), 10000);
  }, [fetchExchangeRatesData, currencyFrom, currencyTo, wallet]);

  const currencySymbol = (currency) =>
    values.find(({ value }) => value === currency).symbol;

  return (
    <Content className="converter">
      {isLoaded && (
        <div>
          1 {currencySymbol(currencyFrom)} = {exchangeRates.rates[currencyTo]}{' '}
          {currencySymbol(currencyTo)}
        </div>
      )}
      <div>
        <div>
          <InputNumber
            with={500}
            defaultValue={1000}
            min={0}
            max={1000} //??
            step={1}
            // formatter={(value) => {
            //   return value.replace('00', '');
            // }}
            // parser={(value) => {
            //   return value.replace('00', '');
            // }}
            onChange={onChangeAmount}
            autoFocus
            value={amount} // ??
            size="large"
          />
          <Select
            onChange={(value) => {
              updateCurrencyFrom(value);
              value === currencyTo && updateCurrencyTo(currencyFrom);
            }}
            value={currencyFrom}
            size="large"
          >
            {values.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.value}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          {isLoaded && <span>{amount * exchangeRates.rates[currencyTo]}</span>}
          <Select
            onChange={(value) => {
              updateCurrencyTo(value);
              value === currencyFrom && updateCurrencyFrom(currencyTo);
            }}
            value={currencyTo}
            size="large"
          >
            {values.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.value}
              </Option>
            ))}
          </Select>
        </div>
        <Button onClick={onExchangeCurrency} type="primary">
          Exchange
        </Button>
      </div>
    </Content>
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

export default connect(mapStateToProps, mapDispatchToProps)(Converter);
