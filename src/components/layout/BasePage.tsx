import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styled, { css } from 'styled-components';
import Header from './Header';
import Footer from './Footer';

interface BasePageProps {
  children?: React.ReactNode;
  noScroll?: boolean;
}

const BasePage: React.FC<BasePageProps> = ({ children, noScroll = false }) => {
  const [isStickyHeader, setIsStickyHeader] = useState<boolean>(false);
  const layoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const offsetTop = layoutRef.current?.getBoundingClientRect().top ?? 0;
      setIsStickyHeader(offsetTop < 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout ref={layoutRef} className={classNames({ 'layout-sticky-header': isStickyHeader })}>
      <Header isSticky={isStickyHeader} />
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

  &.layout-sticky-header {
    padding-top: var(--header-h);
  }
`;

const Content = styled.main<{
  $noScroll: boolean;
}>`
  padding: 32px var(--page-gutter);
  flex-grow: 1;

  ${({ $noScroll }) => {
    if ($noScroll)
      return css`
        padding: 32px 0 0 0;
        height: calc(100vh - var(--header-h) - var(--footer-h));
        overflow: hidden;
      `;
  }}
`;

export default BasePage;
