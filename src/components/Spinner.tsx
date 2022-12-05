import React from 'react';
import styled, { css } from 'styled-components';
import { Spin } from 'antd';
import { useLocaleMessage } from '../hooks';

type SpinnerProps = {
  type?: '' | 'fullscreen' | 'fill';
};

const Spinner: React.FC<SpinnerProps> = ({ type = '' }) => {
  const message = useLocaleMessage();

  return <StyledSpin tip={message('spinnerTip')} size="large" $type={type} />;
};

const StyledSpin = styled(Spin)<{
  $type: '' | 'fullscreen' | 'fill';
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  gap: 10px;

  ${({ $type }) => {
    if ($type === 'fullscreen')
      return css`
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.2);
        z-index: 1001;
      `;

    if ($type === 'fill')
      return css`
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.2);
        z-index: 1001;
      `;
  }}

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
