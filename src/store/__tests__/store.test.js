import axios from 'axios';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import types from '../actions/actionTypes';
import {
  fetchExchangeRates,
  changeCurrencyTo,
  changeCurrencyFrom,
  updateHistory,
  updateWallet,
} from '../actions';

const data = {
  rates: {
    CAD: 1.357661005,
    HKD: 7.7500884643,
    ISK: 134.5541401274,
    PHP: 50.2149681529,
    DKK: 6.59509908,
    HUF: 306.0863411182,
    CZK: 23.6181882519,
    GBP: 0.7931086341,
    RON: 4.2766277424,
    SEK: 9.2978591649,
    IDR: 14205.8032554848,
    INR: 75.8912774239,
    BRL: 5.0767869781,
    RUB: 69.6799363057,
    HRK: 6.6932059448,
    JPY: 107.2717622081,
    THB: 30.9501061571,
    CHF: 0.9463021939,
    EUR: 0.8846426044,
    MYR: 4.2675159236,
    BGN: 1.7301840057,
    TRY: 6.8315640481,
    CNY: 7.0762561925,
    NOK: 9.5961606511,
    NZD: 1.5528131635,
    ZAR: 17.055378627,
    USD: 1,
    MXN: 22.5097310686,
    SGD: 1.3904812456,
    AUD: 1.4549716914,
    ILS: 3.4668259023,
    KRW: 1203.5120311394,
    PLN: 3.9352441614,
  },
  base: 'USD',
  date: '2020-06-12',
};

const updatedWallet = {
  EUR: {
    currency: 'EUR',
    amount: 220.3467799012,
    symbol: '€',
  },
  USD: {
    currency: 'USD',
    amount: 11977,
    symbol: '$',
  },
  GBP: {
    currency: 'GBP',
    amount: 10,
    symbol: '£',
  },
};

const updatedHistory = [
  {
    from: {
      currency: 'USD',
      amount: 23,
      symbol: '$',
    },
    to: {
      currency: 'EUR',
      amount: 20.346779901199998,
      symbol: '€',
    },
    date: 1592067148564,
  },
  {
    from: {
      currency: 'GBP',
      amount: 100,
      symbol: '£',
    },
    to: {
      currency: 'USD',
      amount: 120,
      symbol: '$',
    },
    date: 1591604300973,
  },
  {
    from: {
      currency: 'USD',
      amount: 23,
      symbol: '$',
    },
    to: {
      currency: 'EUR',
      amount: 4,
      symbol: '€',
    },
    date: 1591604300973,
  },
];

const historyAction = {
  type: 'UPDATE_HISTORY',
  updatedHistory,
};

const walletAction = {
  type: 'UPDATE_WALLET',
  updatedWallet,
};

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);
const axiosGet = sinon.stub(axios, 'get');

axiosGet
  .withArgs('https://api.exchangeratesapi.io/latest')
  .resolves({ data: data });

describe('store', () => {
  it('should fetch data, and than set that data in store', () => {
    const store = mockStore({
      exchangeRates: {
        EUR: null,
        USD: null,
        GBP: null,
      },
    });

    const expected = [
      { type: types.SET_EXCHANGE_RATES, exchangeRates: data.rates },
    ];

    store
      .dispatch(fetchExchangeRates('https://api.exchangeratesapi.io/latest'))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('should change currencyFrom ', () => {
    const expectedAction = {
      type: types.CHANGE_CURRENCY_FROM,
      currencyFrom: 'GBP',
    };

    expect(changeCurrencyFrom('GBP')).toEqual(expectedAction);
  });

  it('should change currencyTo ', () => {
    const expectedAction = {
      type: types.CHANGE_CURRENCY_TO,
      currencyTo: 'EUR',
    };

    expect(changeCurrencyTo('EUR')).toEqual(expectedAction);
  });

  it('should update wallet ', () => {
    expect(updateWallet(updatedWallet)).toEqual(walletAction);
  });

  it('should update history ', () => {
    expect(updateHistory(updatedHistory)).toEqual(historyAction);
  });
});
