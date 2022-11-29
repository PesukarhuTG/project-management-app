import React, { useEffect } from 'react';
import { BasePage, FormButton, FormInput } from '../components';
import { Form } from 'antd';
import styled from 'styled-components';
import AccessIco from '../assets/ico/icon-access.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/Store';
import { changeAuthStatus, changeUserData } from '../store/UserSlice';
import { loginUser, getUserById } from '../services/APIrequests';
import { decodeToken } from 'react-jwt';
import { useLocaleMessage } from '../hooks';
import { DecodedTokenProps } from '../types';
import { showNotification } from '../services/notification.service';

interface AuthValue {
  userLogin: string;
  userPassword: string;
}

const AuthPage: React.FC = () => {
  const [authForm] = Form.useForm();
  const { login, password } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const message = useLocaleMessage();

  const onFinish = async (values: AuthValue) => {
    const { userLogin, userPassword } = values;

    try {
      const { token } = await loginUser(userLogin, userPassword).then((res) => res.data);
      const { id, exp } = (await decodeToken(token)) as DecodedTokenProps;

      localStorage.setItem('idUser', id);
      localStorage.setItem('tokenUser', token);
      localStorage.setItem('loginUser', userLogin);
      localStorage.setItem('expToken', String(exp));

      const { name } = await getUserById().then((res) => res.data);

      const userData = {
        name,
        login: userLogin,
        password: userPassword,
        id,
      };

      dispatch(changeUserData(userData));
      dispatch(changeAuthStatus(true));
      navigate('/boards');
      showNotification('success', message('successAuthTitle'));
    } catch (e) {
      showNotification('error', message('errorTitle'), (e as Error).message);
    } finally {
      authForm.resetFields();
    }
  };

  useEffect(() => {
    if (localStorage.getItem('tokenUser')) {
      navigate('/');
      showNotification('info', message('pageAccessTitle'), message('pageAuthAccessMessage'));
    }
  }, []); //eslint-disable-line

  return (
    <BasePage>
      <PageIcon />
      <PageTitle>{message('authPageTitle')}</PageTitle>
      <StyledForm
        form={authForm}
        name="auth"
        layout="vertical"
        initialValues={{ login, password }}
        onFinish={(values) => onFinish(values as AuthValue)}
        autoComplete="off"
      >
        <Form.Item
          name="userLogin"
          rules={[
            { required: true, message: message('loginInputValidation1') },
            { type: 'string', min: 2, message: message('loginInputValidation2') },
          ]}
        >
          <FormInput placeholder={message('loginPlaceholder')} type="text" />
        </Form.Item>

        <Form.Item
          name="userPassword"
          rules={[
            { required: true, message: message('passwordInputValidation1') },
            { type: 'string', min: 8, message: message('passwordInputValidation2') },
          ]}
        >
          <FormInput placeholder={message('passwordPlaceholder')} type="password" autoComplete="on" />
        </Form.Item>

        <Form.Item>
          <FormText>
            {message('textLinkToRegistration')}
            <StyledLink to="/registration">{message('btnSignUp')}</StyledLink>
          </FormText>
        </Form.Item>

        <Form.Item>
          <FormButton type="primary" htmlType="submit">
            {message('btnSignIn')}
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
  max-width: 560px;
  width: 100%;
  margin: 0 auto;

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
