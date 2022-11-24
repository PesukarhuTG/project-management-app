import React, { FC } from 'react';
import StyledModal from './StyledModal';
import StyledInput from './StyledInput';
import { ModalProps } from '../types';
import { useIntl } from 'react-intl';

const ColumnModal: FC<ModalProps> = ({ title, isVisible, onOk, onCancel }) => {
  const intl = useIntl();

  return (
    <StyledModal title={title} isVisible={isVisible} onOk={onOk} onCancel={onCancel}>
      <StyledInput title={intl.formatMessage({ id: 'columnName' })} />
    </StyledModal>
  );
};
export default ColumnModal;
