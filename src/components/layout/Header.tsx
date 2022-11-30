import React, { useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styled, { css } from 'styled-components';
import { LanguageRadio } from '..';
import iconAvatar from '../../assets/ico/icon-avatar.svg';
import iconEditProfile from '../../assets/ico/icon-edit-profile.svg';
import iconAddBoard from '../../assets/ico/icon-add-board.svg';
import iconBoards from '../../assets/ico/icon-boards.svg';
import iconMenu from '../../assets/ico/icon-menu.svg';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/Store';
import { removeUserData, changeAuthStatus } from '../../store/UserSlice';
import { setCreateModalVisible } from '../../store/BoardsSlice';
import { useLocaleMessage } from '../../hooks';

interface HeaderProps {
  isSticky?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isSticky = false }) => {
  const [visibleBurgerMenu, setVisibleBurgerMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const message = useLocaleMessage();
  const { login, lang } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    try {
      dispatch(changeAuthStatus(false));
      dispatch(removeUserData());
      localStorage.clear();
      console.log('выполнили signout');
    } catch (e) {
      console.log(e);
    }
  };

  const createBoard = () => {
    dispatch(setCreateModalVisible(true));
    navigate('/boards');
  };

  const headerContent = useMemo(() => {
    if (localStorage.getItem('tokenUser')) {
      return (
        <>
          <UserData>
            <Avatar>
              <img src={iconAvatar} alt="user avatar" />
            </Avatar>
            <Login>{login}</Login>
          </UserData>

          <NavPanel $visibleBurgerMenu={visibleBurgerMenu}>
            <StyledNavLink to="/profile">
              <NavIcon src={iconEditProfile} alt="icon" />
              {message('editItemMenu')}
            </StyledNavLink>

            <StyledNavButton onClick={createBoard}>
              <NavIcon src={iconAddBoard} alt="icon" />
              {message('createItemMenu')}
            </StyledNavButton>

            <StyledNavLink to="/boards">
              <NavIcon src={iconBoards} alt="icon" />
              {message('mainItemMenu')}
            </StyledNavLink>
          </NavPanel>

          <BurgerMenu onClick={() => setVisibleBurgerMenu(!visibleBurgerMenu)}>
            <NavIcon src={iconMenu} alt="icon" />
          </BurgerMenu>
        </>
      );
    }

    return (
      <UnauthorizedPanel>
        <StyledAuthButton to="/registration">{message('btnSignUp')}</StyledAuthButton>
        <StyledAuthButton to="/auth">{message('btnSignIn')}</StyledAuthButton>
      </UnauthorizedPanel>
    );
  }, [login, lang, visibleBurgerMenu]); //eslint-disable-line

  return (
    <StyledHeader className={classNames({ 'header-sticky': isSticky })}>
      <Title>
        <HomeLink to="/">RSS Kanban</HomeLink>
      </Title>
      {headerContent}
      <SettingPanel>
        {localStorage.getItem('tokenUser') && (
          <StyledAuthButton to="/" onClick={logout}>
            {message('btnSignOut')}
          </StyledAuthButton>
        )}
        <LanguageRadio />
      </SettingPanel>
    </StyledHeader>
  );
};

const BurgerMenu = styled.button`
  display: none;
  width: 30px;
  height: 30px;
  border: 0;
  background-color: transparent;

  cursor: pointer;
  z-index: 100;
  order: 4;

  @media (max-width: 1500px) {
    display: block;
  }
`;

const StyledHeader = styled.header`
  padding: 26px var(--page-gutter);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
  color: var(--light-font);
  background-color: var(--primary-dark);
  transition: height 0.5s ease-in-out, margin-bottom 0.5s ease-in-out;
  box-shadow: 0 4px 4px rgb(0 0 0 / 25%);

  &.header-sticky {
    width: 100%;
    position: fixed;
    top: 0;
    height: calc(var(--header-h) - var(--header-animate-offset));
    margin-bottom: var(--header-animate-offset);
    z-index: 1;
  }

  @media (max-width: 768px) {
    gap: 16px;
  }

  @media (max-width: 576px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    justify-content: space-between;
  }
`;

const Panel = styled.div`
  display: flex;
  gap: 8px 24px;
  transition: gap 0.5s ease-in-out;

  @media (max-width: 768px) {
    gap: 8px 16px;

    .header-sticky & {
      gap: 4px 16px;
    }
  }
`;

const Title = styled.h1`
  margin: 0 auto 0 0;
  padding: 0;
  color: var(--light-font);
  font-size: 26px;
  font-weight: 800;
  order: 1;

  @media (max-width: 576px) {
    display: none;
  }
`;

const HomeLink = styled(Link)`
  color: inherit;

  &:hover {
    color: inherit;
  }
`;

const UserData = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  order: 3;
`;

const Avatar = styled.div`
  height: 30px;
  width: 30px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--board-background);
  border-radius: 50%;
  overflow: hidden;

  & > img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  @media (max-width: 992px) {
    display: none;
  }
`;

const Login = styled.span`
  text-shadow: 0 0 5px var(--primary-light), 0 0 10px var(--primary), 0 0 15px var(--primary), 0 0 20px white;
`;

const NavPanel = styled(Panel)<{
  $visibleBurgerMenu: boolean;
}>`
  align-items: center;
  order: 3;

  @media (max-width: 1500px) {
    flex-direction: column;
    gap: 30px;
    align-items: flex-start;
    position: fixed;
    top: 0;
    right: -320px;
    width: 320px;
    height: 100%;
    padding-top: 130px;
    padding-left: 20px;
    background-color: var(--nav-background);
    background: linear-gradient(160deg, var(--burgerBgr-01) 0%, var(--burgerBgr-02) 100%);
    transition: right 0.3s;
    z-index: 5;

    ${({ $visibleBurgerMenu }) => {
      if ($visibleBurgerMenu) {
        return css`
          right: 0;
        `;
      }
    }}
  }
`;

const StyledNavLink = styled(NavLink)`
  color: inherit;
  transition: text-shadow 0.3s;

  & > span {
    border-bottom: 1px solid transparent;
    transition: border-color 0.25s ease-in-out;
  }

  &:hover {
    color: inherit;

    & > span {
      border-bottom-color: currentColor;
    }
  }

  &:hover {
    text-shadow: 0 0 5px var(--primary-light), 0 0 10px var(--primary), 0 0 15px var(--primary), 0 0 20px white;
  }
`;

const StyledNavButton = styled.button`
  font-size: inherit;
  background: none;
  border: none;
  transition: text-shadow 0.3s;
  cursor: pointer;

  & > span {
    border-bottom: 1px solid transparent;
    transition: border-color 0.25s ease-in-out;
  }

  &:hover {
    color: inherit;

    & > span {
      border-bottom-color: currentColor;
    }
  }

  &:hover {
    text-shadow: 0 0 5px var(--primary-light), 0 0 10px var(--primary), 0 0 15px var(--primary), 0 0 20px white;
  }
`;

const NavIcon = styled.img`
  width: 30px;
  margin-right: 6px;
`;

const UnauthorizedPanel = styled(Panel)`
  order: 3;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const SettingPanel = styled(Panel)`
  flex-shrink: 0;
  order: 3;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledAuthButton = styled(Link)`
  display: block;
  padding: 0 var(--btn-gutter);
  line-height: var(--btn-h);
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-radius: var(--btn-br);
  cursor: pointer;
  color: var(--light-font);
  white-space: nowrap;
  transition: 0.3s;
  background: var(--btn-primary);

  &:hover {
    background: var(--btn-primary-hover);
    color: var(--light-font);
  }
`;

export default Header;
