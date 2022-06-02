import React, {useCallback} from 'react';
import {useFirebase} from './useFirebase';
import {useTodos} from './useTodos';
import {useNetInfo} from '@react-native-community/netinfo';

export const useSync = () => {
  const LocalDB = useTodos();
  const Firestore = useFirebase();
  const {isConnected} = useNetInfo();

  React.useEffect(() => {
    if (isConnected) {
      syncUpData();
      syncDownData();
    }
  }, [isConnected]);

  const syncUpData = useCallback(async () => {
    let todos = await LocalDB.loadDataCallback();
    todos.forEach(el => {
      if (el.locally_deleted) {
        Firestore.deleteDoc(el);
        LocalDB.deleteItem(el.id);
      } else if (el.locally_created) {
        Firestore.addDoc(el);
        LocalDB.updateItem(el.id, [
          {field: 'locally_created', value: 0},
          {field: 'is_completed', value: el.is_completed},
        ]);
      }
    });
  }, []);

  const syncDownData = useCallback(async () => {
    const firestoreTodos = await Firestore.getDocs();
    const localTodos = await LocalDB.loadDataCallback();
    let syncData = [];
    firestoreTodos.forEach(i => {
      if (!localTodos.find(j => j.id === i.id)) syncData.push(i);
    });
    if (syncData.length) LocalDB.syncDown(syncData);
  }, []);

  return {
    syncUpData,
    syncDownData,
  };
};
