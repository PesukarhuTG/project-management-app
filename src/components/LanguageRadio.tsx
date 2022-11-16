import React from 'react';
import { Radio, RadioChangeEvent } from 'antd';

const LanguageRadio = () => {
  return (
    <Radio.Group
      defaultValue="en"
      buttonStyle="solid"
      onChange={(event: RadioChangeEvent) => console.log(event.target.value)}
    >
      <Radio.Button value="ru">EN</Radio.Button>
      <Radio.Button value="en">RU</Radio.Button>
    </Radio.Group>
  );
};

export default LanguageRadio;
