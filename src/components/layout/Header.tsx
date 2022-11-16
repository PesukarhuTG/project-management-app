import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <StyledHeader>
      <Title>RSS Kanban</Title>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  padding: 0 var(--page-gutter);
  height: var(--header-h);
  display: flex;
  align-items: center;
  color: var(--light-font);
  background-color: var(--nav-background);
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  color: var(--light-font);
  font-size: 26px;
  font-weight: 800;
`;

export default Header;
