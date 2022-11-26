import React from 'react';
import { BasePage, FormButton, FormInput } from '../components';
import { Form } from 'antd';
import styled from 'styled-components';
import AccessIco from '../assets/ico/icon-access.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { changeAuthStatus, changeUserData } from '../store/userSlice';
import { loginUser, getUserById } from '../services/APIrequests';
import { decodeToken } from 'react-jwt';
import { useLocaleMessage } from '../hooks';

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
  const message = useLocaleMessage();

  const onFinish = async (values: AuthValue) => {
    console.log('Success:', values);
    const { userLogin, userPassword } = values;

    try {
      const { token } = await loginUser(userLogin, userPassword).then((res) => res.data);
      const decodedToken = (await decodeToken(token)) as DecodedTokenProps;

      localStorage.setItem('idUser', decodedToken.id);
      localStorage.setItem('tokenUser', token);
      localStorage.setItem('loginUser', userLogin);

      const { name } = await getUserById().then((res) => res.data);

      const userData = {
        name,
        login: userLogin,
        password: userPassword,
        id: decodedToken.id,
      };

      dispatch(changeUserData(userData));
      dispatch(changeAuthStatus(true));
      navigate('/boards');
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
      <PageTitle>{message('authPageTitle')}</PageTitle>
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
