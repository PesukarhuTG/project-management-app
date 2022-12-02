export interface OptionsProps {
  value: string;
  label: string;
}

interface ModalProps {
  title: string;
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
}

export interface TaskModalProps extends ModalProps {
  onChange: (value: string) => void;
  options: OptionsProps[];
}

export default ModalProps;
