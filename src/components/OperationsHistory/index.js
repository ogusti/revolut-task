import React from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { Layout, Divider } from 'antd';
import './OperationsHistory.css';

const { Footer } = Layout;

const OperationsHistory = (props) => {
  const { operationsHistory } = props;

  return (
    <>
      <Footer className="history__wrap">
        <Divider orientation="left" className="history__divider">
          history of exchanges
        </Divider>
        <ul className="history">
          {operationsHistory.map((operation, index) => (
            <li
              className="history__operation"
              key={`${operation.date} + ${index}`}
            >
              <div>{dayjs(operation.date).format('MM/DD/YYYY, h:mm')}</div>
              <div>
                -{operation.from.amount} {operation.from.currency}
              </div>
              <div>
                +{operation.to.amount} {operation.to.currency}
              </div>
            </li>
          ))}
        </ul>
      </Footer>
    </>
  );
};

const mapStateToProps = (state) => ({
  operationsHistory: state.operationsHistory,
});

export default connect(mapStateToProps)(OperationsHistory);
