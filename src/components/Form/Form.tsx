import React from 'react';
import {Text} from 'react-native';
import {ToDoItem} from '../../models/todo-item';
import {Forms} from './Form.styles';

export default function Form({item}: {item: ToDoItem}) {
  const [text, settext] = React.useState('');
  const ok = React.useState('');


  return (
    <Forms.Container>
      <Forms.Field
        onChangeText={settext}
        value={text}
        placeholder="O que você irá fazer hoje?"></Forms.Field>
      <Forms.Button>
          <Forms.ButtonText>Criar</Forms.ButtonText>
      </Forms.Button>
    </Forms.Container>
  );
}
