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
    line-height: 1.3;
    color: var(--primary);
    margin-bottom: 30px;
    text-align: center;

    @media (max-width: 610px) {
      font-size: 26px;
    }
  }

  .ant-modal-content {
    margin: 0 10px;
    border-radius: 30px;
    padding: 60px 50px;

    @media (max-width: 576px) {
      padding: 50px 20px;
    }
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

    @media (max-width: 610px) {
      gap: 5px;
    }
  }

  .ant-btn {
    height: 47px;
    min-width: 100px;
    font-size: 18px;
    font-weight: 700;
    border-radius: 10px;

    @media (max-width: 610px) {
      font-size: 16px;
    }
  }

  .ant-btn-default {
    background-color: var(--btn-second);
    color: var(--light-font);
    border: 0;

    &:hover {
      background-color: var(--btn-second-hover);
    }
  }
`;

export default ConfirmModal;
