import axios from 'axios';
import types from './actionTypes';

export function setExchangeRates(exchangeRates) {
  return { type: types.SET_EXCHANGE_RATES, exchangeRates };
}

export function changeCurrencyFrom(currencyFrom) {
  return { type: types.CHANGE_CURRENCY_FROM, currencyFrom };
}

export function changeCurrencyTo(currencyTo) {
  return { type: types.CHANGE_CURRENCY_TO, currencyTo };
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

    const {
      data: { rates },
    } = await axios.get('https://api.exchangeratesapi.io/latest', {
      params: {
        base: currencyFrom,
      },
    });

    dispatch(setExchangeRates(rates));
  };
}

export function exchangeCurrency(amount) {
  return (dispatch, getState) => {
    const {
      currencyFrom,
      currencyTo,
      operationsHistory,
      wallet,
      exchangeRates,
    } = getState();

    const walletFrom = wallet[currencyFrom];
    const walletTo = wallet[currencyTo];

    const subtrahendAmount = amount;
    const sumAmount = amount * exchangeRates[currencyTo];

    const updatedWalletFrom = {
      ...walletFrom,
      amount: walletFrom.amount - subtrahendAmount,
    };
    const updatedWalletTo = {
      ...walletTo,
      amount: walletTo.amount + sumAmount,
    };

    const historyFrom = {
      ...walletFrom,
      amount: subtrahendAmount,
    };
    const historyTo = {
      ...walletTo,
      amount: sumAmount,
    };

    const operationInfo = {
      from: historyFrom,
      to: historyTo,
      date: Date.now(),
    };

    dispatch(
      updateWallet({
        ...wallet,
        [currencyFrom]: updatedWalletFrom,
        [currencyTo]: updatedWalletTo,
      })
    );

    dispatch(updateHistory([operationInfo, ...operationsHistory]));
  };
}
