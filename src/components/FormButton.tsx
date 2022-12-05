import { Button, ButtonProps } from 'antd';
import React from 'react';
import styled from 'styled-components';

const FormButton = (props: ButtonProps) => {
  return <StyledButton {...props} />;
};

const StyledButton = styled(Button)`
  height: 47px;
  width: 100%;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  border-radius: 10px;
  color: var(--primary-light);
  transition: 0.3s;

  &:hover,
  &:focus,
  &:active {
    color: var(--primary-light);
  }
`;

export default FormButton;
