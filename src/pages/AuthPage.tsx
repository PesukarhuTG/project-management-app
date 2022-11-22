import React from 'react';
import { BasePage, FormButton, FormInput } from '../components';
import { Form } from 'antd';
import styled from 'styled-components';
import AccessIco from '../assets/ico/icon-access.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/Store';
import {
  changeUserLogin,
  changeUserPassword,
  changeUserId,
  changeAuthStatus,
  changeUserName,
} from '../store/UserSlice';
import { loginUser, getUserById } from '../services/APIrequests';
import { decodeToken } from 'react-jwt';

interface AuthValue {
  userLogin: string;
  userPassword: string;
}

interface DecodedTokenProps {
  id: string;
  login: string;
  iat: number;
  exp: number;
}

const AuthPage: React.FC = () => {
  const [authForm] = Form.useForm();
  const { login, password } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onFinish = async (values: AuthValue) => {
    console.log('Success:', values);
    const { userLogin, userPassword } = values;

    try {
      const { token } = await loginUser(userLogin, userPassword).then((res) => res.data);
      const decodedToken: DecodedTokenProps | null = await decodeToken(token);

      await dispatch(changeUserLogin(userLogin));
      await dispatch(changeUserPassword(userPassword));
      await dispatch(changeAuthStatus(true));

      if (decodedToken !== null) {
        localStorage.setItem('idUser', decodedToken.id);
        await dispatch(changeUserId(decodedToken.id));
      }

      localStorage.setItem('tokenUser', token);
      localStorage.setItem('loginUser', userLogin);

      navigate('/boards');

      const { name } = await getUserById().then((res) => res.data);
      dispatch(changeUserName(name));
    } catch (e) {
      console.log(e);
    } finally {
      authForm.resetFields();
    }
  };

  const onFinishFailed = () => {
    console.log('onFinishFailed');
  };

  return (
    <BasePage>
      <PageIcon />
      <PageTitle>Sign In</PageTitle>
      <StyledForm
        form={authForm}
        name="auth"
        layout="vertical"
        initialValues={{ login, password }}
        onFinish={(values) => onFinish(values as AuthValue)}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="userLogin"
          rules={[
            { required: true, message: 'Please input your login!' },
            { type: 'string', min: 2, message: 'Login must be at least 2 characters' },
          ]}
        >
          <FormInput placeholder="Login *" type="text" />
        </Form.Item>

        <Form.Item
          name="userPassword"
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
          <FormButton type="primary" htmlType="submit">
            Sign in
          </FormButton>
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

export default AuthPage;
