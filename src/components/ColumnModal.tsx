import React, { FC } from 'react';
import StyledModal from './StyledModal';
import StyledInput from './StyledInput';
import { ModalProps } from '../types';
import { useLocaleMessage } from '../hooks';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { setNewColumnTitle } from '../store/ColumnsSlice';

const ColumnModal: FC<ModalProps> = ({ title, isVisible, onOk, onCancel }) => {
  const message = useLocaleMessage();
  const { newColumnTitle } = useSelector((state: RootState) => state.columns);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <StyledModal title={title} isVisible={isVisible} onOk={onOk} onCancel={onCancel}>
      <StyledInput
        title={message('columnName')}
        onChange={(event) => dispatch(setNewColumnTitle(event.target.value))}
        value={newColumnTitle}
      />
    </StyledModal>
  );
};
export default ColumnModal;
