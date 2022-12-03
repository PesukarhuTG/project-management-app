import React, { FC } from 'react';
import StyledOpenModal from './StyledOpenModal';
import { useLocaleMessage } from '../hooks';

import { OpenModalProps } from '../types/ModalProps';
import { Input } from 'antd';
import styled from 'styled-components';
const { TextArea } = Input;

const OpenTaskModal: FC<OpenModalProps> = ({ title, isVisible, onCancel, data }) => {
  const message = useLocaleMessage();

  return (
    <StyledOpenModal title={title} isVisible={isVisible} onCancel={onCancel}>
      <InputTitle>{message('addNameTaskModal')}</InputTitle>
      <StyledInput placeholder={data.title} value={data.title} disabled />
      <InputTitle>{message('addDescriptionTaskModal')}</InputTitle>
      <StyledTextarea autoSize={true} placeholder={data.description} value={data.description} disabled />
      <InputTitle>{message('taskAuthor')}</InputTitle>
      <StyledInput placeholder={data.userName} value={data.userName} disabled />
    </StyledOpenModal>
  );
};

const InputTitle = styled.p`
  padding: 0 20px 3px;
  color: var(--disable-font);

  @media (max-width: 610px) {
    font-size: 16px;
  }
`;

const StyledInput = styled(Input)`
  align-self: center;
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 47px;
  border-radius: 10px;

  &:disabled {
    background: var(--primary-light);
    color: var(--main-font);
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
    color: var(--main-font);
    border: 1px solid var(--board-background);
    background: var(--main-background);

    &:hover {
      border: 1px solid var(--board-background);
    }
  }
`;

export default OpenTaskModal;
