import React from 'react';
import {FlatList} from 'react-native';
import {FLBasics} from './FlatListBasics.styles';
import FlatListItem from './components/FlatListItem';
import { useTodos } from '../../hooks/useTodos';
import { useSync } from '../../hooks/useSync';
import { useNetInfo } from '@react-native-community/netinfo';

const FlatListBasics = () => {

  const {todos, loadDataCallback} = useTodos();
  const {syncUpData, syncDownData} = useSync();
  const { isConnected } = useNetInfo();

  React.useEffect(()=> {
    loadDataCallback();
  }, []);

  React.useEffect(()=> {
    if (isConnected) {
      syncDownData();
      syncUpData();
    }
  }, [isConnected]);

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
