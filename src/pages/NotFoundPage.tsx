import React from 'react';
import { BasePage } from '../components';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPage: React.FC = () => {
  return (
    <BasePage>
      <Result
        status="404"
        title="404"
        subTitle="Something went wrong..."
        extra={<StyledLink to="/">Back to main page</StyledLink>}
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
