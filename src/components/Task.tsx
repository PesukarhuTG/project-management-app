import React, { useState } from 'react';
import styled from 'styled-components';
import { ConfirmModal, IconButton, TaskModal } from './';
import { useLocaleMessage } from '../hooks';

interface TaskProps {
  id: string;
  title: string;
  order: number;
  description: string;
  boardId?: string;
  columnId?: string;
  userId?: string;
  users?: string[];
}

const Task: React.FC<TaskProps> = ({ id, title, description }) => {
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const message = useLocaleMessage();
  const userName = 'userName'; //TODO получить имя пользователя

  const editTask = () => {
    /*TODO edit task*/
    setIsShowEditModal(false);
  };

  const deleteTask = () => {
    /*TODO delete task*/
    setIsShowDeleteModal(false);
  };

  return (
    <TaskPanel>
      <Title>{title}</Title>
      <div>{description}</div>
      <div>
        <b>{message('taskAuthor')}: </b>
        {userName}
      </div>
      <Footer>
        <IconButton icon="edit" onClick={() => setIsShowEditModal(true)} />
        <IconButton icon="delete" onClick={() => setIsShowDeleteModal(true)} />
      </Footer>

      <TaskModal
        title={message('taskModalTitle')}
        isVisible={isShowEditModal}
        onOk={editTask}
        onCancel={() => setIsShowEditModal(false)}
      />

      <ConfirmModal
        title={message('confirmDeleteTask')}
        isVisible={isShowDeleteModal}
        onOk={deleteTask}
        onCancel={() => setIsShowDeleteModal(false)}
      />
    </TaskPanel>
  );
};

const TaskPanel = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--primary-light);
  border-radius: 10px;
`;

const Title = styled.div`
  font-weight: 700;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

export default Task;
