import React from 'react';
import {ToDoItem} from '../models/todo-item';
import {
  createTable,
  deleteTodoItem,
  getDBConnection,
  getTodoItems,
  saveTodoItems,
} from '../services/database/db-service';

interface IUseTodos {
  todos: ToDoItem[];
  loadDataCallback: Function;
  addTodo: Function;
  deleteItem: Function;
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
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addTodo = async (value: string) => {
    if (!newTodo.trim()) return;
    try {
      const newTodos = [
        ...todos,
        {
          id:
            todos.reduce((acc, cur) => {
              if (cur.id > acc.id) return cur;
              return acc;
            }).id + 1,
          value: value,
        },
      ];
      setTodos(newTodos);
      const db = await getDBConnection();
      await saveTodoItems(db, newTodos);
      setNewTodo(value);
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
    deleteItem,
  };
};
