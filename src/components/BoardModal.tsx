import React, { FC } from 'react';
import { ModalProps } from '../types';
import StyledInput from './StyledInput';
import StyledModal from './StyledModal';
import { useIntl } from 'react-intl';

const BoardModal: FC<ModalProps> = ({ title, isVisible, onOk, onCancel }) => {
  const intl = useIntl();

  return (
    <StyledModal title={title} isVisible={isVisible} onOk={onOk} onCancel={onCancel}>
      <StyledInput title={intl.formatMessage({ id: 'boardTitle' })} />
      <StyledInput title={intl.formatMessage({ id: 'boardDescription' })} />
    </StyledModal>
  );
};

export default BoardModal;
