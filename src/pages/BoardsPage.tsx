import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BasePage, BoardModal, BoardsList } from '../components';
import fetchBoardsData from '../http/fetchBoardsData';
import { createBoard, deleteBoard, fetchUsers } from '../services/APIrequests';
import { setBoardName, setBoardDescription, setCreateModalVisible, setFetchLoading } from '../store/BoardsSlice';
import { AppDispatch, RootState } from '../store/Store';

const BoardsPage: React.FC = () => {
  const { createModalVisible, boardTitle, fetchLoading, boards } = useSelector((state: RootState) => state.boards);
  const { id } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBoardsData());
  }, []);

  const handleSubmit = async () => {
    dispatch(setFetchLoading(true));
    dispatch(setCreateModalVisible(false));
    dispatch(setBoardName(''));
    dispatch(setBoardDescription(''));
    try {
      const usersList = await fetchUsers().then((res) => res.data);
      const usersId = usersList.map((user) => user._id);
      createBoard(JSON.stringify(boardTitle), id, usersId).then((res) => res.data);
      dispatch(fetchBoardsData());
    } catch {
      console.log('error');
    }
  };

  const boardsPageContent = useMemo(() => {
    if (fetchLoading) {
      return <h1>Loading...</h1>;
    }
    return <BoardsList boards={boards} remove={deleteBoard} />;
  }, [fetchLoading, boards]);

  return (
    <>
      <BasePage>{boardsPageContent}</BasePage>
      <BoardModal
        title="Create new board"
        isVisible={createModalVisible}
        onOk={handleSubmit}
        onCancel={() => dispatch(setCreateModalVisible(false))}
      />
    </>
  );
};

export default BoardsPage;
