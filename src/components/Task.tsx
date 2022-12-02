import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ConfirmModal, IconButton, Spinner, TaskModal } from './';
import { useLocaleMessage } from '../hooks';
import { Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { OptionsProps } from '../types/ModalProps';
import { deleteTask, getTasksInColumn, getUserIds, updateTask } from '../services/APIrequests';
import { showNotification } from '../services/notification.service';
import { setTaskDescription, setTasks, setTaskTitle } from '../store/TasksSlice';
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
  const message = useLocaleMessage();
  const { options, title: taskTitle, description: taskDescription } = useSelector((state: RootState) => state.tasks);
  const [userName, setUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responsibleUser, setResponsibleUser] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    options.forEach((option: OptionsProps) => {
      if (option.value === userId) {
        setUserName(option.label);
      }
    });
  }, [userId, options]);

  const editTask = async () => {
    setIsShowEditModal(false);
    dispatch(setTaskTitle(''));
    dispatch(setTaskDescription(''));
    setResponsibleUser('');
    const taskId = id.split('-').at(-1);

    if (boardId && columnId && taskId) {
      setIsLoading(true);

      try {
        const userIds = await getUserIds();
        await updateTask(boardId, columnId, taskId, {
          title: taskTitle || title,
          order,
          description: taskDescription || description,
          columnId,
          userId: responsibleUser,
          users: userIds,
        });
        const tasksArray = await getTasksInColumn(boardId, columnId).then((res) => res.data);
        dispatch(setTasks({ [columnId]: tasksArray }));
      } catch (e) {
        showNotification('error', message('errorTitle'), (e as Error).message);
      }
      setIsLoading(false);
    }
  };

  const onDeleteTask = async () => {
    setIsShowDeleteModal(false);

    const taskId = id.split('-').at(-1);

    if (boardId && columnId && taskId) {
      setIsLoading(true);
      try {
        await deleteTask(boardId, columnId, taskId);
        const tasksArray = await getTasksInColumn(boardId, columnId).then((res) => res.data);
        dispatch(setTasks({ [columnId]: tasksArray }));
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
            <IconButton icon="edit" onClick={() => setIsShowEditModal(true)} />
            <IconButton icon="delete" onClick={() => setIsShowDeleteModal(true)} />
          </Footer>

          <TaskModal
            title={message('taskModalTitle')}
            isVisible={isShowEditModal}
            onOk={editTask}
            onCancel={() => setIsShowEditModal(false)}
            options={options}
            onChange={(value) => setResponsibleUser(value)}
            okButtonProps={{
              disabled: !(taskTitle && taskDescription && responsibleUser),
            }}
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
