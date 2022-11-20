import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { ConfirmModal, IconButton, TaskModal } from './';
import checkIcon from '../assets/ico/icon-check.svg';
import cancelIcon from '../assets/ico/icon-cancel.svg';

interface ColumnProps {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

const Column: React.FC<ColumnProps> = ({ _id, title }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isShowTaskModal, setIsShowTaskModal] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);

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
    <ColumnPanel>
      <Header>{titleContent}</Header>
      <Body></Body>
      <Footer>
        <AddButton onClick={() => setIsShowTaskModal(true)}>+ add new task</AddButton>
        <IconButton icon="delete" onClick={() => setIsShowDeleteModal(true)} />
      </Footer>

      <TaskModal
        title="Add new task"
        isVisible={isShowTaskModal}
        onOk={addTask}
        onCancel={() => setIsShowTaskModal(false)}
      />

      <ConfirmModal
        title="Do you want to delete this column?"
        isVisible={isShowDeleteModal}
        onOk={deleteColumn}
        onCancel={() => setIsShowDeleteModal(false)}
      />
    </ColumnPanel>
  );
};

const ColumnPanel = styled.section`
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
  padding: 0 20px 20px;
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
