import React from 'react';
import { BasePage } from '../components';
import { Button, Form, Input, Upload } from 'antd';
import styled from 'styled-components';
import file from '../assets/ico/ico-edit.svg';

const ProfilePage: React.FC = () => (
  <BasePage>
    <ProfileTitle>Profile editing fields</ProfileTitle>
    <StyledForm
      name="basic"
      layout="vertical"
      // labelCol={{ span: 4 }}
      // wrapperCol={{ span: 4 }}
      initialValues={{}}
      onFinish={() => console.log('onFinish')}
      onFinishFailed={() => console.log('onFinishFailed')}
      autoComplete="off"
    >
      <Form.Item label="Username">
        <StyledInput placeholder="UserName" />
      </Form.Item>
      <Form.Item label="Login">
        <StyledInput placeholder="LoginName" />
      </Form.Item>
      <Form.Item label="Password">
        <StyledInput placeholder="UserName" />
      </Form.Item>
      <Form.Item valuePropName="fileList">
        <Upload action="/" listType="text" maxCount={1} accept=".png,.jpeg,.jpg.,svg">
          <PrimaryButton>Change avatar</PrimaryButton>
        </Upload>
      </Form.Item>
      <Form.Item>
        <FormButtons>
          <PrimaryButton>Update profile</PrimaryButton>
          <SecondaryButton>Delete profile</SecondaryButton>
        </FormButtons>
      </Form.Item>
    </StyledForm>
  </BasePage>
);

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

const StyledInput = styled(Input)`
  padding: 10px 20px;
  margin-bottom: 20px;
  font-size: 18px;
  line-height: 36px;
  border: 1px solid var(--primary-dark);
  border-radius: 10px;

  @media (max-width: 600px) {
    margin-bottom: 15px;
    line-height: 26px;
  }
`;

const StyledButton = styled(Button)`
  height: 47px;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  border-radius: 10px;
  color: var(--primary-light);
  transition: 0.3s;

  &:hover,
  &:focus,
  &:active {
    color: var(--primary-light);
  }
`;

const PrimaryButton = styled(StyledButton)`
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

const SecondaryButton = styled(StyledButton)`
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
