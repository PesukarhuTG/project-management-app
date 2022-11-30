import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { ConfirmModal, IconButton, TaskModal, Task, Spinner } from './';
import checkIcon from '../assets/ico/icon-check.svg';
import cancelIcon from '../assets/ico/icon-cancel.svg';

import {
  createTask,
  fetchUsers,
  getTasksInColumn,
  getUserIds,
  getUserNames,
  updateColumn,
} from '../services/APIrequests';
import { mapperColumn } from '../services/mappers';
import { showNotification } from '../services/notification.service';
import { useLocaleMessage } from '../hooks';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { updateColumnData } from '../store/ColumnsSlice';
import { setTaskLoading, setTaskModalVisible, setTaskOrder, setTasks } from '../store/TasksSlice';

import { OptionsProps } from '../types/ModalProps';

interface ColumnProps {
  id: string;
  title: string;
  order: number;
  boardId: string;
}

const Column: React.FC<ColumnProps> = ({ id, title, order }) => {
  const dispatch = useDispatch<AppDispatch>();
  const idBoard = useSelector((state: RootState) => state.boards.currentBoard?.id);
  const columns = useSelector((state: RootState) => state.columns.columns);
  const message = useLocaleMessage();
  const {
    taskModalVisible,
    title: taskTitle,
    order: taskOrder,
    description: taskDescription,
    tasks,
  } = useSelector((state: RootState) => state.tasks);
  // const [options, setOptions] = useState<OptionsProps[]>([]);
  const [responsibleUser, setResponsibleUser] = useState<string>('');

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState(title);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);

  // const [tasks] = useState<TaskData[]>(TaskMock); //TODO get real task data

  const updateTitle = useCallback(async () => {
    setIsEdit(false);

    if (idBoard && newTitle && newTitle !== title) {
      setIsLoading(true);

      try {
        const newColumn = await updateColumn(idBoard, id, { title: newTitle, order: order }).then((res) => res.data);
        dispatch(updateColumnData(mapperColumn(newColumn)));
        setNewTitle(newTitle);
      } catch (e) {
        showNotification('error', message('errorTitle'), (e as Error).message);
        setNewTitle(title);
      }

      setIsLoading(false);
    }
  }, [dispatch, id, idBoard, message, newTitle, title, order]);

  const cancelUpdateTitle = useCallback(() => {
    setNewTitle(title);
    setIsEdit(false);
  }, [title]);

  useEffect(() => {
    // getOptions();
    getTasks();
  }, []);

  // useEffect(() => {
  //   // getTasks();
  //   dispatch(setTasks(tasks));
  // }, [tasks]);

  const getTasks = async () => {
    if (idBoard) {
      const tasks = await getTasksInColumn(idBoard, id).then((res) => res.data);
      dispatch(setTasks(tasks));
    }
  };

  const addTask = async () => {
    console.log(id);
    dispatch(setTaskModalVisible(false));
    // if (idBoard) {
    //   dispatch(setTaskModalVisible(false));

    // console.log(columns);
    // const columnIds = columns.map((column) => column.id);
    // console.log(columnIds);
    // columnIds.forEach(async (columnId) => {
    //   if (columnId === id) {
    // console.log(columnId);
    //   try {
    //     const userIds = await getUserIds();
    //     const newTask = await createTask(idBoard, id, {
    //       title: taskTitle,
    //       order: taskOrder,
    //       description: taskDescription,
    //       userId: responsibleUser,
    //       users: userIds,
    //     }).then((res) => res.data);
    //     console.log(newTask);
    //     dispatch(setTaskOrder(taskOrder + 1));
    //     getTasks();
    //   } catch {
    //     console.log('error');
    //   }
    // }
    //   });
    // }
    // }
  };

  const deleteColumn = () => {
    /*TODO delete column*/
    setIsShowDeleteModal(false);
  };

  const titleContent = useMemo(() => {
    if (isEdit) {
      return (
        <ChangeTitle>
          <Input
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
          />
          <CheckButton aria-label="Save" onClick={updateTitle} />
          <CancelButton aria-label="Cancel" onClick={cancelUpdateTitle} />
        </ChangeTitle>
      );
    }

    return <Title onClick={() => setIsEdit(true)}>{title}</Title>;
  }, [isEdit, title, newTitle, cancelUpdateTitle, updateTitle]);

  return (
    <Draggable draggableId={id} index={order}>
      {(provided) => (
        <ColumnPanel ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
          <Header>{titleContent}</Header>
          {!!tasks.length && (
            <Droppable droppableId={id} type="task">
              {(providedInner) => (
                <Body ref={providedInner.innerRef} {...providedInner.droppableProps}>
                  {tasks.map((task) => (
                    <Task
                      id={`${id}-${task._id}`}
                      title={task.title}
                      description={task.description}
                      order={task.order}
                      key={task._id}
                    />
                  ))}
                  {providedInner.placeholder}
                </Body>
              )}
            </Droppable>
          )}

          <Footer>
            <AddButton onClick={() => dispatch(setTaskModalVisible(true))}>{message('btnAddNewTask')}</AddButton>
            <IconButton icon="delete" onClick={() => setIsShowDeleteModal(true)} />
          </Footer>

          <TaskModal
            title={message('addTaskModalTitle')}
            isVisible={taskModalVisible}
            onOk={addTask}
            onCancel={() => dispatch(setTaskModalVisible(false))}
            options={[]}
            onChange={(value) => setResponsibleUser(value)}
          />

          <ConfirmModal
            title={message('confirmDeleteColumn')}
            isVisible={isShowDeleteModal}
            onOk={deleteColumn}
            onCancel={() => setIsShowDeleteModal(false)}
          />

          {isLoading && <Spinner type="fill" />}
        </ColumnPanel>
      )}
    </Draggable>
  );
};

const ColumnPanel = styled.section`
  position: relative;
  margin-left: var(--page-gutter);
  max-height: calc(100% - 24px);
  display: flex;
  flex-direction: column;
  background: var(--board-background);
  box-shadow: 0 4px 4px rgb(0 0 0 / 25%);
  border-radius: 30px;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 20px;
  min-height: 82px;
  display: flex;
  align-items: center;
`;

const Title = styled.h3`
  color: var(--primary-dark);
  font-size: 26px;
  font-weight: 800;
  line-height: 40px;
  border-bottom: 2px dashed transparent;
  cursor: pointer;

  &:hover {
    border-bottom-color: currentColor;
  }
`;

const ChangeTitle = styled.div`
  padding-right: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--primary-light);
`;

const Input = styled.input`
  height: 40px;
  width: 100%;
  flex-grow: 1;
  color: var(--primary-dark);
  font-size: 26px;
  font-weight: 800;
  border: none;
  outline: none;
`;

const ChangeBtn = styled.button`
  width: 28px;
  height: 28px;
  background: transparent center center no-repeat;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.25s ease-in-out;

  &:focus,
  &:hover {
    opacity: 1;
    outline: none;
  }
`;

const CheckButton = styled(ChangeBtn)`
  background-image: url(${checkIcon});
`;

const CancelButton = styled(ChangeBtn)`
  background-image: url(${cancelIcon});
`;

const Body = styled.div`
  padding: 0 20px;
  overflow: auto;
`;

const Footer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--primary-light);
`;

const AddButton = styled.button`
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-dark);
  background: transparent;
  border: none;
  border-bottom: 1px solid transparent;
  cursor: pointer;
  transition: border-color 0.25s ease-in-out;

  &:focus,
  &:hover {
    border-bottom-color: currentColor;
  }
`;

export default Column;
