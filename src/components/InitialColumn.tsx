import React from 'react';
import styled from 'styled-components';
import { useLocaleMessage } from '../hooks';

const InitialColumn = () => {
  const message = useLocaleMessage();
  return (
    <ColumnBody onClick={() => console.log('открывает модалку на создание колонки')}>
      <ColumnTitle> + {message('initialColumnTitle')}</ColumnTitle>
    </ColumnBody>
  );
};

const ColumnBody = styled.div`
  margin-left: 100px;
  max-width: 386px;
  min-width: 300px;
  height: 156px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--primary-light);
  color: var(--primary-dark);
  box-shadow: 0 4px 4px rgb(0 0 0 / 25%);
  border-radius: 30px;
  overflow: hidden;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px 0 var(--btn-primary-hover);
  }
`;

export const ColumnTitle = styled.p`
  font-weight: 700;
  font-size: 26px;
`;

export default InitialColumn;
