import React, { useEffect, useState } from 'react';
import { BasePage, ConfirmModal, FormButton, FormInput } from '../components';
import { Form, message as messageAntd } from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/Store';
import { editUserById, loginUser, deleteUser } from '../services/APIrequests';
import { useNavigate } from 'react-router-dom';
import { changeUserData, changeAuthStatus, removeUserData } from '../store/UserSlice';
import { useLocaleMessage } from '../hooks';
import checkTokenExpired from '../services/checkTokenExpired';
import { decodeToken } from 'react-jwt';
import { DecodedTokenProps } from '../types';

interface EditFormValues {
  userName: string;
  userLogin: string;
  userPassword: string;
}

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [confirmFormVisible, setConfirmFormVisible] = useState<boolean>(false);
  const { name, login, password } = useSelector((state: RootState) => state.user);
  const [messageApi, contextHolder] = messageAntd.useMessage();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const message = useLocaleMessage();

  const logout = () => {
    dispatch(changeAuthStatus(false));
    dispatch(removeUserData());
    localStorage.clear();
    navigate('/');
  };

  const showSuccessMessage = () => {
    messageApi.open({
      type: 'success',
      content: message('successEditMessage'),
    });
  };

  const showErrorMessage = () => {
    messageApi.open({
      type: 'error',
      content: message('failedEditMessage'),
    });
  };

  const onFinish = async (values: EditFormValues) => {
    const { userName, userLogin, userPassword } = values;
    const authStatus = checkTokenExpired();

    if (authStatus) {
      try {
        const { name, login } = await editUserById(userName, userLogin, userPassword).then((res) => res.data);
        const { token } = await loginUser(login, userPassword).then((res) => res.data);
        const { id, exp } = (await decodeToken(token)) as DecodedTokenProps;

        const userData = {
          name,
          login,
          password: userPassword,
          id,
        };

        dispatch(changeUserData(userData));
        dispatch(changeAuthStatus(true));

        showSuccessMessage();

        localStorage.setItem('idUser', id);
        localStorage.setItem('tokenUser', token);
        localStorage.setItem('loginUser', login);
        localStorage.setItem('expToken', String(exp));
      } catch {
        showErrorMessage();
      } finally {
        form.resetFields();
      }
    } else {
      logout();
    }
  };

  const onDeleteUser = async () => {
    const authStatus = checkTokenExpired();

    if (authStatus) {
      try {
        await deleteUser();
        logout();
      } catch {
        showErrorMessage();
      }
    } else {
      logout();
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('tokenUser')) {
      navigate('/');
    } else {
      const authStatus = checkTokenExpired();
      if (!authStatus) {
        logout();
      }
    }
  }, []); // eslint-disable-line

  return (
    <BasePage>
      {contextHolder}
      <ProfileTitle>{message('profilePageTitle')}</ProfileTitle>
      <StyledForm
        form={form}
        layout="vertical"
        initialValues={{ name, login, password }}
        onFinish={(values) => onFinish(values as EditFormValues)}
        onFinishFailed={() => console.log('onFinishFailed')}
        autoComplete="off"
      >
        <Form.Item
          label={message('userNameLabel')}
          name="userName"
          rules={[
            { required: true, message: message('nameInputValidation1') },
            { type: 'string', min: 2, message: message('nameInputValidation2') },
          ]}
        >
          <FormInput placeholder={name || message('namePlaceholder')} />
        </Form.Item>
        <Form.Item
          label={message('userLoginLabel')}
          name="userLogin"
          rules={[
            { required: true, message: message('loginInputValidation1') },
            { type: 'string', min: 2, message: message('loginInputValidation2') },
          ]}
        >
          <FormInput placeholder={login || message('loginPlaceholder')} />
        </Form.Item>
        <Form.Item
          label={message('userPasswordLabel')}
          name="userPassword"
          rules={[
            { required: true, message: message('passwordInputValidation1') },
            { type: 'string', min: 8, message: message('passwordInputValidation2') },
          ]}
        >
          <FormInput placeholder={password || message('passwordPlaceholder')} type="password" autoComplete="on" />
        </Form.Item>
        <Form.Item>
          <FormButtons>
            <PrimaryButton htmlType="submit">{message('btnUpdateProfile')}</PrimaryButton>
            <SecondaryButton onClick={() => setConfirmFormVisible(true)}>{message('btnDeleteProfile')}</SecondaryButton>
          </FormButtons>
        </Form.Item>
      </StyledForm>
      <ConfirmModal
        title={message('confirmDeleteProfile')}
        isVisible={confirmFormVisible}
        onOk={onDeleteUser}
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
