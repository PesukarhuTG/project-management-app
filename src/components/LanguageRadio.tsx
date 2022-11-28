import React from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import styled from 'styled-components';
import { changeLanguage } from '../store/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { useLocaleMessage } from '../hooks';

const LanguageRadio = () => {
  const dispatch = useDispatch<AppDispatch>();
  const message = useLocaleMessage();
  const { lang } = useSelector((state: RootState) => state.user);

  return (
    <StyledRadioGroup
      defaultValue={lang}
      buttonStyle="solid"
      onChange={(event: RadioChangeEvent) => dispatch(changeLanguage(event.target.value))}
    >
      <Radio.Button value="en">{message('btnEng')}</Radio.Button>
      <Radio.Button value="ru">{message('btnRus')}</Radio.Button>
    </StyledRadioGroup>
  );
};

const StyledRadioGroup = styled(Radio.Group)`
  .ant-radio-button-wrapper {
    padding: 0 15px;
    height: var(--btn-h);
    line-height: var(--btn-h);
    font-size: 18px;
    font-weight: 700;

    &:first-child {
      border-top-left-radius: var(--btn-br);
      border-bottom-left-radius: var(--btn-br);
    }

    &:last-child {
      border-top-right-radius: var(--btn-br);
      border-bottom-right-radius: var(--btn-br);
    }
  }
`;

export default LanguageRadio;
