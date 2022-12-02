import { ButtonProps } from 'antd';

export interface OptionsProps {
  value: string;
  label: string;
}

// interface OkButtonProps

interface ModalProps {
  title: string;
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
  okButtonProps?: ButtonProps;
}

export interface TaskModalProps extends ModalProps {
  onChange: (value: string) => void;
  options: OptionsProps[];
}

export default ModalProps;
