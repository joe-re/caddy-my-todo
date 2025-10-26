export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoDto {
  title: string;
  completed?: boolean;
}

export interface UpdateTodoDto {
  title?: string;
  completed?: boolean;
}