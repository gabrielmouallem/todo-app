import React from 'react';
import {FLBasics} from '../FlatListBasics.styles';
import trash from '../../../assets/trash.json';
import check from '../../../assets/check.json';
import {ToDoItem} from '../../../models/todo-item';
import AnimatedLottieView from 'lottie-react-native';
import {Button} from './FlatListItem.styles';
import { useTodos } from '../../../hooks/useTodos';

export default function FlatListItem({item}: {item: ToDoItem}) {
  const LocalDB = useTodos();

  const [ifCheck, setCheck] = React.useState(!!item.is_completed);
  const [ifDelete, setDelete] = React.useState(false);
  const checkRef = React.useRef<AnimatedLottieView>(null);
  const trashRef = React.useRef<AnimatedLottieView>(null);

  React.useEffect(() => {
    if(ifCheck == true) {
      checkRef.current.play();
      LocalDB.updateItem(item.id, [{field: 'is_completed', value: 1}]);
    } else {
      checkRef.current.play(160, 0);
      LocalDB.updateItem(item.id, [{field: 'is_completed', value: 0}]);
    }
  }, [ifCheck]);

  React.useEffect(() => {
    if (ifDelete == true) {
      trashRef.current.play();
      LocalDB.updateItem(item.id, [{field: 'locally_deleted', value: 1}]);
      LocalDB.loadDataCallback();
    }
  }, [ifDelete])

  const handleCheck = () => {
    setCheck(!ifCheck);
  };
  const handleTrash = () => {
    setDelete(true);
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
