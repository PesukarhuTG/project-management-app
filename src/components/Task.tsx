import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ConfirmModal, IconButton, Spinner, TaskModal, OpenTaskModal } from './';
import { useLocaleMessage } from '../hooks';
import { Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { OptionsProps } from '../types/ModalProps';
import { deleteTask, getTasksInColumn } from '../services/APIrequests';
import { showNotification } from '../services/notification.service';
import { setTasks } from '../store/TasksSlice';
import { useDispatch } from 'react-redux';

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

const Task: React.FC<TaskProps> = ({ id, title, description, order, userId, columnId, boardId }) => {
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [isShowOpenModal, setIsShowOpenModal] = useState<boolean>(false);
  const message = useLocaleMessage();
  const { options, tasks } = useSelector((state: RootState) => state.tasks);
  const [userName, setUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    options.forEach((option: OptionsProps) => {
      if (option.value === userId) {
        setUserName(option.label);
      }
    });
  }, [userId, options]);

  const editTask = () => {
    /*TODO edit task*/
    setIsShowEditModal(false);
  };

  const onDeleteTask = async () => {
    setIsShowDeleteModal(false);

    const taskId = id.split('-').at(-1);

    if (boardId && columnId && taskId) {
      setIsLoading(true);
      console.log(tasks);
      console.log(boardId);
      console.log(columnId);
      console.log(taskId);
      try {
        await deleteTask(boardId, columnId, taskId).then((res) => console.log(res.data));
        const tasksArray = await getTasksInColumn(boardId, columnId).then((res) => res.data);
        dispatch(setTasks({ [columnId]: tasksArray.sort((a, b) => a.order - b.order) }));
      } catch (e) {
        showNotification('error', message('errorTitle'), (e as Error).message);
      }
      setIsLoading(false);
    }
  };

  return (
    <Draggable draggableId={id} index={order}>
      {(provided) => (
        <TaskPanel ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
          <Title>{title}</Title>
          <div>{description}</div>
          <div>
            <b>{message('taskAuthor')}: </b>
            {userName}
          </div>
          <Footer>
            <IconButton icon="open" onClick={() => setIsShowOpenModal(true)} />
            <IconButton icon="edit" onClick={() => setIsShowEditModal(true)} />
            <IconButton icon="delete" onClick={() => setIsShowDeleteModal(true)} />
          </Footer>

          <TaskModal
            title={message('taskModalTitle')}
            isVisible={isShowEditModal}
            onOk={editTask}
            onCancel={() => setIsShowEditModal(false)}
            options={options}
            onChange={(value) => console.log(value)}
          />

          <OpenTaskModal
            title={message('openTaskModalTitle')}
            isVisible={isShowOpenModal}
            onCancel={() => setIsShowOpenModal(false)}
            data={{ title, description, userName }}
          />

          <ConfirmModal
            title={message('confirmDeleteTask')}
            isVisible={isShowDeleteModal}
            onOk={onDeleteTask}
            onCancel={() => setIsShowDeleteModal(false)}
          />
          {isLoading && <Spinner type="fill" />}
        </TaskPanel>
      )}
    </Draggable>
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
  box-shadow: 0 4px 4px rgb(0 0 0 / 25%);
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
