import React from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { Layout, Divider, Table, Statistic } from 'antd';
import './OperationsHistory.css';

const { Footer } = Layout;

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (date) => <div>{dayjs(date).format('MM/DD/YYYY, HH:mm')}</div>,
    sorter: (a, b) => a.date - b.date,
  },
  {
    title: 'Exchanges from',
    children: [
      {
        title: 'Currency',
        dataIndex: 'from',
        key: 'from',
        render: ({ currency, symbol }) => (
          <Statistic value={symbol} suffix={currency} />
        ),
      },
      {
        title: 'Amount',
        dataIndex: 'from',
        key: 'from',
        render: ({ amount }) => (
          <Statistic precision={2} value={amount} prefix="-" />
        ),
      },
    ],
  },
  {
    title: 'Exchanges to',
    children: [
      {
        title: 'Currency',
        dataIndex: 'to',
        key: 'to',
        render: ({ symbol, currency }) => (
          <Statistic value={symbol} suffix={currency} />
        ),
      },
      {
        title: 'Amount',
        dataIndex: 'to',
        key: 'to',
        render: ({ amount }) => (
          <Statistic precision={2} value={amount} prefix="+" />
        ),
      },
    ],
  },
];

const OperationsHistory = ({ operationsHistory }) => {
  const operationsWithIds = operationsHistory.map((operation, index) => ({
    ...operation,
    key: index,
  }));

  return (
    <Footer className="history">
      <Divider orientation="left" className="history__divider">
        History of exchanges
      </Divider>
      <Table bordered columns={columns} dataSource={operationsWithIds} />
    </Footer>
  );
};

const mapStateToProps = (state) => ({
  operationsHistory: state.operationsHistory,
});

export default connect(mapStateToProps)(OperationsHistory);
