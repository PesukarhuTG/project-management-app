interface TaskResponse {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

export type TaskCreateData = Pick<TaskResponse, 'title' | 'order' | 'description' | 'userId' | 'users'>;
export default TaskResponse;
