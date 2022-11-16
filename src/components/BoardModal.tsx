import React, { FC } from 'react';
import { ModalProps } from '../types';
import StyledInput from './StyledInput';
import StyledModal from './StyledModal';

const BoardModal: FC<ModalProps> = ({ title, isVisible, onOk, onCancel }) => {
  return (
    <StyledModal title={title} isVisible={isVisible} onOk={onOk} onCancel={onCancel}>
      <StyledInput title="Board name" />
      <StyledInput title="Board description" />
    </StyledModal>
  );
};

export default BoardModal;
