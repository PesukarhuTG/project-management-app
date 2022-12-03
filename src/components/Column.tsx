import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { ConfirmModal, IconButton, TaskModal, Task, Spinner } from './';
import checkIcon from '../assets/ico/icon-check.svg';
import cancelIcon from '../assets/ico/icon-cancel.svg';
import {
  createTask,
  getTasksInColumn,
  getUserIds,
  getUserNames,
  updateColumn,
  deleteColumn,
} from '../services/APIrequests';
import { mapperColumn } from '../services/mappers';
import { showNotification } from '../services/notification.service';
import { useLocaleMessage } from '../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { setOptions, setTaskDescription, setTaskOrder, setTasks, setTaskTitle } from '../store/TasksSlice';
import { OptionsProps } from '../types/ModalProps';
import { deleteColumnById, updateColumnData } from '../store/ColumnsSlice';
import TaskResponse from '../types/TaskModel';
import { DEFAULT_TASK_DESCRIPTION, DEFAULT_TASK_TITLE } from '../types/constants';

interface ColumnProps {
  id: string;
  title: string;
  order: number;
  dndIndex: number;
}

const Column: React.FC<ColumnProps> = ({ id, title, order, dndIndex }) => {
  const dispatch = useDispatch<AppDispatch>();
  const idBoard = useSelector((state: RootState) => state.boards.currentBoard?.id);
  const message = useLocaleMessage();
  const {
    title: taskTitle,
    description: taskDescription,
    tasks,
    options,
  } = useSelector((state: RootState) => state.tasks);
  const taskOrder = useSelector((state: RootState) => state.tasks.order) + 1;
  const [responsibleUser, setResponsibleUser] = useState<string>('');
  const [taskModalVisible, setTaskModalVisible] = useState<boolean>(false);
  const { id: userId } = useSelector((state: RootState) => state.user);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState(title);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);

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

  const getTasks = useCallback(async () => {
    if (idBoard) {
      setIsLoading(true);
      try {
        const tasksArray = await getTasksInColumn(idBoard, id).then((res) => res.data);
        dispatch(setTasks({ [id]: tasksArray.sort((a, b) => a.order - b.order) }));
      } catch (e) {
        showNotification('error', message('errorTitle'), (e as Error).message);
      }
      setIsLoading(false);
    }
  }, [dispatch, idBoard, message, id]);

  useEffect(() => {
    const getOptions = async () => {
      try {
        const userNames = await getUserNames();
        const userIds = await getUserIds();
        const optionsList: OptionsProps[] = [];
        for (let i = 0; i < userNames.length; i++) {
          optionsList.push({ value: userIds[i], label: userNames[i] });
        }
        dispatch(setOptions(optionsList));
      } catch (e) {
        showNotification('error', message('errorTitle'), (e as Error).message);
      }
    };

    getOptions();
    getTasks();
  }, [dispatch, getTasks, message]);

  useEffect(() => {
    if (idBoard) {
      const tasksArray: TaskResponse[][] = Object.values(tasks);
      let orders: number[] = [];
      tasksArray.forEach((el) =>
        el.forEach((elem) => {
          orders.push(elem.order);
        })
      );
      const maxOrder = orders.length ? Math.max(...orders) : 0;
      dispatch(setTaskOrder(maxOrder));
    }
  }, [tasks, dispatch, idBoard]);

  const addTask = async () => {
    setTaskModalVisible(false);
    setIsLoading(true);
    dispatch(setTaskTitle(''));
    dispatch(setTaskDescription(''));
    if (idBoard) {
      try {
        const userIds = await getUserIds();
        const newTask = await createTask(idBoard, id, {
          title: taskTitle || DEFAULT_TASK_TITLE,
          order: taskOrder,
          description: taskDescription || DEFAULT_TASK_DESCRIPTION,
          userId: responsibleUser || userId,
          users: userIds,
        });
        dispatch(setTaskOrder(taskOrder));
        getTasks();
      } catch (e) {
        showNotification('error', message('errorTitle'), (e as Error).message);
      }
      setIsLoading(false);
    }
  };

  const onDeleteColumn = async () => {
    setIsShowDeleteModal(false);

    if (idBoard) {
      setIsLoading(true);

      try {
        /*TODO тут должно быть удаление всех тасок в колонке борд idBoard колонка id*/

        const removedColumn = await deleteColumn(idBoard, id).then((res) => res.data);
        dispatch(deleteColumnById(removedColumn._id));
      } catch (e) {
        showNotification('error', message('errorTitle'), (e as Error).message);
      }

      setIsLoading(false);
    }
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
    <Draggable draggableId={id} index={dndIndex}>
      {(provided) => (
        <ColumnPanel ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
          <Header>{titleContent}</Header>
          {!!tasks[id] && (
            <Droppable droppableId={id} type="task">
              {(providedInner) => (
                <Body ref={providedInner.innerRef} {...providedInner.droppableProps}>
                  {tasks[id].map((task: TaskResponse, i) => (
                    <Task
                      id={`${id}-${task._id}`}
                      title={task.title}
                      description={task.description}
                      order={i}
                      userId={task.userId}
                      columnId={id}
                      boardId={idBoard}
                      key={task._id}
                    />
                  ))}
                  {providedInner.placeholder}
                </Body>
              )}
            </Droppable>
          )}

          <Footer>
            <AddButton onClick={() => setTaskModalVisible(true)}>{message('btnAddNewTask')}</AddButton>
            <IconButton icon="delete" onClick={() => setIsShowDeleteModal(true)} />
          </Footer>

          <TaskModal
            title={message('addTaskModalTitle')}
            isVisible={taskModalVisible}
            onOk={addTask}
            onCancel={() => setTaskModalVisible(false)}
            options={options}
            onChange={(value) => setResponsibleUser(value)}
          />

          <ConfirmModal
            title={message('confirmDeleteColumn')}
            isVisible={isShowDeleteModal}
            onOk={onDeleteColumn}
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
  min-height: 10px;
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
