import React from 'react';
import styled, { css } from 'styled-components';
import editIcon from '../assets/ico/icon-edit.svg';
import deleteIcon from '../assets/ico/icon-trush.svg';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: 'edit' | 'delete';
}

const IconButton: React.FC<IconButtonProps> = ({ icon, ...rest }) => {
  return <StyledIconButton {...rest} $icon={icon} />;
};

const StyledIconButton = styled.button<{
  $icon: IconButtonProps['icon'];
}>`
  width: 30px;
  height: 30px;
  cursor: pointer;
  background: transparent center center no-repeat;
  border: none;
  outline: none;

  ${({ $icon }) => {
    if ($icon === 'edit') {
      return css`
        background-image: url(${editIcon});
      `;
    }

    return css`
      background-image: url(${deleteIcon});
    `;
  }}
`;

export default IconButton;
