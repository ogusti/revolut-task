const validateNumber = (wallet, currencyFrom, number) => {
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

  const moreThanTwoDigitsAfterDecimal = (value) => {
    const isInt = value % 1 === 0;
    if (isInt) {
      return false;
    } else {
      const toString = value.toString();
      const [, decimals] = toString.split('.');
      return decimals.length > 2;
    }
  };

  if (moreThanTwoDigitsAfterDecimal(number)) {
    return {
      validateStatus: 'error',
      errorMessage: 'Must be less than two digits after decimal',
    };
  }

  if (number > wallet[currencyFrom].amount) {
    return {
      validateStatus: 'error',
      errorMessage: `Must be less than ${wallet[currencyFrom].symbol}${wallet[currencyFrom].amount}`,
    };
  } else
    return {
      validateStatus: 'success',
      errorMessage: null,
    };
};

export default validateNumber;
