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
import { showNotification } from '../services/notification.service';

const BoardsPage: React.FC = () => {
  const { createModalVisible, title, description, fetchLoading, boards, search, filteredBoards } = useSelector(
    (state: RootState) => state.boards
  );
  const { id: userId } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const message = useLocaleMessage();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(changeAuthStatus(false));
    dispatch(removeUserData());
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    if (!localStorage.getItem('tokenUser')) {
      navigate('/');
    }

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
        await createBoard(JSON.stringify(boardTitle), userId, usersId);
        dispatch(fetchBoardsData());
      } catch (e) {
        dispatch(setFetchLoading(false));
        showNotification('error', message('errorTitle'), (e as Error).message);
      }
    } else {
      logout();
      showNotification('warning', message('expiredTokenTitle'), message('expiredTokenMessage'));
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
          } catch (e) {
            dispatch(setFetchLoading(false));
            showNotification('error', message('errorTitle'), (e as Error).message);
          }
        }
      });
    },
    [boards, dispatch, message]
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
          } catch (e) {
            dispatch(setFetchLoading(false));
            showNotification('error', message('errorTitle'), (e as Error).message);
          }
        }
      });
    },
    [message, dispatch, boards, description, title, userId]
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
  }, [search, searchedItem]); //eslint-disable-line

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
  }, [fetchLoading, removeBoard, handleEdit, search, filteredBoards, dispatch, message]);

  return (
    <>
      <BasePage>
        <div className="container">{boardsPageContent}</div>
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
  margin-bottom: 30px;
  width: 100%;
  font-size: 20px;
  line-height: 24px;
`;

export default BoardsPage;
