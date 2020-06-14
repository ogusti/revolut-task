import React from 'react';
import { Result, Button } from 'antd';

const refreshPage = () => {
  window.location.reload();
};

const ErrorPage = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong. You may refresh the page or try again later."
    extra={
      <Button onClick={refreshPage} type="primary">
        Refresh!
      </Button>
    }
  />
);

export default ErrorPage;
