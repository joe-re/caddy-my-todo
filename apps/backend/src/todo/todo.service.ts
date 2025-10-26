import { Injectable } from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto, TodoDto } from './todo.dto';

@Injectable()
export class TodoService {
  private todos: Map<string, TodoDto> = new Map();
  private nextId = 1;

  findAll(): TodoDto[] {
    return Array.from(this.todos.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  findOne(id: string): TodoDto {
    const todo = this.todos.get(id);
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    return todo;
  }

  create(createTodoDto: CreateTodoDto): TodoDto {
    const id = String(this.nextId++);
    const now = new Date();
    const todo: TodoDto = {
      id,
      title: createTodoDto.title,
      completed: createTodoDto.completed ?? false,
      createdAt: now,
      updatedAt: now,
    };
    this.todos.set(id, todo);
    return todo;
  }

  update(id: string, updateTodoDto: UpdateTodoDto): TodoDto {
    const todo = this.findOne(id);
    if (updateTodoDto.title !== undefined) {
      todo.title = updateTodoDto.title;
    }
    if (updateTodoDto.completed !== undefined) {
      todo.completed = updateTodoDto.completed;
    }
    todo.updatedAt = new Date();
    this.todos.set(id, todo);
    return todo;
  }

  remove(id: string): void {
    if (!this.todos.has(id)) {
      throw new Error(`Todo with id ${id} not found`);
    }
    this.todos.delete(id);
  }
}