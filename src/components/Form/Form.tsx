import React from 'react';
import { Forms } from './Form.styles';
import { useTodos } from '../../hooks/useTodos';

export default function Form() {
  const LocalDB = useTodos();

  const [text, settext] = React.useState('');

  const createTodo = () => {
    LocalDB.addTodo(text);
    settext('');
  };

  return (
    <Forms.Container>
      <Forms.Field
        onChangeText={settext}
        value={text}
        placeholder="O que você irá fazer hoje?"
      />
      <Forms.Button onPress={createTodo}>
        <Forms.ButtonText>Criar</Forms.ButtonText>
      </Forms.Button>
    </Forms.Container>
  );
}
