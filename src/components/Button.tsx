import React from 'react';
import styled, { css } from 'styled-components';

export type ButtonType = 'primary' | 'second';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  type?: ButtonType;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, disabled = false, type = 'primary', onClick = () => {} }) => {
  return (
    <StyledButton disabled={disabled} $type={type} onClick={onClick}>
      {label}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  $type: ButtonType;
}>`
  display: block;
  padding: 13px 20px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: var(--light-font);
  transition: 0.3s;

  ${({ $type }) => {
    if ($type === 'primary')
      return css`
        background: var(--btn-primary);
        &:hover {
          background: var(--btn-primary-hover);
        }
      `;
    if ($type === 'second')
      return css`
        background: var(--btn-second);
        &:hover {
          background: var(--btn-second-hover);
        }
      `;
  }}
`;

export default Button;
