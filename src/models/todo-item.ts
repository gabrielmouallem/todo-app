export type ToDoItem = {
  id: string;
  todo: string;
  is_completed: number;
  locally_created: number;
  locally_deleted: number;
  locally_updated?: number;
  group_id?: string;
  group_color?: string;
  group_name?: string;
};
