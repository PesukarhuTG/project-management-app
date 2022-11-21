import { Form } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { BasePage, FormButton, FormInput } from '../components';
import AccessIco from '../assets/ico/icon-access.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/Store';
import {
  changeUserName,
  changeUserLogin,
  changeUserPassword,
  changeUserId,
  changeAuthStatus,
} from '../store/UserSlice';
import { registrationUser, loginUser } from '../services/APIrequests';

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

  const onFinish = async (values: RegistrationValue) => {
    console.log('Success:', values);
    const { userName, userLogin, userPassword } = values;

    try {
      const { name, _id, login } = await registrationUser(userName, userLogin, userPassword).then((res) => res.data);
      const { token } = await loginUser(userLogin, userPassword).then((res) => res.data);

      await dispatch(changeUserName(name));
      await dispatch(changeUserLogin(login));
      await dispatch(changeUserPassword(userPassword));
      await dispatch(changeUserId(_id));
      await dispatch(changeAuthStatus(true));

      localStorage.setItem('idUser', _id);
      localStorage.setItem('tokenUser', token);
      localStorage.setItem('loginUser', login);
      localStorage.setItem('passwordUser', userPassword);

      navigate('/boards');
    } catch (e) {
      console.log(e);
    } finally {
      registrationForm.resetFields();
    }
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
        initialValues={{ name, login, password }}
        onFinish={(values) => onFinish(values as RegistrationValue)}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="userName"
          rules={[
            { required: true, message: 'Please input your name!' },
            { type: 'string', min: 2, message: 'Name must be at least 2 characters' },
          ]}
        >
          <FormInput placeholder="Name *" type="text" />
        </Form.Item>

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
            Have an account? <StyledLink to="/auth">Sign in</StyledLink>
          </FormText>
        </Form.Item>

        <Form.Item>
          <FormButton type="primary" htmlType="submit">
            Sign up
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
