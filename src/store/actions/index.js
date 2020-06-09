import axios from 'axios';
import types from './actionTypes';

export function fetchData() {
  return { type: types.FETCH_DATA };
}

export function setExchangeRates(exchangeRates) {
  return { type: types.SET_EXCHANGE_RATES, exchangeRates };
}

export function changeCurrencyFrom(currencyFrom) {
  return { type: types.CHANGE_CURRENCY_FROM, currencyFrom };
}

export function changeCurrencyTo(currencyTo) {
  return { type: types.CHANGE_CURRENCY_TO, currencyTo };
}

export function onChangeAmountField(amount) {
  return { type: types.SET_AMOUNT, amount };
}

export function updateHistory(updatedHistory) {
  return { type: types.UPDATE_HISTORY, updatedHistory };
}

export function updateWallet(updatedWallet) {
  return { type: types.UPDATE_WALLET, updatedWallet };
}

export function fetchExchangeRates() {
  return async (dispatch, getState) => {
    const { currencyFrom } = getState();
    dispatch(fetchData());

    const { data } = await axios.get('https://api.exchangeratesapi.io/latest', {
      params: {
        base: currencyFrom,
      },
    });

    dispatch(setExchangeRates(data));
  };
}

export function exchangeCurrency(data) {
  return (dispatch, getState) => {
    const {
      currencyFrom,
      currencyTo,
      operationsHistory,
      wallet,
      amount,
      exchangeRates,
    } = getState();

    const currencyFromInWallet = wallet[currencyFrom];
    const currencyToInWallet = wallet[currencyTo];
    const fromResult = currencyFromInWallet.amount - amount;
    const toResult =
      currencyToInWallet.amount + amount * exchangeRates.rates[currencyTo];
    const updatedCurrencyFromInWallet = {
      ...currencyFromInWallet,
      amount: fromResult,
    };
    const updatedCurrencyToInWallet = {
      ...currencyToInWallet,
      amount: toResult,
    };

    const operationInfo = {
      from: updatedCurrencyFromInWallet,
      to: updatedCurrencyToInWallet,
      date: Date.now(),
    };

    dispatch(
      updateWallet({
        ...wallet,
        [currencyFrom]: updatedCurrencyFromInWallet,
        [currencyTo]: updatedCurrencyToInWallet,
      })
    );

    dispatch(updateHistory([...operationsHistory, operationInfo]));
  };
}
