import React from 'react';
import {FLBasics} from '../FlatListBasics.styles';
import trash from '../../../assets/trash.json';
import check from '../../../assets/check.json';
import {ToDoItem} from '../../../models/todo-item';
import AnimatedLottieView from 'lottie-react-native';
import {Button} from './FlatListItem.styles';

export default function FlatListItem({item}: {item: ToDoItem}) {
  const checkRef = React.useRef<AnimatedLottieView>(null);
  const trashRef = React.useRef<AnimatedLottieView>(null);

  const handleCheck = () => {
    item.is_completed = true;
    checkRef.current.play(84, 201);
  };
  const handleTrash = () => {
    item.locally_deleted = true;
    trashRef.current.play();
  };

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
      <Button.Container onPress={handleTrash}>
        <FLBasics.Checkbox
          source={trash}
          autoPlay={false}
          loop={false}
          resizeMode="contain"
          ref={trashRef}
        />
      </Button.Container>
    </FLBasics.Content>
  );
}
