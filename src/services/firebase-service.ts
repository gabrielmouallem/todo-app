import firestore from '@react-native-firebase/firestore';
import { ToDoItem } from '../models/todo-item';

interface Data {
    data: any;
}

interface Error {
    err: any;
}

export async function getTodos(): Promise<Data | Error> {
  return new Promise((resolve, reject) =>
    firestore()
      .collection('Todos')
      .get()
      .then((querySnapshot) => {
        resolve({data: querySnapshot});
      }).catch(err => reject({err})),
  );
}

export default firestore;
