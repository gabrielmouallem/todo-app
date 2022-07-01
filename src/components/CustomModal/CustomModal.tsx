import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {GestureResponderEvent, Modal, ModalProps} from 'react-native';
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
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const open = (e: GestureResponderEvent | undefined = undefined) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsVisible(true);
  }

  const close = (e: GestureResponderEvent | undefined = undefined) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
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
    <Modal visible={isVisible} transparent animationType='fade' {...rest} >
      <CModal.Backdrop onTouchEnd={close}>
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