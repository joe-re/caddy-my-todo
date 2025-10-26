export class CreateTodoDto {
  title: string;
  completed?: boolean;
}

export class UpdateTodoDto {
  title?: string;
  completed?: boolean;
}

export class TodoDto {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}