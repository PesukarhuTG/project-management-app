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
}

export interface OpenModalProps {
  title: string;
  isVisible: boolean;
  onCancel: () => void;
  children?: React.ReactNode;
  data: {
    title: string;
    description: string;
    userName: string;
  };
}

export default ModalProps;
