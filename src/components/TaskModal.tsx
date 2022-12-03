import React, { FC } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';
import StyledModal from './StyledModal';
import StyledInput from './StyledInput';
import { useLocaleMessage } from '../hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { setTaskDescription, setTaskTitle } from '../store/TasksSlice';
import { useSelector } from 'react-redux';
import { TaskModalProps } from '../types/ModalProps';

const TaskModal: FC<TaskModalProps> = ({ title, isVisible, onOk, onCancel, onChange, options = [], okButtonProps }) => {
  const message = useLocaleMessage();
  const dispatch = useDispatch<AppDispatch>();
  const { title: taskTitle, description: taskDescription } = useSelector((state: RootState) => state.tasks);

  return (
    <StyledModal title={title} isVisible={isVisible} onOk={onOk} onCancel={onCancel} okButtonProps={okButtonProps}>
      <StyledInput
        title={message('addNameTaskModal')}
        onChange={(event) => dispatch(setTaskTitle(event.target.value))}
        value={taskTitle}
        placeholder={message('taskNamePlaceholder')}
      />
      <StyledInput
        title={message('addDescriptionTaskModal')}
        onChange={(event) => dispatch(setTaskDescription(event.target.value))}
        value={taskDescription}
        placeholder={message('taskDescriptionPlaceholder')}
      />
      <StyledSelect
        defaultValue={message('defaultUser')}
        style={{ width: 120 }}
        onChange={(value) => onChange(value as string)}
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
