import React, { FC } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';
import { ModalProps } from '../types';
import StyledModal from './StyledModal';
import StyledInput from './StyledInput';

const TaskModal: FC<ModalProps> = ({ title, isVisible, onOk, onCancel, onChange, options = [] }) => {
  return (
    <>
      <StyledModal title={title} isVisible={isVisible} onOk={onOk} onCancel={onCancel}>
        <StyledInput title="Task name" />
        <StyledInput title="Task description" />
        <StyledSelect
          defaultValue="Responsible user"
          style={{ width: 120 }}
          onChange={onChange}
          options={options}
          bordered={false}
          dropdownStyle={{ borderRadius: '10px' }}
        />
      </StyledModal>
    </>
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
