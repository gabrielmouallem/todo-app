import React, {useEffect} from 'react';
import {FLBasics} from '../FlatListBasics.styles';
import del from '../../../assets/delete.json';
import check from '../../../assets/check.json';
import {ToDoItem} from '../../../models/todo-item';
import AnimatedLottieView from 'lottie-react-native';
import { Button } from './FlatListItem.styles';

export default function FlatListItem({item}: {item: ToDoItem}) {
  const checkRef = React.useRef<AnimatedLottieView>(null);
  const deleteRef = React.useRef<AnimatedLottieView>(null);

  const handleCheck = () => checkRef.current.play();
  const handleDelete = () => deleteRef.current.play();

  return (
    <FLBasics.Content>
      <FLBasics.Item>{item.todo}</FLBasics.Item>
      <Button.Container onPress={handleCheck}>
        <FLBasics.Checkbox
          source={check}
          autoPlay={false}
          loop={false}
          resizeMode="contain"
          ref={checkRef}
        />
      </Button.Container>
      <Button.Container onPress={handleDelete}>
        <FLBasics.Checkbox
          source={del}
          autoPlay={false}
          loop={false}
          resizeMode="contain"
          ref={deleteRef}
        />
      </Button.Container>
    </FLBasics.Content>
  );
}
