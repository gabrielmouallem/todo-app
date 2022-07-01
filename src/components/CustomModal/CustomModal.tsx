import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Modal, ModalProps} from 'react-native';
import { CButton, CModal } from './CustomModal.styles';

export interface ModalRef {
  open(): void;
  close(): void;
}

interface CustomModalProps extends ModalProps {
  title: string,
}

const CustomModal: React.ForwardRefRenderFunction<ModalRef, CustomModalProps> = (
  {
    title,
    children,
    ...rest
  },
  ref,
) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const open = () => {
    setIsVisible(true);
  }

  const close = () => {
    setIsVisible(false);
  }

  useImperativeHandle(ref, () => ({
    open() {
      open();
    },
    close() {
      close();
    },
  }));

  return (
    <Modal visible={isVisible} transparent {...rest} >
      <CModal.Backdrop>
        <CModal.Container>
          <CModal.Header>
            <CButton.Container onPress={close}>
              <CButton.Text>X</CButton.Text>
            </CButton.Container>
            <CModal.Title>{title}</CModal.Title>
          </CModal.Header>
          {children}
        </CModal.Container>
      </CModal.Backdrop>
    </Modal>
  );
}

export default forwardRef(CustomModal);