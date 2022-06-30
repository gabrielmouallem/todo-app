import { useCallback, useState } from 'react';
import { ToDoItem } from '../models/todo-item';
import {
  getDocs as getFirestoreDocs,
  addDoc as addFirestoreDoc,
  deleteDoc as deleteFirestoreDoc,
} from '../services/firebase/firebase-service';

export const useFirebase = () => {
  const [docs, setDocs] = useState<ToDoItem[]>([]);

  const getDocs = useCallback(async (): Promise<ToDoItem[]> => {
    return new Promise((resolve, reject) => {
      getFirestoreDocs()
        .then((res) => {
          setDocs(res);
          resolve(res);
        })
        .catch((err) => {
          console.error({ err });
          reject([]);
        });
    });
  }, []);

  const addDoc = useCallback((_doc: ToDoItem) => {
    const doc = { ..._doc, locally_created: 0, locally_deleted: 0 };
    addFirestoreDoc(doc)
      .then(() => {
        console.log('Document added to firebase');
        setDocs([...docs]);
      })
      .catch((err) => console.error('Error adding doc to firebase: ', err));
  }, []);

  const deleteDoc = useCallback((_doc: ToDoItem) => {
    const doc = { ..._doc, locally_created: 0, locally_deleted: 0 };
    deleteFirestoreDoc(doc.id).then(() => {
      setDocs([...docs]);
    });
  }, []);

  return {
    docs,
    getDocs,
    deleteDoc,
    addDoc,
  };
};
