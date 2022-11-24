import { Form } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { BasePage, FormButton, FormInput } from '../components';
import AccessIco from '../assets/ico/icon-access.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/Store';
import { changeAuthStatus, changeUserData } from '../store/UserSlice';
import { registrationUser, loginUser } from '../services/APIrequests';
import { useIntl } from 'react-intl';

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
  const intl = useIntl();

  const onFinish = async (values: RegistrationValue) => {
    console.log('Success:', values);
    const { userName, userLogin, userPassword } = values;

    try {
      const { name, _id, login } = await registrationUser(userName, userLogin, userPassword).then((res) => res.data);
      const { token } = await loginUser(userLogin, userPassword).then((res) => res.data);
      const userData = {
        name,
        login,
        password: userPassword,
        id: _id,
      };

      dispatch(changeUserData(userData));
      dispatch(changeAuthStatus(true));

      localStorage.setItem('idUser', _id);
      localStorage.setItem('tokenUser', token);
      localStorage.setItem('loginUser', login);

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
      <PageTitle>{intl.formatMessage({ id: 'registrationPageTitle' })}</PageTitle>
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
            { required: true, message: intl.formatMessage({ id: 'nameInputValidation1' }) },
            { type: 'string', min: 2, message: intl.formatMessage({ id: 'nameInputValidation2' }) },
          ]}
        >
          <FormInput placeholder={intl.formatMessage({ id: 'namePlaceholder' })} type="text" />
        </Form.Item>

        <Form.Item
          name="userLogin"
          rules={[
            { required: true, message: intl.formatMessage({ id: 'loginInputValidation1' }) },
            { type: 'string', min: 2, message: intl.formatMessage({ id: 'loginInputValidation2' }) },
          ]}
        >
          <FormInput placeholder={intl.formatMessage({ id: 'loginPlaceholder' })} type="text" />
        </Form.Item>

        <Form.Item
          name="userPassword"
          rules={[
            { required: true, message: intl.formatMessage({ id: 'passwordInputValidation1' }) },
            { type: 'string', min: 8, message: intl.formatMessage({ id: 'passwordInputValidation2' }) },
          ]}
        >
          <FormInput
            placeholder={intl.formatMessage({ id: 'passwordPlaceholder' })}
            type="password"
            autoComplete="on"
          />
        </Form.Item>

        <Form.Item>
          <FormText>
            {intl.formatMessage({ id: 'textLinkToAuthorization' })}
            <StyledLink to="/auth">{intl.formatMessage({ id: 'btnSignIn' })}</StyledLink>
          </FormText>
        </Form.Item>

        <Form.Item>
          <FormButton type="primary" htmlType="submit">
            {intl.formatMessage({ id: 'btnSignUp' })}
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
