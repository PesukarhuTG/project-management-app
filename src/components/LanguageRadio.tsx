import React from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import styled from 'styled-components';
import { changeLanguage } from '../store/UserSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/Store';
import { useIntl } from 'react-intl';

const LanguageRadio = () => {
  const dispatch = useDispatch<AppDispatch>();
  const intl = useIntl();

  return (
    <StyledRadioGroup
      defaultValue="en"
      buttonStyle="solid"
      onChange={(event: RadioChangeEvent) => dispatch(changeLanguage(event.target.value))}
    >
      <Radio.Button value="en">{intl.formatMessage({ id: 'btnEng' })}</Radio.Button>
      <Radio.Button value="ru">{intl.formatMessage({ id: 'btnRus' })}</Radio.Button>
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
