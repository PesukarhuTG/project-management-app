import React, { FC } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';

const { TextArea } = Input;

interface StyledTextareaProps {
  title: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
}

const StyledTextarea: FC<StyledTextareaProps> = ({ title, onChange, value, placeholder }) => {
  return (
    <div>
      <InputTitle>{title}</InputTitle>
      <StyledAntTextarea
        autoSize={{ minRows: 2, maxRows: 6 }}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

const StyledAntTextarea = styled(TextArea)`
  padding: 10px;
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

export default StyledTextarea;
