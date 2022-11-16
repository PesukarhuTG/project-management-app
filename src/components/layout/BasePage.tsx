import React from 'react';
import styled, { css } from 'styled-components';
import Header from './Header';
import Footer from './Footer';

interface BasePageProps {
  children?: React.ReactNode;
  noScroll?: boolean;
}

const BasePage: React.FC<BasePageProps> = ({ children, noScroll = false }) => {
  return (
    <Layout>
      <Header />
      <Content $noScroll={noScroll}>{children}</Content>
      <Footer />
    </Layout>
  );
};

const Layout = styled.section`
  display: flex;
  flex: auto;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main<{
  $noScroll: boolean;
}>`
  padding: 32px var(--page-gutter);
  flex-grow: 1;

  ${({ $noScroll }) => {
    if ($noScroll)
      return css`
        height: calc(100vh - var(--header-h) - var(--footer-h));
        overflow: hidden;
      `;
  }}
`;

export default BasePage;
