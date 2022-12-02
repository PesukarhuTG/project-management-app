import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBoardName, setBoardDescription } from '../store/BoardsSlice';
import { AppDispatch, RootState } from '../store/Store';
import StyledInput from './StyledInput';
import StyledModal from './StyledModal';
import { useLocaleMessage } from '../hooks';
import { ButtonProps } from 'antd';

interface BoardModalProps {
  modalTitle: string;
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
  okButtonProps?: ButtonProps;
}

const BoardModal: FC<BoardModalProps> = ({ modalTitle, isVisible, onOk, onCancel, okButtonProps }) => {
  const { title, description } = useSelector((state: RootState) => state.boards);
  const dispatch = useDispatch<AppDispatch>();
  const message = useLocaleMessage();

  return (
    <StyledModal title={modalTitle} isVisible={isVisible} onOk={onOk} onCancel={onCancel} okButtonProps={okButtonProps}>
      <StyledInput
        title={message('boardTitle')}
        onChange={(event) => dispatch(setBoardName(event.target.value))}
        value={title}
        placeholder={message('boardTitlePlaceholder')}
      />
      <StyledInput
        title={message('boardDescription')}
        onChange={(event) => dispatch(setBoardDescription(event.target.value))}
        value={description}
        placeholder={message('boardDescriptionPlaceholder')}
      />
    </StyledModal>
  );
};

export default BoardModal;
