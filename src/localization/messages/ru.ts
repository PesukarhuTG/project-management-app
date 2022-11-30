type LocaleMessages = {
  [key: string]: string;
};

const ru: LocaleMessages = {
  editItemMenu: 'Редактировать профиль',
  createItemMenu: 'Создать новую доску',
  mainItemMenu: 'Главная страница',
  btnSignUp: 'Регистрация',
  btnSignIn: 'Вход',
  btnSignOut: 'Выход',
  btnEng: 'АНГЛ',
  btnRus: 'РУС',
  btnBack: '🡐 вернуться назад',
  btnCreateNewColumn: '+ Создать новую колонку',
  btnAddNewTask: '+ новая задача',
  btnPage404: 'Вернуться на Главную',
  mainTitle: 'Менеджер задач',
  mainDescription:
    'Перед Вами приложение для работы с проектами, которое позволит централизованно управлять задачами и их своевременным завершением. Трекеры задач широко используются в работе с проектами, т.к. позволяют легко контролировать все рабочие процессы и работу команды в целом.',
  sectionTeam: 'Команда проекта',
  personOneTitle: 'Татьяна | фронтенд разработчик',
  personSecondTitle: 'Дарья | фронтенд разработчик',
  personThirdTitle: 'Сергей | фронтенд разработчик',
  personFourthTitle: 'Денис | ментор',
  personOneDescription: 'Здесь будет информация о члене команды и/или о его вкладе в развитие проекта',
  personSecondDescription: 'Здесь будет информация о члене команды и/или о его вкладе в развитие проекта',
  personThirdDescription: 'Здесь будет информация о члене команды и/или о его вкладе в развитие проекта',
  personFourthDescription:
    'Наставник команды. Гуру JS, React и всего программируемого :) Человек, который не только помогал в решении вопросов, но и мотивировал, заряжал энергией!',
  profilePageTitle: 'Редактирование профиля',
  userNameLabel: 'Имя пользователя',
  userLoginLabel: 'Логин',
  userPasswordLabel: 'Пароль',
  btnUpdateProfile: 'Обновить профиль',
  btnDeleteProfile: 'Удалить профиль',
  successEditMessage: 'Изменения в профиль внесены',
  failedTitle: 'Что-то пошло не так, попробуйте еще раз',
  nameInputValidation1: 'Введите ваше имя',
  nameInputValidation2: 'Длина имени минимум 2 символа',
  loginInputValidation1: 'Введите логин',
  loginInputValidation2: 'Длина логина минимум 2 символа',
  passwordInputValidation1: 'Введите пароль',
  passwordInputValidation2: 'Длина пароля минимум 8 символов',
  confirmYes: 'Да',
  confirmNo: 'Нет',
  boardTitle: 'Заголовок доски',
  boardDescription: 'Описание доски',
  columnName: 'Название колонки',
  boardModalTitle: 'Создать новую доску',
  saveModal: 'Сохранить',
  cancelModal: 'Отмена',
  taskAuthor: 'Автор',
  taskModalTitle: 'Редактировать задачу',
  confirmDeleteTask: 'Вы действительно хотите удалить задачу?',
  addNameTaskModal: 'Название задачи',
  addDescriptionTaskModal: 'Описание задачи',
  authPageTitle: 'Авторизация',
  textLinkToRegistration: 'Еще не с нами? ',
  registrationPageTitle: 'Регистрация',
  textLinkToAuthorization: 'Уже с нами? ',
  loginPlaceholder: 'Логин *',
  namePlaceholder: 'Имя *',
  passwordPlaceholder: 'Пароль *',
  board: 'Доска',
  addColumnModalTitle: 'Добавить колонку',
  addTaskModalTitle: 'Добавить задачу',
  editBoardModalTitle: 'Редактировать доску',
  confirmDeleteBoard: 'Вы действительно хотите удалить доску?',
  confirmDeleteProfile: 'Вы действительно хотите удалить профиль?',
  confirmDeleteColumn: 'Вы действительно хотите удалить колонку?',
  defaultUser: 'Ответственное лицо',
  errorTitle: 'Что-то пошло не так:',
  successAuthTitle: 'Вход выполнен успешно!',
  expiredTokenTitle: 'Время действия вашего токена истекло',
  expiredTokenMessage: 'Пожалуйста, войдите снова, используя Ваш логин и пароль',
  successDeleteUserTitle: 'Профиль был успешно удален',
  spinnerTip: 'Загрузка...',
  searchPlaceholder: 'Поиск...',
  nothingFound: 'Ничего не найдено',
  pageAccessTitle: 'Доступ к странице закрыт',
  pageProfileAccessMessage: 'Для просмотра страницы Профайла войдите в систему',
  pageAuthAccessMessage: 'Вы уже в системе. Просмотр страницы Авторизации невозможен',
  pageRegAccessMessage: 'Вы уже в системе. Просмотр страницы регистрации невозможен',
  pageBoardAccessMessage: 'Для просмотра страницы Доски войдите в систему',
  pageBoardsAccessMessage: 'Для просмотра страницы Досок войдите в систему',
  successDeleteTitle: 'Удаление прошло успешно',
  error400: 'ошибка запроса данных',
  error401: 'ошибка авторизации, проверьте логин и пароль',
  error402: 'файл уже существует',
  error403: 'пожалуйста, войдите в систему',
  error404: 'запрашиваемые данные не найдены',
  error409: 'такой логин уже существует',
  commonError: 'попробуйте снова',
};

export default ru;
