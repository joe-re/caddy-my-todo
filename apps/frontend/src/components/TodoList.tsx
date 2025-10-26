'use client';

import { useState, useEffect } from 'react';
import { Todo, CreateTodoDto } from '@/types/todo';
import { todoApi } from '@/app/api';
import styles from './TodoList.module.css';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await todoApi.getAll();
      setTodos(data);
    } catch (err) {
      setError('TODOの読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    try {
      const newTodo = await todoApi.create({ title: newTodoTitle });
      setTodos([newTodo, ...todos]);
      setNewTodoTitle('');
    } catch (err) {
      setError('TODOの作成に失敗しました');
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    try {
      const updatedTodo = await todoApi.update(todo.id, { 
        completed: !todo.completed 
      });
      setTodos(todos.map(t => t.id === todo.id ? updatedTodo : t));
    } catch (err) {
      setError('TODOの更新に失敗しました');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await todoApi.delete(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      setError('TODOの削除に失敗しました');
    }
  };

  if (loading && todos.length === 0) {
    return <div className={styles.loading}>読み込み中...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TODO リスト</h1>
      
      {error && (
        <div className={styles.error} onClick={() => setError(null)}>
          {error}
        </div>
      )}

      <form className={styles.form} onSubmit={handleCreateTodo}>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="新しいTODOを入力..."
          className={styles.input}
        />
        <button type="submit" className={styles.addButton}>
          追加
        </button>
      </form>

      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <li key={todo.id} className={styles.todoItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo)}
              className={styles.checkbox}
            />
            <span 
              className={`${styles.todoText} ${todo.completed ? styles.completed : ''}`}
            >
              {todo.title}
            </span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className={styles.deleteButton}
            >
              削除
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className={styles.emptyState}>TODOがありません</p>
      )}
    </div>
  );
}