import React from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import styled from 'styled-components';

const LanguageRadio = () => {
  return (
    <StyledRadioGroup
      defaultValue="en"
      buttonStyle="solid"
      onChange={(event: RadioChangeEvent) => console.log(event.target.value)}
    >
      <Radio.Button value="en">EN</Radio.Button>
      <Radio.Button value="ru">RU</Radio.Button>
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
