import React, { FC } from 'react';
import { Modal, Input } from 'antd';
import styled from 'styled-components';

interface ColumnModalProps {
  title: string;
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const ColumnModal: FC<ColumnModalProps> = ({ title, isVisible, onOk, onCancel }) => {
  return (
    <>
      <StyledModal
        title={title}
        open={isVisible}
        onOk={onOk}
        onCancel={onCancel}
        okText="Save"
        destroyOnClose
        centered
        width={600}
      >
        <InputTitle>Column name</InputTitle>
        <StyledInput />
      </StyledModal>
    </>
  );
};

const StyledModal = styled(Modal)`
  .ant-modal-header {
    display: flex;
    justify-content: center;
  }

  .ant-modal-title {
    font-weight: 700;
    font-size: 40px;
    line-height: 54px;
    color: var(--primary);
    margin-bottom: 16px;
  }

  .ant-modal-content {
    border-radius: 30px;
    padding: 50px 122px;
  }

  .ant-modal-header {
    border-radius: 30px 30px 0 0;
    padding: 0;
    border: 0;
  }

  .ant-modal-body {
    display: flex;
    flex-direction: column;
    padding: 0;
    font-weight: 700;
    font-size: 18px;
  }

  .ant-modal-footer {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 0;
    border: 0;
  }

  .ant-btn {
    height: 47px;
    width: 100px;
    font-size: 18px;
    border-radius: 10px;
  }
`;

const StyledInput = styled(Input)`
  align-self: center;
  margin-bottom: 20px;
  border: 1px solid var(--primary-dark);
  font-size: 30px;
  border-radius: 10px;
`;

const InputTitle = styled.p`
  padding: 0 20px 3px;
`;

export default ColumnModal;
