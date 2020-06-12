import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import './Wallet.css';

const { Header } = Layout;

const values = [
  { value: 'USD', symbol: '$' },
  { value: 'EUR', symbol: '€' },
  { value: 'GBP', symbol: '£' },
];

const Wallet = (props) => {
  const { wallet } = props;

  const currencySymbol = (currency) =>
    values.find(({ value }) => value === currency).symbol;

  return (
    <Header className="wallet">
      <div className="wallet__card">
        <div>{wallet.EUR.currency}</div>
        <div>
          {wallet.EUR.amount} {currencySymbol(wallet.EUR.currency)}
        </div>
      </div>
      <div className="wallet__card">
        <div>{wallet.USD.currency}</div>
        <div>
          {wallet.USD.amount} {currencySymbol(wallet.USD.currency)}
        </div>
      </div>
      <div className="wallet__card">
        <div>{wallet.GBP.currency}</div>
        <div>
          {wallet.GBP.amount} {currencySymbol(wallet.GBP.currency)}
        </div>
      </div>
    </Header>
  );
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Wallet);
