declare module 'modal-react-native-web' {
  import * as React from 'react';
  import { ModalProps } from 'react-native';

  const Modal: React.ComponentType<ModalProps & { ariaHideApp?: boolean }>;
  export default Modal;
}
