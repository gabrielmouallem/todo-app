import React from 'react';
import {CInput} from './CustomInput.styles';

interface CustomInputProps {
  value?: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  placeholder?: string;
}

export default function CustomInput({value, onChangeText, placeholder}: CustomInputProps) {
  return (
    <CInput.Container
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
    />
  );
}
