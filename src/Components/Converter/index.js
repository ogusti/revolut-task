import React, { useEffect, useState } from 'react';
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
  Input,
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

const regex = /^(?!0\.00)[1-9]\d{0,2}(,\d{3})*(\.\d\d)?$/gm;

function validatePrimeNumber(number) {
  if (number === 11) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }

  return {
    validateStatus: 'error',
    errorMsg: 'The prime between 8 and 12 is 11!',
  };
}

const Converter = (props) => {
  const [number, setNumber] = useState({
    value: 11,
  });
  const [form] = Form.useForm();

  const tips =
    'A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself.';

  const onNumberChange = (value) => {
    setNumber({ ...validatePrimeNumber(value), value });
  };

  const {
    fetchExchangeRatesData,
    currencyFrom,
    exchangeRates,
    currencyTo,
    updateCurrencyFrom,
    updateCurrencyTo,
    amount,
    onChangeAmount,
    onExchangeCurrency,
    wallet,
  } = props;

  useEffect(() => {
    fetchExchangeRatesData();
    // const interval = setInterval(() => fetchExchangeRatesData(), 10000);

    // return () => clearInterval(interval);
  }, [fetchExchangeRatesData]);

  const currencySymbol = (currency) =>
    values.find(({ value }) => value === currency).symbol;

  const hasValidationErrors =
    !form.isFieldsTouched() ||
    form.getFieldsError().filter(({ errors }) => errors.length).length;

  return (
    <Content className="converter">
      <div>
        1 {currencySymbol(currencyFrom)} = {exchangeRates[currencyTo]}{' '}
        {currencySymbol(currencyTo)}
      </div>
      <div>
        <Form size="large" form={form}>
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
              rules={[
                { required: true, message: 'Please input amount of money' },
                {
                  type: 'number',
                  min: 1,
                  message: 'Price must be greater than zero',
                },
                {
                  type: 'number',
                  max: wallet[currencyFrom].amount,
                  message: 'You dont have such money',
                },
              ]}
            >
              <InputNumber
                className="converter__input"
                min={0}
                max={wallet[currencyFrom].amount}
                // formatter={(value) => {
                //   return value.replace(regex, '');
                // }}
                // parser={(value) => {
                //   return value.replace(regex, '');
                // }}
                onChange={onChangeAmount}
                autoFocus
                value={amount} // ??
                suffix={currencySymbol(currencyFrom)}
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
                onClick={() => {
                  onExchangeCurrency();
                }}
                type="primary"
                icon={<ArrowRightOutlined />}
                disabled={hasValidationErrors}
              />
            </Form.Item>
          </Row>
        </Form>
      </div>
      <div className="converter__result">
        {() => form.validateFields()}
        {console.log(form.getFieldError())}
        {!hasValidationErrors && amount > 0 && (
          <Statistic
            value={amount * exchangeRates[currencyTo]}
            precision={2}
            prefix="~"
            suffix={currencySymbol(currencyTo)}
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
  operationsHistory: state.operationsHistory,
  wallet: state.wallet,
});

export default connect(mapStateToProps, mapDispatchToProps)(Converter);
