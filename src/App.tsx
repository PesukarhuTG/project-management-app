import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthPage, BoardPage, BoardsPage, NotFoundPage, ProfilePage, RegistrationPage, WelcomePage } from './pages';

import { IntlProvider } from 'react-intl';
import { messages } from './localization/messages';
import { useSelector } from 'react-redux';
import { RootState } from './store/Store';

const App: React.FC = () => {
  const { lang } = useSelector((state: RootState) => state.user);

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/boards" element={<BoardsPage />} />
          <Route path="/board/:id" element={<BoardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
};

export default App;
