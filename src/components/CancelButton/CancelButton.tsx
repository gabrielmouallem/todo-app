import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {CButton} from './CancelButton.styles';

interface CancelButtonProps {
  children: string;
  onPress?:
    | (((event: GestureResponderEvent) => void) & (() => void))
    | undefined;
}

export default function CancelButton({children, onPress = () => {}}: CancelButtonProps) {
  return (
    <CButton.Container onPress={onPress}>
      <CButton.Text>{children}</CButton.Text>
    </CButton.Container>
  );
}
