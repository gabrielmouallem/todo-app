// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
import * as firestore from 'firebase/firestore';
import {firebaseConfig} from './config';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = firestore.getFirestore(app);

const collection = (collectionName: string) =>
  firestore.collection(db, collectionName);

const getDocs = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    firestore
      .getDocs(collection('Todos'))
      .then(res => {
        const response = [];
        res.forEach(data => response.push(data.data()));
        resolve(response);
      })
      .catch(err => reject(err));
  });
};

const addDoc = data => {
  return new Promise((resolve, reject) => {
    firestore
      .addDoc(collection('Todos'), data)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export {collection, getDocs, addDoc};
