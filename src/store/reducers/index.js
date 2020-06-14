import types from '../actions/actionTypes';

const initialWallet = {
  EUR: { currency: 'EUR', amount: 200, symbol: '€' },
  USD: { currency: 'USD', amount: 12000, symbol: '$' },
  GBP: { currency: 'GBP', amount: 10, symbol: '£' },
};

const initialOperationHistory = [
  {
    from: {
      currency: 'GBP',
      amount: 10,
      symbol: '£',
    },
    to: {
      currency: 'USD',
      amount: 12.608613209,
      symbol: '$',
    },
    date: 1592134794051,
  },
  {
    from: {
      currency: 'EUR',
      amount: 120,
      symbol: '€',
    },
    to: {
      currency: 'USD',
      amount: 135.648,
      symbol: '$',
    },
    date: 1592134763930,
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
    date: 1592130331240,
  },
];

const initialState = {
  wallet: initialWallet,
  operationsHistory: initialOperationHistory,
  exchangeRates: {},
  currencyFrom: 'USD',
  currencyTo: 'EUR',
  error: false,
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
    case types.SET_ERROR:
      return { ...state, error: true };
    default:
      return state;
  }
}
