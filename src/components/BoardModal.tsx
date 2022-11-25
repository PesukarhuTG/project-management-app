import React, { FC } from 'react';
import { ModalProps } from '../types';
import StyledInput from './StyledInput';
import StyledModal from './StyledModal';
import { useLocaleMessage } from '../hooks';

const BoardModal: FC<ModalProps> = ({ title, isVisible, onOk, onCancel }) => {
  const message = useLocaleMessage();

  return (
    <StyledModal title={title} isVisible={isVisible} onOk={onOk} onCancel={onCancel}>
      <StyledInput title={message('boardTitle')} />
      <StyledInput title={message('boardDescription')} />
    </StyledModal>
  );
};

export default BoardModal;
