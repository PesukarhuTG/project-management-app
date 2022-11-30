import { OptionsProps } from '../types/ModalProps';
import { getUserIds, getUserNames } from './APIrequests';

const getOptions = async () => {
  const userNames = await getUserNames();
  const userIds = await getUserIds();
  const optionsList: OptionsProps[] = [];
  for (let i = 0; i < userNames.length; i++) {
    optionsList.push({ value: userIds[i], label: userNames[i] });
  }
  //   setOptions(optionsList);
};

// const fetchBoardsData = () => async (dispatch: AppDispatch) => {
//   dispatch(setFetchLoading(true));
//   try {
//     const boardsList = await fetchBoards().then((res) => res.data);
//     const boards: BoardProps[] = boardsList.map((board) => {
//       const boardTitle: BoardTitle = JSON.parse(board.title);
//       const obj: BoardProps = {
//         title: boardTitle.title,
//         description: boardTitle.description,
//         id: board._id,
//       };
//       return obj;
//     });
//     dispatch(setBoards(boards));
//   } catch {
//     dispatch(setFetchLoading(false));
//     console.log('error');
//   } finally {
//     dispatch(setFetchLoading(false));
//   }
// };

// export default fetchBoardsData;
