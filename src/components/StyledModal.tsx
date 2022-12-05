import React, { FC } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import { useLocaleMessage } from '../hooks';
import { ModalProps } from '../types';

const StyledModal: FC<ModalProps> = ({ children, title, isVisible, onOk, onCancel, okButtonProps }) => {
  const message = useLocaleMessage();

  return (
    <StyledAntModal
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      okText={message('saveModal')}
      cancelText={message('cancelModal')}
      open={isVisible}
      destroyOnClose
      centered
      width={600}
      okButtonProps={okButtonProps}
    >
      {children}
    </StyledAntModal>
  );
};

const StyledAntModal = styled(Modal)`
  .ant-modal-content {
    margin: 0 10px;
  }

  .ant-modal-header {
    display: flex;
    justify-content: center;
  }

  .ant-modal-title {
    font-weight: 700;
    font-size: 36px;
    line-height: 1.2;
    color: var(--primary);
    margin-bottom: 16px;
    text-align: center;

    @media (max-width: 610px) {
      font-size: 28px;
    }
  }

  .ant-modal-content {
    border-radius: 30px;
    padding: 50px;

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
    display: flex;
    flex-direction: column;
    padding: 0;
    font-weight: 700;
    font-size: 18px;
  }

  .ant-modal-footer {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 10px 0 0;
    border: 0;

    @media (max-width: 340px) {
      gap: 5px;
    }
  }

  .ant-btn {
    height: 47px;
    font-size: 18px;
    font-weight: 700;
    border-radius: 10px;

    @media (max-width: 576px) {
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

  @media (max-width: 700px) {
    font-size: 16px;
  }
`;

export default StyledModal;
