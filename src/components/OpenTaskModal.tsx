import React, { FC } from 'react';
import StyledOpenModal from './StyledOpenModal';

import { OpenModalProps } from '../types/ModalProps';
import { Input } from 'antd';
import styled from 'styled-components';
const { TextArea } = Input;

const OpenTaskModal: FC<OpenModalProps> = ({ title, isVisible, onCancel, data }) => {
  return (
    <StyledOpenModal title={title} isVisible={isVisible} onCancel={onCancel}>
      <StyledInput placeholder={data.title} value={data.title} disabled />
      <StyledTextarea autoSize={true} placeholder={data.description} value={data.description} disabled />
      <StyledInput placeholder={data.userName} value={data.userName} disabled />
    </StyledOpenModal>
  );
};

const StyledInput = styled(Input)`
  align-self: center;
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 47px;
  border-radius: 10px;

  &:disabled {
    background: var(--primary-light);
    color: var(--primary-dark);
    border: 1px solid var(--board-background);
    background: var(--main-background);

    &:hover {
      border: 1px solid var(--board-background);
    }
  }
`;

const StyledTextarea = styled(TextArea)`
  align-self: center;
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 47px;
  border-radius: 10px;

  &:disabled {
    background: var(--primary-light);
    color: var(--primary-dark);
    border: 1px solid var(--board-background);
    background: var(--main-background);

    &:hover {
      border: 1px solid var(--board-background);
    }
  }
`;

export default OpenTaskModal;
