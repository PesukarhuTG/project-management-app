import React, { FC } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import { ModalProps } from '../types';
import { useIntl } from 'react-intl';

const StyledModal: FC<ModalProps> = ({ children, title, isVisible, onOk, onCancel }) => {
  const intl = useIntl();

  return (
    <StyledAntModal
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      okText={intl.formatMessage({ id: 'saveModal' })}
      cancelText={intl.formatMessage({ id: 'cancelModal' })}
      open={isVisible}
      destroyOnClose
      centered
      width={600}
    >
      {children}
    </StyledAntModal>
  );
};

const StyledAntModal = styled(Modal)`
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
    padding: 10px 0 0;
    border: 0;
  }

  .ant-btn {
    height: 47px;
    width: 100px;
    font-size: 18px;
    border-radius: 10px;
  }
`;

export default StyledModal;
