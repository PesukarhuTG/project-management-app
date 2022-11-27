import { message as errorMessage } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BasePage, BoardModal, BoardsList } from '../components';
import fetchBoardsData from '../services/dashboard.service';
import { createBoard, deleteBoard, fetchUsers } from '../services/APIrequests';
import { setBoardName, setBoardDescription, setCreateModalVisible, setFetchLoading } from '../store/BoardsSlice';
import { changeAuthStatus, removeUserData } from '../store/UserSlice';
import { AppDispatch, RootState } from '../store/Store';
import { useLocaleMessage } from '../hooks';
import checkTokenExpired from '../services/checkTokenExpired';
import { useNavigate } from 'react-router-dom';

const BoardsPage: React.FC = () => {
  const { createModalVisible, title, description, fetchLoading, boards } = useSelector(
    (state: RootState) => state.boards
  );
  const { id: userId } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const message = useLocaleMessage();
  const navigate = useNavigate();

  const [messageApi, contextHolder] = errorMessage.useMessage();

  const logout = () => {
    dispatch(changeAuthStatus(false));
    dispatch(removeUserData());
    localStorage.clear();
    navigate('/');
  };

  const showErrorMessage = () => {
    messageApi.open({
      type: 'error',
      content: message('failedEditMessage'),
    });
  };

  useEffect(() => {
    const authStatus = checkTokenExpired();

    if (authStatus) {
      dispatch(fetchBoardsData());
    } else {
      logout();
    }
  }, []); // eslint-disable-line

  const handleSubmit = async () => {
    const authStatus = checkTokenExpired();

    if (authStatus) {
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
    } else {
      logout();
    }
  };

  const removeBoard = (id: string) => {
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
  };

  const boardsPageContent = useMemo(() => {
    if (fetchLoading) {
      return <h1>Loading...</h1>;
    }
    return <BoardsList boards={boards} remove={removeBoard} />;
  }, [fetchLoading, boards]); // eslint-disable-line

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
