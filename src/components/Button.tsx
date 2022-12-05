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
  padding: 0 var(--btn-gutter);
  line-height: var(--btn-h);
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-radius: var(--btn-br);
  cursor: pointer;
  color: var(--light-font);
  white-space: nowrap;
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

  @media (max-width: 700px) {
    font-size: 16px;
  }
`;

export default Button;
