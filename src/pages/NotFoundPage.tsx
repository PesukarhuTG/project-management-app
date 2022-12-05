import React from 'react';
import { BasePage } from '../components';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLocaleMessage } from '../hooks';

const NotFoundPage: React.FC = () => {
  const message = useLocaleMessage();

  return (
    <BasePage>
      <Result
        status="404"
        title="404"
        subTitle={message('errorTitle')}
        extra={<StyledLink to="/">{message('btnPage404')}</StyledLink>}
      />
    </BasePage>
  );
};

const StyledLink = styled(Link)`
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: var(--primary-dark);
`;

export default NotFoundPage;
