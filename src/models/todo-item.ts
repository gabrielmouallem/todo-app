export type ToDoItem = {
  id: string;
  todo: string;
  is_completed: number;
  locally_created: number;
  locally_deleted: number;
  group_updated?: number;
  group?: {
    id: string;
    color: string;
    name: string;
  };
};
