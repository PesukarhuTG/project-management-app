import React, { useState } from 'react';
import { BasePage, ConfirmModal, FormButton, FormInput } from '../components';
import { Form, Upload } from 'antd';
import styled from 'styled-components';

interface FormValues {
  userName: string;
  login: string;
  password: string;
}

const initialValues: FormValues = { userName: '', login: '', password: '' };

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [confirmFormVisible, setConfirmFormVisible] = useState<boolean>(false);

  const onFinish = (value: FormValues | unknown) => {
    console.log(value);
    form.resetFields();
  };

  return (
    <BasePage>
      <ProfileTitle>Profile editing fields</ProfileTitle>
      <StyledForm
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={() => console.log('onFinishFailed')}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="userName"
          rules={[
            { required: true, message: 'Please input your name!' },
            { type: 'string', min: 2, message: 'Name must be at least 2 characters' },
          ]}
        >
          <FormInput placeholder="UserName" />
        </Form.Item>
        <Form.Item
          label="Login"
          name="login"
          rules={[
            { required: true, message: 'Please input your login!' },
            { type: 'string', min: 2, message: 'Login must be at least 2 characters' },
          ]}
        >
          <FormInput placeholder="LoginName" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { type: 'string', min: 8, message: 'Password must be at least 8 characters' },
          ]}
        >
          <FormInput placeholder="Password" type="password" autoComplete="on" />
        </Form.Item>
        <Form.Item valuePropName="fileList">
          <Upload action="/" listType="text" maxCount={1} accept=".png,.jpeg,.jpg">
            <PrimaryButton>Change avatar</PrimaryButton>
          </Upload>
        </Form.Item>
        <Form.Item>
          <FormButtons>
            <PrimaryButton htmlType="submit">Update profile</PrimaryButton>
            <SecondaryButton onClick={() => setConfirmFormVisible(true)}>Delete profile</SecondaryButton>
          </FormButtons>
        </Form.Item>
      </StyledForm>
      <ConfirmModal
        title="Do you want to delete your profile?"
        isVisible={confirmFormVisible}
        onOk={() => console.log('delete profile')}
        onCancel={() => setConfirmFormVisible(false)}
      />
    </BasePage>
  );
};

const ProfileTitle = styled.p`
  text-align: center;
  margin: 20px 0 30px;
  color: var(--primary);
  font-weight: 800;
  font-size: 30px;
  line-height: 41px;

  @media (max-width: 600px) {
    margin: 10px 0 20px;
    font-size: 26px;
    line-height: 30px;
  }
`;

const StyledForm = styled(Form)`
  max-width: 646px;
  margin: 0 auto 50px;
  background: var(--primary-light);
  border-radius: 30px;
  padding: 50px 123px;

  @media (max-width: 600px) {
    margin-bottom: 0;
    padding: 20px 20px;
  }

  .ant-form-item {
    margin: 0;
    padding-top: 20px;
  }

  .ant-form-item-label {
    padding: 0;

    & > label {
      padding-left: 20px;
      margin-bottom: 3px;
      color: var(--main-font);
      font-size: 18px;
      font-weight: 700;
      line-height: 26px;
    }
  }

  .ant-form-item-control-input-content {
    display: flex;
    justify-content: center;
  }

  .ant-upload {
    text-align: center;
    display: block;
  }

  .ant-upload-list-item-list-type-text {
    max-width: 400px;

    @media (max-width: 600px) {
      max-width: 220px;
    }
  }
`;

const PrimaryButton = styled(FormButton)`
  background: var(--btn-primary);
  border: 1px solid var(--btn-primary);

  &:hover {
    background: var(--btn-primary-hover);
    border: 1px solid var(--btn-primary-hover);
  }

  &:focus,
  &:active {
    background: var(--btn-primary);
    border: 1px solid var(--btn-primary);
  }
`;

const FormButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-top: 40px;

  @media (max-width: 450px) {
    padding-top: 30px;
    flex-direction: column;
    gap: 10px;
  }
`;

const SecondaryButton = styled(FormButton)`
  background: var(--btn-second);
  border: 1px solid var(--btn-second);

  &:hover {
    background: var(--btn-second-hover);
    border: 1px solid var(--btn-second-hover);
  }

  &:focus,
  &:active {
    background: var(--btn-second);
    border: 1px solid var(--btn-second);
  }
`;

export default ProfilePage;
