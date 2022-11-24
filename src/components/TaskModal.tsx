import React, { FC } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';
import { ModalProps } from '../types';
import StyledModal from './StyledModal';
import StyledInput from './StyledInput';
import { useLocaleMessage } from '../hooks';

const TaskModal: FC<ModalProps> = ({ title, isVisible, onOk, onCancel, onChange, options = [] }) => {
  const message = useLocaleMessage();

  return (
    <StyledModal title={title} isVisible={isVisible} onOk={onOk} onCancel={onCancel}>
      <StyledInput title={message('addNameTaskModal')} />
      <StyledInput title={message('addDescriptionTaskModal')} />
      <StyledSelect
        defaultValue={message('defaultUser')}
        style={{ width: 120 }}
        onChange={onChange}
        options={options}
        bordered={false}
        dropdownStyle={{ borderRadius: '10px' }}
      />
    </StyledModal>
  );
};

const StyledSelect = styled(Select)`
  width: 100% !important;
  align-self: center;
  margin-bottom: 20px;
  border: 1px solid var(--primary-dark);
  border-radius: 10px;
  padding: 12px 10px;

  .ant-select-selection-item {
    font-size: 18px;
    font-weight: 700;
  }
`;

export default TaskModal;
