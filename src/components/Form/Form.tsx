import React from 'react';
import {Forms} from './Form.styles';

export default function Form() {
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
