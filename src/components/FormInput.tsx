import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { InputProps } from 'rc-input';

const FormInput = (props: InputProps) => {
  return <StyledInput {...props} />;
};

const StyledInput = styled(Input)`
  padding: 10px 20px;
  font-size: 18px;
  line-height: 36px;
  border: 1px solid var(--primary-dark);
  border-radius: 10px;

  @media (max-width: 600px) {
    line-height: 26px;
  }
`;

export default FormInput;
