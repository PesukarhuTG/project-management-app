import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BasePage, Button, ColumnModal } from '../components';

const BoardPage: React.FC = () => {
  const navigate = useNavigate();
  const [isShowColumnModal, setIsShowColumnModal] = useState<boolean>(false);

  const addColumn = () => {
    /*TODO add column*/
    setIsShowColumnModal(false);
  };

  return (
    <BasePage noScroll>
      <Container>
        <ControlPanel>
          <HideXs>
            <Button label="🡐 Back to Boards list" onClick={() => navigate('/boards')} />
          </HideXs>
          <Button label="+ Create new column" onClick={() => setIsShowColumnModal(true)} />
        </ControlPanel>
        <Title>Board: titleBoard </Title>
        <ColumnsPanel>
          <div style={{ background: '#fff', border: '1px solid red' }}> Колонка 1 </div>
          <div style={{ background: '#fff', border: '1px solid red' }}> Колонка 2 </div>
          <div style={{ background: '#fff', border: '1px solid red' }}> Колонка 3 </div>
          <div style={{ background: '#fff', border: '1px solid red' }}> Колонка 4 </div>
          <div style={{ background: '#fff', border: '1px solid red' }}> Колонка 5 </div>
        </ColumnsPanel>
      </Container>

      <ColumnModal
        title="Add column"
        isVisible={isShowColumnModal}
        onOk={addColumn}
        onCancel={() => setIsShowColumnModal(false)}
      />
    </BasePage>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ControlPanel = styled.div`
  padding: 0 var(--page-gutter);
  display: flex;
  justify-content: space-between;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const HideXs = styled.div`
  @media (max-width: 480px) {
    display: none;
  }
`;

const Title = styled.h2`
  padding: 0 var(--page-gutter);
  color: var(--primary-dark);
  font-size: 26px;
  font-weight: 800;
`;

const ColumnsPanel = styled.div`
  padding: 0 var(--page-gutter);
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fill, minmax(426px, 1fr));
  grid-auto-columns: minmax(426px, 1fr);
  gap: 0 40px;
  justify-content: start;
  align-items: start;

  grid-auto-flow: column;
  overflow-x: auto;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(340px, 426px));
    grid-auto-columns: minmax(340px, 426px);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 426px));
    grid-auto-columns: minmax(300px, 426px);
  }
`;

export default BoardPage;
