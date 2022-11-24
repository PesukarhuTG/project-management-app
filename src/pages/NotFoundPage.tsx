import React from 'react';
import { BasePage } from '../components';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

const NotFoundPage: React.FC = () => {
  const intl = useIntl();

  return (
    <BasePage>
      <Result
        status="404"
        title="404"
        subTitle={intl.formatMessage({ id: 'page404Subtitle' })}
        extra={<StyledLink to="/">{intl.formatMessage({ id: 'btnPage404' })}</StyledLink>}
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
