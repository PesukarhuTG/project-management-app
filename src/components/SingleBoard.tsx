import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import boardEditIco from '../assets/ico/icon-edit.svg';
import boardDeleteIco from '../assets/ico/icon-trush.svg';
import { SingleBoardProps } from '../types';
import ConfirmModal from './ConfirmModal';
import { BoardTitle, BoardWrapper } from './styled-components';

const SingleBoard: FC<SingleBoardProps> = ({
  boardTitle = 'Board title',
  boardDescription = 'Board description',
  id,
  remove,
}) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const openModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDelete = () => {
    remove(id);
    setModalVisible(false);
  };

  return (
    <>
      <BoardWrapper onClick={() => navigate(`/board/${id}`)}>
        <BoardHeader>
          <BoardTitle>{boardTitle}</BoardTitle>
          <BoardDescription>{boardDescription}</BoardDescription>
        </BoardHeader>
        <BoardTools>
          <BoardEdit onClick={() => console.log('open modal window for edit')} />
          <BoardDelete onClick={openModal} />
        </BoardTools>
      </BoardWrapper>
      <ConfirmModal
        title="Do you want to delete this board?"
        isVisible={modalVisible}
        onOk={handleDelete}
        onCancel={closeModal}
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
