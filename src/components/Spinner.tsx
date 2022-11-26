import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import { useLocaleMessage } from '../hooks';

const Spinner = () => {
  const message = useLocaleMessage();

  return <StyledSpin tip={message('spinnerTip')} size="large" />;
};

const StyledSpin = styled(Spin)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  gap: 10px;

  span.ant-spin-dot {
    font-size: 55px;
  }
  .ant-spin-dot-item {
    background-color: var(--primary);
  }
  .ant-spin-dot-item {
    width: 22px !important;
    height: 22px !important;
  }
`;

export default Spinner;
