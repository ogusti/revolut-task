import React from 'react';
import { connect } from 'react-redux';
import { Layout, Card, Statistic } from 'antd';
import './Wallet.css';

const { Header } = Layout;

const Wallet = ({ wallet }) => (
  <Header className="wallet">
    <Card size="small" className="wallet__card">
      <Statistic
        precision={2}
        title={wallet.EUR.currency}
        value={wallet.EUR.amount}
        prefix={wallet.EUR.symbol}
      />
    </Card>
    <Card size="small" className="wallet__card">
      <Statistic
        precision={2}
        title={wallet.USD.currency}
        value={wallet.USD.amount}
        prefix={wallet.USD.symbol}
      />
    </Card>
    <Card size="small" className="wallet__card">
      <Statistic
        precision={2}
        title={wallet.GBP.currency}
        value={wallet.GBP.amount}
        prefix={wallet.GBP.symbol}
      />
    </Card>
  </Header>
);

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Wallet);
