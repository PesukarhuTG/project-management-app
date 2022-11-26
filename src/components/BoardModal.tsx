import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBoardName, setBoardDescription } from '../store/boardsSlice';
import { AppDispatch, RootState } from '../store/store';
import StyledInput from './StyledInput';
import StyledModal from './StyledModal';
import { useLocaleMessage } from '../hooks';

interface BoardModalProps {
  modalTitle: string;
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const BoardModal: FC<BoardModalProps> = ({ modalTitle, isVisible, onOk, onCancel }) => {
  const { title, description } = useSelector((state: RootState) => state.boards);
  const dispatch = useDispatch<AppDispatch>();
  const message = useLocaleMessage();

  return (
    <StyledModal title={modalTitle} isVisible={isVisible} onOk={onOk} onCancel={onCancel}>
      <StyledInput
        title={message('boardTitle')}
        onChange={(event) => dispatch(setBoardName(event.target.value))}
        value={title}
      />
      <StyledInput
        title={message('boardDescription')}
        onChange={(event) => dispatch(setBoardDescription(event.target.value))}
        value={description}
      />
    </StyledModal>
  );
};

export default BoardModal;
