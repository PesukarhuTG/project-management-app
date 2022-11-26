import React, { useMemo, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { ConfirmModal, IconButton, TaskModal } from './';
import checkIcon from '../assets/ico/icon-check.svg';
import cancelIcon from '../assets/ico/icon-cancel.svg';
import Task from './Task';
import { useLocaleMessage } from '../hooks';

interface ColumnProps {
  id: string;
  title: string;
  order: number;
  boardId: string;
}

interface TaskData {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

const TaskMock: TaskData[] = [
  {
    _id: '001',
    title: 'Task 1',
    order: 1,
    boardId: 'Id of boards',
    columnId: 'Id of boards',
    description: 'Task description1 where you can write full information about task',
    userId: '001',
    users: [],
  },
  {
    _id: '002',
    title: 'Task 2',
    order: 2,
    boardId: 'Id of boards',
    columnId: 'Id of boards',
    description: 'Implement Select component from Antd and custom its design',
    userId: '001',
    users: [],
  },
];

const Column: React.FC<ColumnProps> = ({ id, title, order }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [tasks] = useState<TaskData[]>(TaskMock); //TODO get real task data
  const [isShowTaskModal, setIsShowTaskModal] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const message = useLocaleMessage();

  const updateTitle = () => {
    /*TODO update title*/
    setIsEdit(false);
  };

  const addTask = () => {
    /*TODO add new task*/
    setIsShowTaskModal(false);
  };

  const deleteColumn = () => {
    /*TODO delete column*/
    setIsShowDeleteModal(false);
  };

  const titleContent = useMemo(() => {
    if (isEdit) {
      return (
        <ChangeTitle>
          <Input />
          <CheckButton aria-label="Save" onClick={updateTitle} />
          <CancelButton aria-label="Cancel" onClick={() => setIsEdit(false)} />
        </ChangeTitle>
      );
    }

    return <Title onClick={() => setIsEdit(true)}>{title}</Title>;
  }, [isEdit, title]);

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
            <AddButton onClick={() => setIsShowTaskModal(true)}>{message('btnAddNewTask')}</AddButton>
            <IconButton icon="delete" onClick={() => setIsShowDeleteModal(true)} />
          </Footer>

          <TaskModal
            title={message('addTaskModalTitle')}
            isVisible={isShowTaskModal}
            onOk={addTask}
            onCancel={() => setIsShowTaskModal(false)}
          />

          <ConfirmModal
            title={message('confirmDeleteColumn')}
            isVisible={isShowDeleteModal}
            onOk={deleteColumn}
            onCancel={() => setIsShowDeleteModal(false)}
          />
        </ColumnPanel>
      )}
    </Draggable>
  );
};

const ColumnPanel = styled.section`
  margin-left: var(--page-gutter);
  max-height: calc(100% - 24px);
  display: flex;
  flex-direction: column;
  background: var(--board-background);
  border: 2px solid var(--primary-dark);
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
