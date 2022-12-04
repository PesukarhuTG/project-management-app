import { ButtonProps } from 'antd';

export interface OptionsProps {
  value: string;
  label: string;
}

interface ModalProps {
  title: string;
  isVisible: boolean;
  onOk?: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
  okButtonProps?: ButtonProps;
}

export interface TaskModalProps extends ModalProps {
  onChange: (value: string) => void;
  options: OptionsProps[];
  data?: {
    title: string;
    description: string;
    userName: string;
  };
}

export interface OpenModalProps extends ModalProps {
  data: {
    title: string;
    description: string;
    userName: string;
  };
}

export default ModalProps;
