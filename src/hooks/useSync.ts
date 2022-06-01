import { useCallback } from 'react';
import { useFirebase } from './useFirebase';
import { useTodos } from './useTodos';

export const useSync = () => {

    const {loadDataCallback, syncUpNewItem, syncUpDeletedItem} = useTodos();
    const {addDoc, deleteDoc} = useFirebase();
    
    const syncUpData = useCallback(async ()=> {
        let todos = await loadDataCallback();
        todos.filter(el => el.locally_deleted).forEach(el => {
            console.error({el});
            deleteDoc(el);
            syncUpDeletedItem(el.id);
        });
        todos = await loadDataCallback();
        todos.filter(el => el.locally_created || !el.locally_deleted).forEach(el => {
            addDoc(el);
            syncUpNewItem(el.id);
        });
    }, []);

    const syncDownData = useCallback(()=> {

    }, []);

    return {
        syncUpData,
        syncDownData,
    }
}