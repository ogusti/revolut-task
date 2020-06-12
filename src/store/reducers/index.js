import types from '../actions/actionTypes';

const initialState = {
  wallet: {
    EUR: { currency: 'EUR', amount: 200 },
    USD: { currency: 'USD', amount: 12000 },
    GBP: { currency: 'GBP', amount: 10 },
  },
  operationsHistory: [
    {
      from: { currency: 'GBP', amount: 100 },
      to: { currency: 'USD', amount: 120 },
      date: 1591604300973,
    },
    {
      from: { currency: 'USD', amount: 23 },
      to: { currency: 'EUR', amount: 4 },
      date: 1591604300973,
    },
  ],
  exchangeRates: {
    EUR: 18.8935,
    USD: 1.1294,
    GBP: 0.8912,
  },
  amount: null,
  currencyFrom: 'USD',
  currencyTo: 'EUR',
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_EXCHANGE_RATES:
      return {
        ...state,
        exchangeRates: action.exchangeRates,
      };
    case types.UPDATE_WALLET:
      return { ...state, wallet: action.updatedWallet };
    case types.UPDATE_HISTORY:
      return { ...state, operationsHistory: action.updatedHistory };
    case types.CHANGE_CURRENCY_FROM:
      return { ...state, currencyFrom: action.currencyFrom };
    case types.CHANGE_CURRENCY_TO:
      return { ...state, currencyTo: action.currencyTo };
    default:
      return state;
  }
}
