import RcDialog, { DialogProps } from "rc-dialog";
import { IconClose } from "../../styles/icons";

export interface ModalProps extends DialogProps {}

const Modal: React.FC<ModalProps> = ({ visible, onClose, children }) => {
  return (
    <RcDialog
      visible={visible}
      animation="zoom"
      maskAnimation="fade"
      onClose={onClose}
      forceRender
      closeIcon={<IconClose width={20} height={20} />}
    >
      {children}
    </RcDialog>
  );
};

export default Modal;
