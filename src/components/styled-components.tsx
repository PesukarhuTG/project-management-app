import styled from 'styled-components';

export const BoardWrapper = styled.div`
  max-width: 426px;
  min-height: 290px;
  display: flex;
  flex-direction: column;
  color: var(--primary-dark);
  border: 2px solid var(--primary-dark);
  border-radius: 30px;
`;

export const BoardTitle = styled.p`
  margin-bottom: 5px;
  font-weight: 700;
  font-size: 26px;
  line-height: 35px;
`;
