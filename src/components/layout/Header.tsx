import React, { useMemo } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styled from 'styled-components';
import { Button, LanguageRadio } from '..';
import iconAvatar from '../../assets/ico/icon-avatar.svg';
import iconEditProfile from '../../assets/ico/icon-edit-profile.svg';
import iconAddBoard from '../../assets/ico/icon-add-board.svg';
import iconBoards from '../../assets/ico/icon-boards.svg';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/Store';
import { removeUserData, changeAuthStatus } from '../../store/UserSlice';

//type User = { avatar?: string } | null;

interface HeaderProps {
  isSticky?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isSticky = false }) => {
  const navigate = useNavigate();
  const { isAuth, login } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    try {
      dispatch(changeAuthStatus(false));
      dispatch(removeUserData());
      localStorage.clear();
      console.log('выпонили signout');
    } catch (e) {
      console.log(e);
    }
  };

  const headerContent = useMemo(() => {
    if (isAuth) {
      return (
        <>
          <UserData>
            <Avatar>
              <img src={iconAvatar} alt="user avatar" />
            </Avatar>
            <Login>{login}</Login>
          </UserData>

          <NavPanel>
            <StyledNavLink to="/profile">
              <NavIcon src={iconEditProfile} alt="" />
              <span>Edit profile</span>
            </StyledNavLink>

            <StyledNavButton>
              <NavIcon src={iconAddBoard} alt="" />
              <span>Create new board</span>
            </StyledNavButton>

            <StyledNavLink to="/boards">
              <NavIcon src={iconBoards} alt="" />
              <span>Go to main page</span>
            </StyledNavLink>
          </NavPanel>
        </>
      );
    }

    return (
      <UnauthorizedPanel>
        <Button label="Sign Up" onClick={() => navigate('/registration')} />
        <Button label="Sign In" onClick={() => navigate('/auth')} />
      </UnauthorizedPanel>
    );
  }, [isAuth, login, navigate]);

  return (
    <StyledHeader className={classNames({ 'header-sticky': isSticky })}>
      <Title>
        <HomeLink to="/">RSS Kanban</HomeLink>
      </Title>
      {headerContent}
      <SettingPanel>
        {isAuth && <Button label="Sign out" onClick={logout} />}
        <LanguageRadio />
      </SettingPanel>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  padding: 0 var(--page-gutter);
  height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
  color: var(--light-font);
  background-color: var(--nav-background);
  transition: height 0.5s ease-in-out, margin-bottom 0.5s ease-in-out;

  &.header-sticky {
    width: 100%;
    position: fixed;
    top: 0;
    height: calc(var(--header-h) - var(--header-animate-offset));
    margin-bottom: var(--header-animate-offset);
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

const NavPanel = styled(Panel)`
  align-items: center;
  order: 3;

  @media (max-width: 1200px) {
    margin-right: auto;
    flex-direction: column;
    align-items: flex-start;
    order: 2;

    .header-sticky & {
      gap: 4px 16px;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  color: inherit;

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

  &.active {
    text-shadow: 0 0 0 currentColor;
    pointer-events: none;
  }
`;

const StyledNavButton = styled.button`
  font-size: inherit;
  background: none;
  border: none;
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

export default Header;
