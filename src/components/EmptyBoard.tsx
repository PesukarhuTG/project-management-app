import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setCreateModalVisible } from '../store/BoardsSlice';
import { AppDispatch, RootState } from '../store/Store';
import BoardModal from './BoardModal';
import { BoardWrapper, BoardTitle } from './styled-components';
import { useIntl } from 'react-intl';

const EmptyBoard = () => {
  const { createModalVisible } = useSelector((state: RootState) => state.boards);
  const dispatch = useDispatch<AppDispatch>();
  const intl = useIntl();

  const handleSubmit = () => {
    dispatch(setCreateModalVisible(false));
    console.log('create new board');
  };

  return (
    <>
      <BoardBody onClick={() => dispatch(setCreateModalVisible(true))}>
        <BoardTitle> + {intl.formatMessage({ id: 'boardModalTitle' })}</BoardTitle>
      </BoardBody>
      <BoardModal
        title={intl.formatMessage({ id: 'boardModalTitle' })}
        isVisible={createModalVisible}
        onOk={handleSubmit}
        onCancel={() => dispatch(setCreateModalVisible(false))}
      />
    </>
  );
};

const BoardBody = styled(BoardWrapper)`
  justify-content: center;
  align-items: center;
  background: var(--board-background);
`;

export default EmptyBoard;
