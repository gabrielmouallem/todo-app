import React from 'react';
import {ToDoItem} from '../models/todo-item';
import {
  checkTodoItem,
  createTable,
  deleteTodoItem,
  getDBConnection,
  getTodoItems,
  saveTodoItems,
  syncUpNewTodoItem,
  uncheckTodoItem,
} from '../services/database/db-service';

const TODOS = [
  {
    id: 0,
    todo: "go to shop",
    locally_created: 1,
    locally_deleted: 1,
    is_completed: 0,
  },
  {
    id: 1,
    todo: "eat at least a one healthy foods",
    locally_created: 1,
    locally_deleted: 0,
    is_completed: 0,
  },
  {
    id: 2,
    todo: "Do some exercises",
    locally_created: 1,
    locally_deleted: 0,
    is_completed: 0,
  },
];

interface IUseTodos {
  todos: ToDoItem[];
  loadDataCallback: () => Promise<ToDoItem[]>;
  addTodo: (todo: string) => void;
  syncUpNewItem: (id: number) => void;
  syncUpDeletedItem: (id: number) => void;
  deleteItem: Function;
  checkItem: Function;
  uncheckItem: Function;
}

export const useTodos = (): IUseTodos => {
  const [todos, setTodos] = React.useState<ToDoItem[]>([]);
  const [newTodo, setNewTodo] = React.useState('');

  const loadDataCallback = React.useCallback(async (): Promise<ToDoItem[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await getDBConnection();
        await createTable(db);
        const storedTodoItems = await getTodoItems(db);
        if (storedTodoItems.length) {
          setTodos(storedTodoItems);
          resolve(storedTodoItems);
        } else {
          await saveTodoItems(db, TODOS);
          setTodos(TODOS);
          resolve(TODOS);
        }
      } catch (error) {
        reject([]);
        console.error(error);
      }
    })
  }, []);

  const addTodo = async (todo: string) => {
    if (!newTodo.trim()) return;
    try {
      const newTodos: ToDoItem[] = [
        ...todos,
        {
          id:
            todos.reduce((acc, cur) => {
              if (cur.id > acc.id) return cur;
              return acc;
            }).id + 1,
          todo: todo,
          is_completed: 0,
          locally_created: 1,
          locally_deleted: 0,
        },
      ];
      setTodos(newTodos);
      const db = await getDBConnection();
      await saveTodoItems(db, newTodos);
      setNewTodo(todo);
    } catch (error) {
      console.error(error);
    }
  };

  const syncUpNewItem = async (id: number) => {
    try {
      const db = await getDBConnection();
      await syncUpNewTodoItem(db, id);
      setTodos(todos => ([...todos.map(el => el.id === id ? {...el, locally_created: 0} : el)]));
    } catch (error) {
      console.error(error);
    }
  };

  const syncUpDeletedItem = async (id: number) => {
    try {
      const db = await getDBConnection();
      await deleteTodoItem(db, id);
      setTodos(todos => ([...todos.filter(el => el.id !== id)]));
    } catch (error) {
      console.error(error);
    }
  };

  const checkItem = async (id: number) => {
    try {
      const db = await getDBConnection();
      await checkTodoItem(db, id);
      setTodos(todos => ([...todos.map(el => el.id === id ? {...el, is_completed: 1} : el)]));
    } catch (error) {
      console.error(error);
    }
  };

  const uncheckItem = async (id: number) => {
    try {
      const db = await getDBConnection();
      await uncheckTodoItem(db, id);
      setTodos(todos => ([...todos.map(el => el.id === id ? {...el, is_completed: 0} : el)]));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      const db = await getDBConnection();
      await deleteTodoItem(db, id);
      setTodos(todos => ([...todos.filter(el => el.id === id)]));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    todos: todos.filter(el => !el.locally_deleted),
    loadDataCallback,
    syncUpNewItem,
    syncUpDeletedItem,
    addTodo,
    checkItem,
    uncheckItem,
    deleteItem,
  };
};
