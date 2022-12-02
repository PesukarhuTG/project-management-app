import React, { FC } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';

interface StyledInputProps {
  title: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const StyledInput: FC<StyledInputProps> = ({ title, onChange, value }) => {
  return (
    <div>
      <InputTitle>{title}</InputTitle>
      <StyledAntInput onChange={onChange} value={value} />
    </div>
  );
};

const StyledAntInput = styled(Input)`
  align-self: center;
  margin-bottom: 20px;
  border: 1px solid var(--primary-dark);
  font-size: 18px;
  line-height: 47px;
  border-radius: 10px;
`;

const InputTitle = styled.p`
  padding: 0 20px 3px;

  @media (max-width: 610px) {
    font-size: 16px;
  }
`;

export default StyledInput;
