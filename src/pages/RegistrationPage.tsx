import { Form } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BasePage, FormButton, FormInput } from '../components';
import AccessIco from '../assets/ico/icon-access.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/Store';
import { changeAuthStatus, changeUserData } from '../store/UserSlice';
import { registrationUser, loginUser } from '../services/APIrequests';
import { useLocaleMessage } from '../hooks';
import { showNotification } from '../services/notification.service';
import { decodeToken } from 'react-jwt';
import { DecodedTokenProps } from '../types';

interface RegistrationValue {
  userName: string;
  userLogin: string;
  userPassword: string;
}

const RegistrationPage: React.FC = () => {
  const [registrationForm] = Form.useForm<RegistrationValue>();
  const { name, login, password } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const message = useLocaleMessage();

  const onFinish = async (values: RegistrationValue) => {
    const { userName, userLogin, userPassword } = values;

    try {
      const { name, _id, login } = await registrationUser(userName, userLogin, userPassword).then((res) => res.data);
      const { token } = await loginUser(userLogin, userPassword).then((res) => res.data);
      const { id, exp } = (await decodeToken(token)) as DecodedTokenProps;

      const userData = {
        name,
        login,
        password: userPassword,
        id: _id,
      };

      dispatch(changeUserData(userData));
      dispatch(changeAuthStatus(true));

      localStorage.setItem('idUser', id);
      localStorage.setItem('tokenUser', token);
      localStorage.setItem('loginUser', login);
      localStorage.setItem('expToken', String(exp));

      navigate('/boards');
      showNotification('success', message('successAuthTitle'));
    } catch (e) {
      showNotification('error', message('errorTitle'), (e as Error).message);
    } finally {
      registrationForm.resetFields();
    }
  };

  useEffect(() => {
    if (localStorage.getItem('tokenUser')) {
      navigate('/');
      showNotification('info', message('pageAccessTitle'), message('pageRegAccessMessage'));
    }
  }, []); //eslint-disable-line

  return (
    <BasePage>
      <PageIcon />
      <PageTitle>{message('registrationPageTitle')}</PageTitle>
      <StyledForm
        form={registrationForm}
        name="registration"
        layout="vertical"
        initialValues={{ name, login, password }}
        onFinish={(values) => onFinish(values as RegistrationValue)}
        autoComplete="off"
      >
        <Form.Item
          name="userName"
          rules={[
            { required: true, message: message('nameInputValidation1') },
            { type: 'string', min: 2, message: message('nameInputValidation2') },
          ]}
        >
          <FormInput placeholder={message('namePlaceholder')} type="text" />
        </Form.Item>

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
            {message('textLinkToAuthorization')}
            <StyledLink to="/auth">{message('btnSignIn')}</StyledLink>
          </FormText>
        </Form.Item>

        <Form.Item>
          <FormButton type="primary" htmlType="submit">
            {message('btnSignUp')}
          </FormButton>
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

export default RegistrationPage;
