import React, {useState} from 'react';
import {ToDoItem} from '../../../../models/todo-item';
import CustomButton from '../../../CustomButton/CustomButton';
import {Group} from './GroupForm.styles';
import CancelButton from '../../../CancelButton/CancelButton';

export default function GroupForm({todo}: {todo: ToDoItem}) {
  const [currentForm, setCurrentForm] = useState<
    'select_group' | 'create_group'
  >('select_group');

  const handleNewGroupForm = () => {
    setCurrentForm('create_group');
  }

  const handleCancelButton =  () => {
    setCurrentForm('select_group');
  }

  if (currentForm === 'select_group')
    return (
      <Group.Container>
        <Group.Text>Grupo: </Group.Text>
        <Group.Text>{todo.group_id}</Group.Text>
        <Group.Text>{todo.group_name}</Group.Text>
        <Group.Text>{todo.group_color}</Group.Text>
        <CustomButton onPress={handleNewGroupForm}>Criar novo Grupo</CustomButton>
      </Group.Container>
    );

  return (
    <Group.Container>
      <Group.Text>Criar novo Grupo: </Group.Text>
      <CancelButton onPress={handleCancelButton}>Cancelar</CancelButton>
      <CustomButton>Criar novo Grupo</CustomButton>
    </Group.Container>
  );
}
