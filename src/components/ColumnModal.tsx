import React, { FC } from 'react';
import StyledModal from './StyledModal';
import StyledInput from './StyledInput';
import { ModalProps } from '../types';

const ColumnModal: FC<ModalProps> = ({ title, isVisible, onOk, onCancel }) => {
  return (
    <StyledModal title={title} isVisible={isVisible} onOk={onOk} onCancel={onCancel}>
      <StyledInput title="Column name" />
    </StyledModal>
  );
};
export default ColumnModal;
