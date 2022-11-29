import { message as errorMessage } from 'antd';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BasePage, BoardModal, BoardsList, FormInput, Spinner } from '../components';
import fetchBoardsData from '../services/dashboard.service';
import { createBoard, deleteBoard, editBoard, fetchUsers, getUserIds } from '../services/APIrequests';
import {
  setBoardName,
  setBoardDescription,
  setCreateModalVisible,
  setFetchLoading,
  setFilteredBoards,
  setSearch,
} from '../store/BoardsSlice';
import { changeAuthStatus, removeUserData } from '../store/UserSlice';
import { AppDispatch, RootState } from '../store/Store';
import { useLocaleMessage } from '../hooks';
import checkTokenExpired from '../services/checkTokenExpired';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BoardsPage: React.FC = () => {
  const { createModalVisible, title, description, fetchLoading, boards, search, filteredBoards } = useSelector(
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

  const showErrorMessage = useCallback(() => {
    messageApi.open({
      type: 'error',
      content: message('failedEditMessage'),
    });
  }, [message, messageApi]);

  useEffect(() => {
    if (!localStorage.getItem('tokenUser')) {
      navigate('/');
    } else {
      const authStatus = checkTokenExpired();

      if (authStatus) {
        dispatch(fetchBoardsData());
      } else {
        logout();
      }
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
        await createBoard(JSON.stringify(boardTitle), userId, usersId);
        dispatch(fetchBoardsData());
      } catch {
        dispatch(setFetchLoading(false));
        showErrorMessage();
      }
    } else {
      logout();
    }
  };

  const removeBoard = useCallback(
    (id: string) => {
      dispatch(setFetchLoading(true));
      const boardsId = boards.map((board) => board.id);
      boardsId.forEach(async (boardId) => {
        if (boardId === id) {
          try {
            await deleteBoard(boardId);
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

  const handleEdit = useCallback(
    (id: string) => {
      dispatch(setBoardName(''));
      dispatch(setBoardDescription(''));
      dispatch(setFetchLoading(true));
      const boardsId = boards.map((board) => board.id);
      boardsId.forEach(async (boardId) => {
        if (boardId === id) {
          try {
            const userIds = await getUserIds();
            const boardTitle = { title, description };
            await editBoard(boardId, JSON.stringify(boardTitle), userId, userIds);
            dispatch(fetchBoardsData());
          } catch {
            dispatch(setFetchLoading(false));
            showErrorMessage();
          }
        }
      });
    },
    [showErrorMessage, dispatch, boards, description, title, userId]
  );

  const searchedItem = useCallback(() => {
    const filteredBoards = boards.filter(
      (board) =>
        board.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        board.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    dispatch(setFilteredBoards(filteredBoards));
  }, [boards, dispatch, search]);

  useEffect(() => {
    searchedItem();
    if (!search) dispatch(setFilteredBoards(boards));
  }, [search, searchedItem]);

  const boardsPageContent = useMemo(() => {
    if (fetchLoading) {
      return <Spinner />;
    }
    return (
      <>
        <SearchInput
          onChange={(event) => dispatch(setSearch(event.target.value))}
          value={search}
          placeholder={message('searchPlaceholder')}
        />
        <BoardsList boards={filteredBoards} remove={removeBoard} edit={handleEdit} />
      </>
    );
  }, [fetchLoading, boards, removeBoard, handleEdit, search, filteredBoards, dispatch, message]);

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

const SearchInput = styled(FormInput)`
  min-width: 300px;
  max-width: 1358px;
  line-height: 24px;

  @media (max-width: 1100px) {
    max-width: 892px;
    margin-bottom: 30px;
  }

  @media (max-width: 1100px) {
    max-width: 892px;
  }

  @media (max-width: 750px) {
    max-width: 426px;
  }
`;

export default BoardsPage;
