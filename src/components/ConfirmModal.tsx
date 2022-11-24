import { Modal } from 'antd';
import React, { FC } from 'react';
import styled from 'styled-components';
import { ModalProps } from '../types';
import { useLocaleMessage } from '../hooks';

const ConfirmModal: FC<ModalProps> = ({ title, isVisible, onOk, onCancel }) => {
  const message = useLocaleMessage();

  return (
    <StyledAntModal
      title={title}
      open={isVisible}
      onOk={onOk}
      onCancel={onCancel}
      okText={message('confirmYes')}
      cancelText={message('confirmNo')}
      destroyOnClose
      centered
      width={620}
    />
  );
};

const StyledAntModal = styled(Modal)`
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
    text-align: center;
  }

  .ant-modal-content {
    border-radius: 30px;
    padding: 160px 40px;
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
