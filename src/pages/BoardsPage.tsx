import { message as errorMessage } from 'antd';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BasePage, BoardModal, BoardsList, Spinner } from '../components';
import fetchBoardsData from '../services/dashboard.service';
import { createBoard, deleteBoard, fetchUsers } from '../services/APIrequests';
import { setBoardName, setBoardDescription, setCreateModalVisible, setFetchLoading } from '../store/BoardsSlice';
import { AppDispatch, RootState } from '../store/Store';
import { useLocaleMessage } from '../hooks';

const BoardsPage: React.FC = () => {
  const { createModalVisible, title, description, fetchLoading, boards } = useSelector(
    (state: RootState) => state.boards
  );
  const { id: userId } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const message = useLocaleMessage();

  const [messageApi, contextHolder] = errorMessage.useMessage();

  const showErrorMessage = useCallback(() => {
    messageApi.open({
      type: 'error',
      content: message('failedEditMessage'),
    });
  }, [message, messageApi]);

  useEffect(() => {
    dispatch(fetchBoardsData());
  }, [dispatch]);

  const handleSubmit = async () => {
    dispatch(setFetchLoading(true));
    dispatch(setCreateModalVisible(false));
    dispatch(setBoardName(''));
    dispatch(setBoardDescription(''));
    try {
      const usersList = await fetchUsers().then((res) => res.data);
      const usersId = usersList.map((user) => user._id);
      const boardTitle = { title, description };
      await createBoard(JSON.stringify(boardTitle), userId, usersId).then((res) => res.data);
      dispatch(fetchBoardsData());
    } catch {
      dispatch(setFetchLoading(false));
      showErrorMessage();
    }
  };

  const removeBoard = useCallback(
    (id: string) => {
      dispatch(setFetchLoading(true));
      const boardsId = boards.map((board) => board.id);
      boardsId.forEach(async (el) => {
        if (el === id) {
          try {
            await deleteBoard(el);
            dispatch(fetchBoardsData());
          } catch {
            dispatch(setFetchLoading(false));
            showErrorMessage();
          }
        }
      });
    },
    [boards, dispatch, showErrorMessage]
  );

  const boardsPageContent = useMemo(() => {
    if (fetchLoading) {
      return <Spinner />;
    }
    return <BoardsList boards={boards} remove={removeBoard} />;
  }, [fetchLoading, boards, removeBoard]);

  return (
    <>
      <BasePage>
        {contextHolder}
        {boardsPageContent}
      </BasePage>
      <BoardModal
        modalTitle={message('boardModalTitle')}
        isVisible={createModalVisible}
        onOk={handleSubmit}
        onCancel={() => dispatch(setCreateModalVisible(false))}
      />
    </>
  );
};

export default BoardsPage;
