import React from 'react';
import {Todos} from '../Todos.styles';
import trash from '../../../assets/trash.json';
import check from '../../../assets/check.json';
import {ToDoItem} from '../../../models/todo-item';
import AnimatedLottieView from 'lottie-react-native';
import {Button} from './Todotem.styles';
import {useTodos} from '../../../hooks/useTodos';
import CustomModal, {ModalRef} from '../../CustomModal/CustomModal';
import {GestureResponderEvent} from 'react-native';
import GroupForm from './components/GroupForm';

export default function FlatListItem({item}: {item: ToDoItem}) {
  const LocalDB = useTodos();

  const [ifCheck, setCheck] = React.useState(!!item.is_completed);
  const modalRef = React.useRef<ModalRef>(null);
  const checkRef = React.useRef<AnimatedLottieView>(null);
  const trashRef = React.useRef<AnimatedLottieView>(null);

  React.useEffect(() => {
    if (ifCheck == true) {
      checkRef.current?.play();
      LocalDB.updateItem(item.id, [{field: 'is_completed', value: 1}]);
    } else {
      checkRef.current?.play(160, 0);
      LocalDB.updateItem(item.id, [{field: 'is_completed', value: 0}]);
    }
  }, [ifCheck]);

  const handleCheck = (e: GestureResponderEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCheck(!ifCheck);
    setTimeout(() => {
      if (item.locally_created) {
        LocalDB.updateItem(item.id, [
          {field: 'is_completed', value: !ifCheck ? 1 : 0},
        ]);
      } else {
        LocalDB.updateItem(item.id, [
          {field: 'is_completed', value: !ifCheck ? 1 : 0},
          {field: 'locally_updated', value: 1},
        ]);
      }
      LocalDB.loadDataCallback();
    }, 1200);
  };
  const handleTrash = (e: GestureResponderEvent) => {
    e.preventDefault();
    e.stopPropagation();
    trashRef.current?.play();
    setTimeout(() => {
      LocalDB.updateItem(item.id, [{field: 'locally_deleted', value: 1}]);
      LocalDB.loadDataCallback();
    }, 1200);
  };

  const onPress = () => {
    modalRef.current?.open();
  };

  return (
    <>
      <CustomModal title={item.todo} ref={modalRef}>
        <GroupForm todo={item} />
      </CustomModal>
      <Todos.Content onPress={onPress}>
        <Todos.Item>{item.todo}</Todos.Item>
        <Button.Container onPress={handleCheck}>
          <Todos.Checkbox
            source={check}
            autoPlay={false}
            loop={false}
            resizeMode="contain"
            ref={checkRef}
          />
        </Button.Container>
        <Button.Container onPress={handleTrash}>
          <Todos.Checkbox
            source={trash}
            autoPlay={false}
            loop={false}
            resizeMode="contain"
            ref={trashRef}
          />
        </Button.Container>
      </Todos.Content>
    </>
  );
}
