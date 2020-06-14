import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import {
  Layout,
  Row,
  Button,
  Select,
  Form,
  Statistic,
  InputNumber,
  Tooltip,
} from 'antd';
import {
  SwapOutlined,
  ArrowRightOutlined,
  InfoCircleTwoTone,
} from '@ant-design/icons';
import {
  fetchExchangeRates,
  changeCurrencyFrom,
  changeCurrencyTo,
  exchangeCurrency,
} from '../../store/actions';
import validateNumber from './validateNumber';
import './Converter.css';

const { Content } = Layout;
const { Option } = Select;
const { Item } = Form;

const Converter = (props) => {
  const [typedAmount, setNumber] = useState({ value: null });
  const [lastUpdate, setLastUpdate] = useState(null);
  const [form] = Form.useForm();

  const {
    getExchangeRates,
    currencyFrom,
    currencyTo,
    exchangeRates,
    updateCurrencyFrom,
    updateCurrencyTo,
    onExchangeCurrency,
    wallet,
  } = props;

  const onNumberChange = useCallback(
    (value) => {
      setNumber({ ...validateNumber(wallet, currencyFrom, value), value });
    },
    [currencyFrom, wallet]
  );

  useEffect(() => {
    getExchangeRates();
    setLastUpdate(Date.now());
    const interval = setInterval(() => {
      getExchangeRates();
      setLastUpdate(Date.now());
    }, 10000);
    return () => clearInterval(interval);
  }, [getExchangeRates, currencyFrom]);

  useEffect(() => {
    typedAmount.value !== null && onNumberChange(typedAmount.value);
  }, [currencyFrom, currencyTo, typedAmount.value, onNumberChange]);

  const onFinish = () => {
    form.resetFields();
    setNumber({ value: null });
    onExchangeCurrency(typedAmount.value);
  };

  const currenciesDropdown = Object.entries(wallet).map(([, value]) => (
    <Option key={value.currency} value={value.currency}>
      {value.currency}
    </Option>
  ));

  return (
    <Content className="converter">
      <div className="converter__currency-rate">
        <Statistic
          className="converter__currency-rate-from"
          prefix={wallet[currencyFrom].symbol}
          value={1}
          suffix="="
        />
        <Statistic
          prefix={wallet[currencyTo].symbol}
          value={exchangeRates[currencyTo]}
          precision={5}
          suffix={
            <Tooltip
              title={
                <span>updated at {dayjs(lastUpdate).format('HH:mm:ss')}</span>
              }
            >
              <InfoCircleTwoTone />
            </Tooltip>
          }
        />
      </div>
      <Form onFinish={onFinish} size="large" form={form}>
        <Row>
          <Item>
            <Select
              onChange={(value) => {
                updateCurrencyFrom(value);
                value === currencyTo && updateCurrencyTo(currencyFrom);
              }}
              value={currencyFrom}
            >
              {currenciesDropdown}
            </Select>
          </Item>
          <Item
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
              step={0.1}
            />
          </Item>
          <Item>
            <Button
              className="converter__swap-button"
              onClick={() => {
                updateCurrencyFrom(currencyTo);
                updateCurrencyTo(currencyFrom);
              }}
              icon={<SwapOutlined />}
            />
          </Item>
          <Item>
            <Select
              onChange={(value) => {
                updateCurrencyTo(value);
                value === currencyFrom && updateCurrencyFrom(currencyTo);
              }}
              value={currencyTo}
            >
              {currenciesDropdown}
            </Select>
          </Item>
          <Item>
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
          </Item>
        </Row>
      </Form>
      <div className="converter__result">
        {typedAmount.validateStatus === 'success' && (
          <Statistic
            value={typedAmount.value * exchangeRates[currencyTo]}
            prefix={wallet[currencyTo].symbol}
            precision={2}
          />
        )}
      </div>
    </Content>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getExchangeRates: () => {
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
