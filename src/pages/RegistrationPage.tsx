import { Button, Form } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { BasePage, FormInput } from '../components';
import AccessIco from '../assets/ico/icon-access.svg';
import { Link } from 'react-router-dom';

interface RegistrationValue {
  name: string;
  email: string;
  password: string;
}

const initialValues: RegistrationValue = {
  name: '',
  email: '',
  password: '',
};

const RegistrationPage: React.FC = () => {
  const [registrationForm] = Form.useForm();

  const onFinish = (values: RegistrationValue | unknown) => {
    console.log('Success:', values);
    registrationForm.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <BasePage>
      <PageIcon />
      <PageTitle>Sign Up</PageTitle>
      <StyledForm
        form={registrationForm}
        name="registration"
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="Name"
          rules={[
            { required: true, message: 'Please input your name!' },
            { type: 'string', min: 2, message: 'Name must be at least 2 characters' },
          ]}
        >
          <FormInput placeholder="Name *" type="text" />
        </Form.Item>

        <Form.Item name="Email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <FormInput placeholder="Email *" type="email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { type: 'string', min: 8, message: 'Password must be at least 8 characters' },
          ]}
        >
          <FormInput placeholder="Password *" type="password" autoComplete="on" />
        </Form.Item>

        <Form.Item>
          <FormText>
            Have an account? <StyledLink to="/auth">Sign in</StyledLink>
          </FormText>
        </Form.Item>

        <Form.Item>
          <StyledButton type="primary" htmlType="submit" onClick={() => console.log()}>
            Sign up
          </StyledButton>
        </Form.Item>
      </StyledForm>
    </BasePage>
  );
};

const PageIcon = styled.div`
  margin: 10px auto 20px;
  width: 73px;
  height: 73px;
  background: url(${AccessIco});
`;

const PageTitle = styled.p`
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 40px;
  line-height: 54px;
  text-align: center;
  color: var(--primary);
`;

const StyledForm = styled(Form)`
  margin: 0 auto;
  max-width: 400px;

  .ant-col-offset-8 {
    margin: 0;
  }

  .ant-col-16 {
    max-width: 100%;
  }
`;

const FormText = styled.p`
  font-size: 18px;
  line-height: 36px;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: var(--btn-primary);
  font-weight: 700;

  &:hover {
    color: var(--btn-primary-hover);
  }
`;

const StyledButton = styled(Button)`
  height: 47px;
  width: 100%;
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

export default RegistrationPage;
