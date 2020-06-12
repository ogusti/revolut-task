import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import './Wallet.css';

const { Header } = Layout;

const Wallet = ({ wallet }) => (
  <Header className="wallet">
    <div className="wallet__card">
      <div>{wallet.EUR.currency}</div>
      <div>
        {wallet.EUR.amount} {wallet.EUR.symbol}
      </div>
    </div>
    <div className="wallet__card">
      <div>{wallet.USD.currency}</div>
      <div>
        {wallet.USD.amount} {wallet.USD.symbol}
      </div>
    </div>
    <div className="wallet__card">
      <div>{wallet.GBP.currency}</div>
      <div>
        {wallet.GBP.amount} {wallet.GBP.symbol}
      </div>
    </div>
  </Header>
);

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Wallet);
