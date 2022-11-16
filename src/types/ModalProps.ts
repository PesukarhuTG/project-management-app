interface OptionsProps {
  value: string;
  label: string;
}

interface ModalProps {
  title: string;
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
  onChange?: () => void;
  options?: OptionsProps[];
}

export default ModalProps;
