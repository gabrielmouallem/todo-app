import React from 'react';
import {ToDoItem} from '../models/todo-item';
import {
  checkTodoItem,
  createTable,
  deleteTodoItem,
  getDBConnection,
  getTodoItems,
  saveTodoItems,
  uncheckTodoItem,
} from '../services/database/db-service';

const TODOS = [
  {
    id: 0,
    todo: "go to shop",
    locally_created: false,
    locally_deleted: false,
    is_completed: false,
  },
  {
    id: 1,
    todo: "eat at least a one healthy foods",
    locally_created: false,
    locally_deleted: false,
    is_completed: false,
  },
  {
    id: 2,
    todo: "Do some exercises",
    locally_created: false,
    locally_deleted: false,
    is_completed: false,
  },
];

interface IUseTodos {
  todos: ToDoItem[];
  loadDataCallback: Function;
  addTodo: Function;
  deleteItem: Function;
  checkItem: Function;
  uncheckItem: Function;
}

export const useTodos = (): IUseTodos => {
  const [todos, setTodos] = React.useState<ToDoItem[]>([]);
  const [newTodo, setNewTodo] = React.useState('');

  const loadDataCallback = React.useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const storedTodoItems = await getTodoItems(db);
      if (storedTodoItems.length) {
        setTodos(storedTodoItems);
      } else {
        await saveTodoItems(db, TODOS);
        setTodos(TODOS);
      }
    } catch (error) {
      console.error(error);
    }
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
          is_completed: false,
          locally_created: true,
          locally_deleted: false,
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

  const checkItem = async (id: number) => {
    try {
      const db = await getDBConnection();
      await checkTodoItem(db, id);
      todos.splice(id, 1);
      setTodos(todos.slice(0));
    } catch (error) {
      console.error(error);
    }
  };

  const uncheckItem = async (id: number) => {
    try {
      const db = await getDBConnection();
      await uncheckTodoItem(db, id);
      todos.splice(id, 1);
      setTodos(todos.slice(0));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      const db = await getDBConnection();
      await deleteTodoItem(db, id);
      todos.splice(id, 1);
      setTodos(todos.slice(0));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    todos,
    loadDataCallback,
    addTodo,
    checkItem,
    uncheckItem,
    deleteItem,
  };
};
