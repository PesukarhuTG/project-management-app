import { fetchBoards } from '../services/APIrequests';
import { setBoards, setFetchLoading } from '../store/BoardsSlice';
import { AppDispatch } from '../store/Store';
import { BoardProps, BoardTitle } from '../types/SingleBoardProps';

const fetchBoardsData = () => async (dispatch: AppDispatch) => {
  dispatch(setFetchLoading(true));
  try {
    const boardsList = await fetchBoards().then((res) => res.data);
    const boards: BoardProps[] = boardsList.map((board) => {
      const title: BoardTitle = JSON.parse(board.title);
      const obj: BoardProps = {
        boardName: title.boardName,
        boardDescription: title.boardDescription,
        id: board._id,
      };
      return obj;
    });
    dispatch(setBoards(boards));
  } catch {
    dispatch(setFetchLoading(false));
    console.log('error');
  } finally {
    dispatch(setFetchLoading(false));
  }
};

export default fetchBoardsData;
