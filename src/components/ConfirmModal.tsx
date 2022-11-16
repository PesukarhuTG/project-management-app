import { Modal } from 'antd';
import React, { FC } from 'react';
import styled from 'styled-components';

interface ConfirmModalProps {
  title: string;
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  title = 'Do you want to delete this board?',
  isVisible,
  onOk,
  onCancel,
}) => {
  return (
    <StyledModal
      title={title}
      open={isVisible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Yes"
      cancelText="No"
      destroyOnClose
      centered
      width={600}
    />
  );
};

const StyledModal = styled(Modal)`
  .ant-modal-header {
    display: flex;
    justify-content: center;
  }

  .ant-modal-title {
    font-weight: 700;
    font-size: 30px;
    line-height: 41px;
    color: var(--primary);
    margin-bottom: 30px;
  }

  .ant-modal-content {
    border-radius: 30px;
    padding: 160px 45px;
  }

  .ant-modal-header {
    border-radius: 30px 30px 0 0;
    padding: 0;
    border: 0;
  }

  .ant-modal-body {
    display: none;
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

export default ConfirmModal;
