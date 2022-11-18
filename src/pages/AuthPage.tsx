import React from 'react';
import { BasePage, FormButton, FormInput } from '../components';
import { Form, Button } from 'antd';
import styled from 'styled-components';
import AccessIco from '../assets/ico/icon-access.svg';
import { Link } from 'react-router-dom';

interface AuthValue {
  login: string;
  password: string;
}

const initialValues: AuthValue = {
  login: '',
  password: '',
};

const AuthPage: React.FC = () => {
  const [authForm] = Form.useForm();

  const onFinish = (values: AuthValue | unknown) => {
    console.log('Success:', values);
    authForm.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <BasePage>
      <PageIcon />
      <PageTitle>Sign In</PageTitle>
      <StyledForm
        form={authForm}
        name="auth"
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="login"
          rules={[
            { required: true, message: 'Please input your login!' },
            { type: 'string', min: 2, message: 'Login must be at least 2 characters' },
          ]}
        >
          <FormInput placeholder="Login *" type="text" />
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
            Don’t have an account? <StyledLink to="/registration">Sign up</StyledLink>
          </FormText>
        </Form.Item>

        <Form.Item>
          <StyledButton type="primary" htmlType="submit" onClick={() => console.log()}>
            Sign in
          </StyledButton>
        </Form.Item>
      </StyledForm>
    </BasePage>
  );
};

const PageIcon = styled.div`
  margin: 70px auto 20px;
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

const StyledButton = styled(FormButton)`
  width: 100%;
`;

export default AuthPage;
