import React, {useRef} from 'react';
import {FlatList} from 'react-native';
import {ToDoItem} from '../../models/todo-item';
import {FLBasics} from './FlatListBasics.styles';
import check from '../../assets/check.json';
import AnimatedLottieView from 'lottie-react-native';
import FlatListItem from './components/FlatListItem';
interface FlatListBasicsProps {
  todos: ToDoItem[];
}

const FlatListBasics = ({todos}: FlatListBasicsProps) => {

  return (
    <FLBasics.Container>
      <FlatList
        data={todos}
        renderItem={({item}) => <FlatListItem item={item} />}
      />
    </FLBasics.Container>
  );
};

export default React.memo(FlatListBasics);
