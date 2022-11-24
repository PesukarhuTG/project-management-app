import React, { FC } from 'react';
import StyledModal from './StyledModal';
import StyledInput from './StyledInput';
import { ModalProps } from '../types';
import { useLocaleMessage } from '../hooks';

const ColumnModal: FC<ModalProps> = ({ title, isVisible, onOk, onCancel }) => {
  const message = useLocaleMessage();

  return (
    <StyledModal title={title} isVisible={isVisible} onOk={onOk} onCancel={onCancel}>
      <StyledInput title={message('columnName')} />
    </StyledModal>
  );
};
export default ColumnModal;
