import React, { useState } from 'react';
import { BasePage, ConfirmModal, FormButton, FormInput } from '../components';
import { Form, message } from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/Store';
import { editUserById, loginUser, deleteUser } from '../services/APIrequests';
import { useNavigate } from 'react-router-dom';
import { changeUserData, changeAuthStatus, removeUserData } from '../store/UserSlice';
import { useIntl } from 'react-intl';

interface EditFormValues {
  userName: string;
  userLogin: string;
  userPassword: string;
}

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [confirmFormVisible, setConfirmFormVisible] = useState<boolean>(false);
  const { name, login, password } = useSelector((state: RootState) => state.user);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const intl = useIntl();

  const showSuccessMessage = () => {
    messageApi.open({
      type: 'success',
      content: intl.formatMessage({ id: 'successEditMessage' }),
    });
  };

  const showErrorMessage = () => {
    messageApi.open({
      type: 'error',
      content: intl.formatMessage({ id: 'failedEditMessage' }),
    });
  };

  const onFinish = async (values: EditFormValues) => {
    console.log('Success:', values);
    const { userName, userLogin, userPassword } = values;

    try {
      const { name, _id, login } = await editUserById(userName, userLogin, userPassword).then((res) => res.data);
      const { token } = await loginUser(login, userPassword).then((res) => res.data);
      const userData = {
        name,
        login,
        password: userPassword,
        id: _id,
      };

      dispatch(changeUserData(userData));
      dispatch(changeAuthStatus(true));

      showSuccessMessage();

      localStorage.setItem('idUser', _id);
      localStorage.setItem('tokenUser', token);
      localStorage.setItem('loginUser', login);
    } catch {
      showErrorMessage();
    } finally {
      form.resetFields();
    }
  };

  const onDeleteUser = async () => {
    try {
      await deleteUser();
      dispatch(changeAuthStatus(false));
      dispatch(removeUserData());
      localStorage.clear();
      navigate('/');
    } catch {
      showErrorMessage();
    }
  };

  return (
    <BasePage>
      {contextHolder}
      <ProfileTitle>{intl.formatMessage({ id: 'profilePageTitle' })}</ProfileTitle>
      <StyledForm
        form={form}
        layout="vertical"
        initialValues={{ name, login, password }}
        onFinish={(values) => onFinish(values as EditFormValues)}
        onFinishFailed={() => console.log('onFinishFailed')}
        autoComplete="off"
      >
        <Form.Item
          label={intl.formatMessage({ id: 'userNameLabel' })}
          name="userName"
          rules={[
            { required: true, message: intl.formatMessage({ id: 'nameInputValidation1' }) },
            { type: 'string', min: 2, message: intl.formatMessage({ id: 'nameInputValidation2' }) },
          ]}
        >
          <FormInput placeholder={name || intl.formatMessage({ id: 'namePlaceholder' })} />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({ id: 'userLoginLabel' })}
          name="userLogin"
          rules={[
            { required: true, message: intl.formatMessage({ id: 'loginInputValidation1' }) },
            { type: 'string', min: 2, message: intl.formatMessage({ id: 'loginInputValidation2' }) },
          ]}
        >
          <FormInput placeholder={login || intl.formatMessage({ id: 'loginPlaceholder' })} />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({ id: 'userPasswordLabel' })}
          name="userPassword"
          rules={[
            { required: true, message: intl.formatMessage({ id: 'passwordInputValidation1' }) },
            { type: 'string', min: 8, message: intl.formatMessage({ id: 'passwordInputValidation2' }) },
          ]}
        >
          <FormInput
            placeholder={password || intl.formatMessage({ id: 'passwordPlaceholder' })}
            type="password"
            autoComplete="on"
          />
        </Form.Item>
        <Form.Item>
          <FormButtons>
            <PrimaryButton htmlType="submit">{intl.formatMessage({ id: 'btnUpdateProfile' })}</PrimaryButton>
            <SecondaryButton onClick={() => setConfirmFormVisible(true)}>
              {intl.formatMessage({ id: 'btnDeleteProfile' })}
            </SecondaryButton>
          </FormButtons>
        </Form.Item>
      </StyledForm>
      <ConfirmModal
        title={intl.formatMessage({ id: 'confirmDeleteProfile' })}
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
