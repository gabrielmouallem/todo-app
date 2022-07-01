import { Value } from 'react-native-reanimated';
import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { ToDoItem } from '../../models/todo-item';

export interface UpdateFields {
  field: string;
  value: any;
}

const tableName = 'todoData';

enablePromise(true);

const getDBConnection = async () => {
  return openDatabase({ name: 'todo-data.db', location: 'default' });
};

const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(todo VARCHAR(255) NOT NULL, is_completed BOOLEAN NOT NULL DEFAULT false, locally_created BOOLEAN NOT NULL DEFAULT true, locally_deleted BOOLEAN NOT NULL DEFAULT false, locally_updated BOOLEAN NOT NULL DEFAULT false, group_id STRING DEFAULT NULL, group_name STRING DEFAULT NULL, group_color STRING DEFAULT NULL);`;

  await db.executeSql(query);
};

const getTodoItems = async (db: SQLiteDatabase): Promise<ToDoItem[]> => {
  try {
    const todoItems: ToDoItem[] = [];
    const results = await db.executeSql(`SELECT rowid as id, todo, is_completed, locally_created, locally_deleted, locally_updated, group_id, group_name, group_color FROM ${tableName}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index))
      }
    });
    return todoItems.map(item => ({...item, id: `${item.id}`}));
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
};

const saveTodoItems = async (db: SQLiteDatabase, todoItems: ToDoItem[]) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, todo, is_completed, locally_created, locally_deleted, locally_updated, group_id, group_name, group_color) values` +
    todoItems.map(i => `(${i.id}, '${i.todo}', ${i.is_completed}, ${i.locally_created}, ${i.locally_deleted}, ${i.locally_updated}, '${i.group_id}', '${i.group_name}', '${i.group_color}')`).join(',');
  return db.executeSql(insertQuery);
};

const deleteTodoItem = async (db: SQLiteDatabase, id: string) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

const updateTodoItem = async (db: SQLiteDatabase, id: string, data: UpdateFields[]) => {
  const clause = data.map(i => `${i.field} = ${i.value}`).join(', ');
  const query = `UPDATE ${tableName} SET ${clause} WHERE rowid = ${id}`;
  await db.executeSql(query);
};

const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;
  await db.executeSql(query);
};

export const LocalDBService = {
  getTodoItems,
  saveTodoItems,
  deleteTodoItem,
  updateTodoItem,
  getDBConnection,
  createTable,
  deleteTable
}