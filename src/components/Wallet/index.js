import React from 'react';
import { connect } from 'react-redux';
import { Layout, Card, Statistic } from 'antd';
import './Wallet.css';

const { Header } = Layout;

const Wallet = ({ wallet }) => (
  <Header className="wallet">
    {Object.entries(wallet).map(([, value]) => (
      <Card size="small" className="wallet__card">
        <Statistic
          precision={2}
          title={value.currency}
          value={value.amount}
          prefix={value.symbol}
        />
      </Card>
    ))}
  </Header>
);

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Wallet);
