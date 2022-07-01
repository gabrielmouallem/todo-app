import React, {useCallback} from 'react';
import {GestureResponderEvent} from 'react-native';
import {CButton} from './CustomButton.styles';

interface CustomButtonProps {
  children: string;
  onPress?:
    | (((event: GestureResponderEvent) => void) & (() => void))
    | undefined;
}

export default function CustomButton({children, onPress = () => {}}: CustomButtonProps) {
  return (
    <CButton.Container onPress={onPress}>
      <CButton.Text>{children}</CButton.Text>
    </CButton.Container>
  );
}
