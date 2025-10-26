import { Todo, CreateTodoDto, UpdateTodoDto } from '@/types/todo';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://api.my-todo.localhost:3001';

export const todoApi = {
  async getAll(): Promise<Todo[]> {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
  },

  async create(data: CreateTodoDto): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to create todo');
    return response.json();
  },

  async update(id: string, data: UpdateTodoDto): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to update todo');
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to delete todo');
  },
};