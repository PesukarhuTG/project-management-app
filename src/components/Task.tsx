import React, { useState } from 'react';
import styled from 'styled-components';
import { ConfirmModal, IconButton, TaskModal } from './';

interface TaskProps {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

const Task: React.FC<TaskProps> = ({ _id, title, description }) => {
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);

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
        <b>Author: </b>
        {userName}
      </div>
      <Footer>
        <IconButton icon="edit" onClick={() => setIsShowEditModal(true)} />
        <IconButton icon="delete" onClick={() => setIsShowDeleteModal(true)} />
      </Footer>

      <TaskModal
        title="Edit task"
        isVisible={isShowEditModal}
        onOk={editTask}
        onCancel={() => setIsShowEditModal(false)}
      />

      <ConfirmModal
        title="Do you want to delete this task?"
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
