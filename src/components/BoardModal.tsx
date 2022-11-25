import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBoardName, setBoardDescription } from '../store/BoardsSlice';
import { AppDispatch, RootState } from '../store/Store';
import { ModalProps } from '../types';
import StyledInput from './StyledInput';
import StyledModal from './StyledModal';

interface BoardModalProps {
  modalTitle: string;
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const BoardModal: FC<BoardModalProps> = ({ modalTitle, isVisible, onOk, onCancel }) => {
  const { title, description } = useSelector((state: RootState) => state.boards);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <StyledModal title={modalTitle} isVisible={isVisible} onOk={onOk} onCancel={onCancel}>
      <StyledInput title="Board name" onChange={(event) => dispatch(setBoardName(event.target.value))} value={title} />
      <StyledInput
        title="Board description"
        onChange={(event) => dispatch(setBoardDescription(event.target.value))}
        value={description}
      />
    </StyledModal>
  );
};

export default BoardModal;
