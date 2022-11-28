import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const showNotification = (type: NotificationType, title: string = '', msg: string = '') => {
  notification[type]({
    message: title,
    description: msg,
  });
};
