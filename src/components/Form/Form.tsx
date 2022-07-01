import React from 'react';
import {Forms} from './Form.styles';
import {useTodos} from '../../hooks/useTodos';
import CustomButton from '../CustomButton/CustomButton';
import CustomInput from '../CustomInput/CustomInput';

export default function Form() {
  const LocalDB = useTodos();

  const [text, setText] = React.useState('');

  const createTodo = () => {
    LocalDB.addTodo(text);
    setText('');
  };

  return (
    <Forms.Container>
      <CustomInput
        onChangeText={setText}
        value={text}
        placeholder="O que você irá fazer hoje?"
      />
      <CustomButton onPress={createTodo}>Criar</CustomButton>
    </Forms.Container>
  );
}
