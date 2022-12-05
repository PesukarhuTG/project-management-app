import styled from 'styled-components';

export const BoardWrapper = styled.div`
  min-width: 260px;
  min-height: 250px;
  display: flex;
  flex-direction: column;
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

export const BoardTitle = styled.p`
  width: 100%;
  margin-bottom: 5px;
  font-weight: 700;
  font-size: 26px;
  line-height: 35px;
  overflow: hidden;

  @media (max-width: 610px) {
    font-size: 22px;
    line-height: 1.5;
  }
`;
