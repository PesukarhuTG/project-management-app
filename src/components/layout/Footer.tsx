import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return <StyledFooter>footer</StyledFooter>;
};

const StyledFooter = styled.header`
  padding: 0 var(--page-gutter);
  height: var(--footer-h);
  display: flex;
  align-items: center;
  color: var(--light-font);
  background-color: var(--nav-background);
`;

export default Footer;
