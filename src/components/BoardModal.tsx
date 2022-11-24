import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBoardName, setBoardDescription } from '../store/BoardsSlice';
import { AppDispatch, RootState } from '../store/Store';
import { ModalProps } from '../types';
import StyledInput from './StyledInput';
import StyledModal from './StyledModal';

const BoardModal: FC<ModalProps> = ({ title, isVisible, onOk, onCancel }) => {
  const { boardName, boardDescription } = useSelector((state: RootState) => state.boards.boardTitle);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <StyledModal title={title} isVisible={isVisible} onOk={onOk} onCancel={onCancel}>
      <StyledInput
        title="Board name"
        onChange={(event) => dispatch(setBoardName(event.target.value))}
        value={boardName}
      />
      <StyledInput
        title="Board description"
        onChange={(event) => dispatch(setBoardDescription(event.target.value))}
        value={boardDescription}
      />
    </StyledModal>
  );
};

export default BoardModal;
