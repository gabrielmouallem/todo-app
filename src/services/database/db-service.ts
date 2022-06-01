import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { ToDoItem } from '../../models/todo-item';

const tableName = 'todoData';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'todo-data.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(todo VARCHAR(255) NOT NULL, is_completed BOOLEAN NOT NULL DEFAULT false, locally_created BOOLEAN NOT NULL DEFAULT true, locally_deleted BOOLEAN NOT NULL DEFAULT false);`;

  await db.executeSql(query);
};

export const getTodoItems = async (db: SQLiteDatabase): Promise<ToDoItem[]> => {
  try {
    const todoItems: ToDoItem[] = [];
    const results = await db.executeSql(`SELECT rowid as id, todo, is_completed, locally_created, locally_deleted FROM ${tableName}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index))
      }
    });
    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
};

export const saveTodoItems = async (db: SQLiteDatabase, todoItems: ToDoItem[]) => {
  console.log("------------> ", todoItems.map(i => `(${i.id}, '${i.todo}', ${i.is_completed}, ${i.locally_created}, ${i.locally_deleted})`))
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, todo, is_completed, locally_created, locally_deleted) values` +
    todoItems.map(i => `(${i.id}, '${i.todo}', ${i.is_completed}, ${i.locally_created}, ${i.locally_deleted})`).join(',');

  return db.executeSql(insertQuery);
};

export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const syncUpNewTodoItem = async (db: SQLiteDatabase, id: number) => {
  const query = `UPDATE ${tableName} SET locally_created = 0 WHERE rowid = ${id}`;
  await db.executeSql(query);
};

export const checkTodoItem = async (db: SQLiteDatabase, id: number) => {
  const query = `UPDATE ${tableName} SET is_completed = 1 WHERE rowid = ${id}`;
  await db.executeSql(query);
};

export const uncheckTodoItem = async (db: SQLiteDatabase, id: number) => {
  const query = `UPDATE ${tableName} SET is_completed = 0 WHERE rowid = ${id}`;
  await db.executeSql(query);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};