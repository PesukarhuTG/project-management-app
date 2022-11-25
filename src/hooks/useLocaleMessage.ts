import { useCallback } from 'react';
import { useIntl } from 'react-intl';

const useLocaleMessage = () => {
  const { formatMessage } = useIntl();
  return useCallback((id: string) => formatMessage({ id }), [formatMessage]);
};

export default useLocaleMessage;
