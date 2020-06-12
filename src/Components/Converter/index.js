import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  fetchExchangeRates,
  changeCurrencyFrom,
  changeCurrencyTo,
  exchangeCurrency,
} from '../../store/actions';
import {
  Layout,
  Row,
  Button,
  Select,
  Form,
  Statistic,
  InputNumber,
} from 'antd';
import { SwapOutlined, ArrowRightOutlined } from '@ant-design/icons';
import './Converter.css';

const { Content } = Layout;

const values = [
  { value: 'USD', symbol: '$' },
  { value: 'EUR', symbol: '€' },
  { value: 'GBP', symbol: '£' },
];

const { Option } = Select;

const Converter = (props) => {
  const [typedAmount, setNumber] = useState({ value: null });
  const [form] = Form.useForm();

  const {
    fetchExchangeRatesData,
    currencyFrom,
    currencyTo,
    exchangeRates,
    updateCurrencyFrom,
    updateCurrencyTo,
    onExchangeCurrency,
    wallet,
  } = props;

  const validateNumber = useCallback(
    (number) => {
      if (wallet[currencyFrom].amount === 0) {
        return {
          validateStatus: 'error',
          errorMessage: `you're out of ${currencyFrom}`,
        };
      }
      if (number <= 0) {
        return {
          validateStatus: 'error',
          errorMessage: 'Must be more than 0 ',
        };
      }
      if (number > wallet[currencyFrom].amount) {
        return {
          validateStatus: 'error',
          errorMessage: `Must be less then ${currencySymbol(currencyFrom)}${
            wallet[currencyFrom].amount
          }`,
        };
      } else
        return {
          validateStatus: 'success',
          errorMessage: null,
        };
    },
    [currencyFrom, wallet]
  );

  const onNumberChange = useCallback(
    (value) => {
      setNumber({ ...validateNumber(value), value });
    },
    [validateNumber]
  );

  useEffect(() => {
    fetchExchangeRatesData();
    // const interval = setInterval(() => fetchExchangeRatesData(), 10000);

    // return () => clearInterval(interval);
  }, [fetchExchangeRatesData]);

  useEffect(() => {
    typedAmount.value !== null && onNumberChange(typedAmount.value);
  }, [currencyFrom, currencyTo, typedAmount.value, onNumberChange]);

  const currencySymbol = (currency) =>
    values.find(({ value }) => value === currency).symbol;

  const onFinish = () => {
    form.resetFields();
    setNumber({ value: null });
    onExchangeCurrency(typedAmount.value);
  };

  return (
    <Content className="converter">
      <div>
        1 {currencySymbol(currencyFrom)} = {exchangeRates[currencyTo]}{' '}
        {currencySymbol(currencyTo)}
      </div>
      <Form onFinish={onFinish} size="large" form={form}>
        <Row>
          <Form.Item>
            <Select
              onChange={(value) => {
                updateCurrencyFrom(value);
                value === currencyTo && updateCurrencyTo(currencyFrom);
              }}
              value={currencyFrom}
            >
              {values.map((item) => (
                <Option key={item.value} value={item.value}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="amountValue"
            validateStatus={typedAmount.validateStatus}
            help={typedAmount.errorMessage}
          >
            <InputNumber
              className="converter__input"
              onChange={onNumberChange}
              autoFocus
              value={typedAmount.value}
              type="number"
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="converter__swap-button"
              onClick={() => {
                updateCurrencyFrom(currencyTo);
                updateCurrencyTo(currencyFrom);
              }}
              icon={<SwapOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Select
              onChange={(value) => {
                updateCurrencyTo(value);
                value === currencyFrom && updateCurrencyFrom(currencyTo);
              }}
              value={currencyTo}
            >
              {values.map((item) => (
                <Option key={item.value} value={item.value}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              className="converter__exchange-button"
              type="primary"
              htmlType="submit"
              icon={<ArrowRightOutlined />}
              disabled={
                !form.isFieldsTouched() ||
                typedAmount.validateStatus === 'error'
              }
            />
          </Form.Item>
        </Row>
      </Form>
      <div className="converter__result">
        {typedAmount.validateStatus === 'success' && (
          <Statistic
            value={typedAmount.value * exchangeRates[currencyTo]}
            prefix={currencySymbol(currencyTo)}
          />
        )}
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
  onExchangeCurrency: (number) => {
    dispatch(exchangeCurrency(number));
  },
});

const mapStateToProps = (state) => ({
  exchangeRates: state.exchangeRates,
  currencyFrom: state.currencyFrom,
  currencyTo: state.currencyTo,
  wallet: state.wallet,
});

export default connect(mapStateToProps, mapDispatchToProps)(Converter);
