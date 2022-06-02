import React from 'react';
import {ToDoItem} from '../models/todo-item';
import {
  LocalDBService, UpdateFields,
} from '../services/database/db-service';

interface IUseTodos {
  todos: ToDoItem[];
  loadDataCallback: () => Promise<ToDoItem[]>;
  addTodo: (todo: string) => void;
  syncDown: (todo: ToDoItem[]) => void;
  updateItem: (id: string, data: UpdateFields[]) => void;
  deleteItem: (id: string) => void;
}

const TodosContext = React.createContext<IUseTodos>({
  todos: [],
  loadDataCallback: null,
  addTodo: null,
  updateItem: null,
  deleteItem: null,
  syncDown: null,
});

export const useTodosManager = (): IUseTodos => {
  const [todos, setTodos] = React.useState<ToDoItem[]>([]);

  const loadDataCallback = React.useCallback(async (): Promise<ToDoItem[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await LocalDBService.getDBConnection();
        await LocalDBService.createTable(db);
        const storedTodoItems = await LocalDBService.getTodoItems(db);
        if (storedTodoItems.length) {
          setTodos(storedTodoItems);
          resolve(storedTodoItems);
        }
        resolve([]);
      } catch (error) {
        reject([]);
        console.error("loadDataCallback ", {error});
      }
    })
  }, []);

  const addTodo = async (todo: string) => {
    try {
      const item = {
        id: new Date().valueOf().toString(), // Unix Timestamp as ID
        todo: todo,
        is_completed: 0,
        locally_created: 1,
        locally_deleted: 0,
      };
      const newTodos: ToDoItem[] = [
        ...todos,
        item
      ];
      setTodos(newTodos);
      const db = await LocalDBService.getDBConnection();
      await LocalDBService.saveTodoItems(db, [item]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateItem = async (id: string, data: UpdateFields[]) => {
    try {
      const db = await LocalDBService.getDBConnection();
      await LocalDBService.updateTodoItem(db, id, data);
      setTodos(todos => ([...todos.map(el => el.id === id ? {...el, locally_created: 0} : el)]));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const db = await LocalDBService.getDBConnection();
      await LocalDBService.deleteTodoItem(db, id);
      setTodos(todos => ([...todos.filter(el => el.id !== id)]));
    } catch (error) {
      console.error(error);
    }
  };

  const syncDown = async (newTodos: ToDoItem[]) => {
    try {
      if (!newTodos.length) return;
      setTodos(prevState => [...prevState, ...newTodos]);
      const db = await LocalDBService.getDBConnection();
      await LocalDBService.saveTodoItems(db, newTodos);
    } catch (error) {
      console.error("syncDown ", {error});
    }
  };

  return {
    todos: todos.filter(el => !el.locally_deleted),
    loadDataCallback,
    syncDown,
    updateItem,
    addTodo,
    deleteItem,
  };
};

function useTodos(): IUseTodos {
  const context = React.useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodosContextProvider');
  }
  return context;
}

const TodosContextProvider = ({ children }) => {
  return (
    <TodosContext.Provider value={useTodosManager()}>
      {children}
    </TodosContext.Provider>
  );
};

export { TodosContextProvider, useTodos };


