import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import boardEditIco from '../assets/ico/icon-edit.svg';
import boardDeleteIco from '../assets/ico/icon-trush.svg';
import { SingleBoardProps } from '../types';
import BoardModal from './BoardModal';
import ConfirmModal from './ConfirmModal';
import { BoardTitle, BoardWrapper } from './styled-components';
import { useLocaleMessage } from '../hooks';

const SingleBoard: FC<SingleBoardProps> = ({
  boardTitle = 'Board title',
  boardDescription = 'Board description',
  id,
  remove,
}) => {
  const navigate = useNavigate();
  const [confirmModalVisible, setConfirmModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const message = useLocaleMessage();

  const openConfirmModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setConfirmModalVisible(true);
  };

  const closeConfirmModal = () => {
    setConfirmModalVisible(false);
  };

  const handleDelete = () => {
    remove(id);
    setConfirmModalVisible(false);
  };

  const openEditModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  const handleEdit = () => {
    setEditModalVisible(false);
    console.log('edit board info');
  };

  return (
    <>
      <BoardWrapper onClick={() => navigate(`/board/${id}`)}>
        <BoardHeader>
          <BoardTitle>{boardTitle}</BoardTitle>
          <BoardDescription>{boardDescription}</BoardDescription>
        </BoardHeader>
        <BoardTools>
          <BoardEdit onClick={openEditModal} />
          <BoardDelete onClick={openConfirmModal} />
        </BoardTools>
      </BoardWrapper>
      <ConfirmModal
        title={message('confirmDeleteBoard')}
        isVisible={confirmModalVisible}
        onOk={handleDelete}
        onCancel={closeConfirmModal}
      />
      <BoardModal
        title={message('editBoardModalTitle')}
        isVisible={editModalVisible}
        onOk={handleEdit}
        onCancel={closeEditModal}
      />
    </>
  );
};

const BoardHeader = styled.div`
  padding: 20px;
  flex-grow: 1;
  background-color: var(--board-background);
  border-radius: 30px 30px 0 0;
`;

const BoardDescription = styled.p`
  line-height: 25px;
`;

const BoardTools = styled.div`
  height: 65px;
  display: flex;
  justify-content: end;
  gap: 20px;
  padding: 20px;
  background-color: var(--light-font);
  border-radius: 0 0 30px 30px;
`;

const BoardEdit = styled.div`
  width: 30px;
  height: 30px;
  background: url(${boardEditIco});
  cursor: pointer;

  &:hover {
    filter: invert(48%) sepia(79%) saturate(2898%) hue-rotate(189deg) brightness(97%) contrast(108%);
  }
`;

const BoardDelete = styled.div`
  width: 30px;
  height: 30px;
  background: url(${boardDeleteIco});
  cursor: pointer;

  &:hover {
    filter: invert(48%) sepia(79%) saturate(2898%) hue-rotate(189deg) brightness(97%) contrast(108%);
  }
`;

export default SingleBoard;
