import React from 'react';
import styled from 'styled-components';
import logoCourse from '../../assets/ico/icon-rsschool.svg';
import logoGithub from '../../assets/ico/icon-github.svg';

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <CopyRight>2022 | React 2022Q3</CopyRight>

      <Developers>
        <LinkGithub href="https://github.com/pesukarhutg">
          <span>@pesukarhutg</span>
        </LinkGithub>
        <LinkGithub href="https://github.com/ipipka">
          <span>@ipipka</span>
        </LinkGithub>
        <LinkGithub href="https://github.com/serjml">
          <span>@serjml</span>
        </LinkGithub>
      </Developers>

      <LinkCourse href="https://rs.school/react/">
        <img src={logoCourse} alt="The Rolling Scopes School" />
      </LinkCourse>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  padding: 20px var(--page-gutter);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--light-font);
  font-size: 18px;
  background-color: var(--nav-background);

  @media (max-width: 576px) {
    font-size: 16px;
  }
`;

const CopyRight = styled.div`
  margin-right: auto;

  @media (max-width: 576px) {
    display: none;
  }
`;

const Developers = styled.div`
  margin: 15px;
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    gap: 10px;
    flex-direction: column;
  }

  @media (max-width: 576px) {
    margin-left: 0;
  }
`;

const LinkGithub = styled.a`
  padding-left: 42px;
  line-height: 28px;
  color: var(--light-font);
  background: url(${logoGithub}) no-repeat;
  background-size: contain;

  & > span {
    border-bottom: 1px solid transparent;
    transition: border-color 0.25s ease-in-out;
  }

  &:hover {
    color: var(--light-font);

    & > span {
      border-bottom: 1px solid currentColor;
    }
  }

  @media (max-width: 576px) {
    line-height: 24px;
  }
`;

const LinkCourse = styled.a`
  margin-left: auto;
  opacity: 0.85;
  transition: opacity 0.25s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

export default Footer;
