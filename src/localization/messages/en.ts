type LocaleMessages = {
  [key: string]: string;
};

const en: LocaleMessages = {
  editItemMenu: 'Edit profile',
  createItemMenu: 'Create new board',
  mainItemMenu: 'Go to main page',
  btnSignUp: 'Sign Up',
  btnSignIn: 'Sign In',
  btnSignOut: 'Sign Out',
  btnEng: 'EN',
  btnRus: 'RU',
  btnBack: '🡐 Back to Boards list',
  btnCreateNewColumn: '+ Create new column',
  btnAddNewTask: '+ add new task',
  btnPage404: 'Back to main page',
  mainTitle: 'Task Manager',
  mainDescription:
    'It is a project management software that allows you to centrally manage tasks and their timely completion. Trackers are widely used in project management, because they allow you to easily monitor all work processes and control the work of the team.',
  sectionTeam: 'Project team',
  personOneTitle: 'Tatiana | frontend-developer',
  personSecondTitle: 'Daria | frontend-developer',
  personThirdTitle: 'Sergey | frontend-developer',
  personFourthTitle: 'Denis | mentor',
  personOneDescription:
    'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum',
  personSecondDescription:
    'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum',
  personThirdDescription:
    'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum',
  personFourthDescription:
    'Our team mentor. The specialist in JS, React and other technologies. The person, who not only helped us solve problems, but also motivated and energized the entire team!',
  profilePageTitle: 'Profile editing fields',
  userNameLabel: 'User name',
  userLoginLabel: 'Login',
  userPasswordLabel: 'Password',
  btnUpdateProfile: 'Update profile',
  btnDeleteProfile: 'Delete profile',
  successEditMessage: 'Your profile data was changed',
  failedTitle: 'Something wrong... Please, try again',
  nameInputValidation1: 'Please input your name!',
  nameInputValidation2: 'Name must be at least 2 characters',
  loginInputValidation1: 'Please input your login!',
  loginInputValidation2: 'Login must be at least 2 characters',
  passwordInputValidation1: 'Please input your password!',
  passwordInputValidation2: 'Password must be at least 8 characters',
  confirmYes: 'Yes',
  confirmNo: 'No',
  boardTitle: 'Board title',
  boardDescription: 'Board description',
  columnName: 'Column name:',
  boardModalTitle: 'Create new board',
  saveModal: 'Save',
  cancelModal: 'Cancel',
  taskAuthor: 'Author',
  taskModalTitle: 'Edit task',
  confirmDeleteTask: 'Do you want to delete this task?',
  addNameTaskModal: 'Task name',
  addDescriptionTaskModal: 'Task description',
  authPageTitle: 'Sign In',
  textLinkToRegistration: "Don't have an account? ",
  registrationPageTitle: 'Sign Up',
  textLinkToAuthorization: 'Have an account? ',
  loginPlaceholder: 'Login *',
  namePlaceholder: 'Name *',
  passwordPlaceholder: 'Password *',
  board: 'Board',
  addColumnModalTitle: 'Add column',
  addTaskModalTitle: 'Add new task',
  editBoardModalTitle: 'Edit board info',
  confirmDeleteBoard: 'Do you want to delete this board?',
  confirmDeleteProfile: 'Do you want to delete your profile?',
  confirmDeleteColumn: 'Do you want to delete this column?',
  defaultUser: 'Responsible user',
  errorTitle: 'Something went wrong',
  successAuthTitle: 'Your signin is successful!',
  expiredTokenTitle: 'Your token is expired',
  expiredTokenMessage: 'Please, signin again with your login and pasword',
  successDeleteUserTitle: 'Your profile was successful deleted!',
  spinnerTip: 'Loading...',
  searchPlaceholder: 'Search...',
  nothingFound: 'Nothing found',
  pageAccessTitle: 'Page access denied',
  pageProfileAccessMessage: 'Please, signin to view Profile page',
  pageAuthAccessMessage: 'You are logged now. Auth page is not available',
  pageRegAccessMessage: 'You are logged now. Registration page is not available',
  pageBoardsAccessMessage: 'Please, signin to view Boards page',
  pageBoardAccessMessage: 'Please, signin to view Single board page',
  successDeleteTitle: 'Removal is successful',
};

export default en;
