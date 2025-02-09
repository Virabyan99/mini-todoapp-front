"use client";


import type { NextPage } from 'next';
import TodoLayout from '../components/TodoLayout';
import { useEffect, useState } from 'react';
import TodoItem from '../components/TodoItem';
import { Loader2 } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Home: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch todos from the backend when the page loads
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:8787/api/todos");
        const data = await response.json();
        setTodos(data.todos);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleToggle = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <TodoLayout>
      <p className='my-5 text-center'>Welcome to your Todo App. Start by adding a todo item!</p>
      
      {/* Loading State */}
      {loading && <Loader2 className='animate-spin'/>}
      
      {/* Display todos */}
      <div>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No todos available.</p>
        )}
      </div>
    </TodoLayout>
  );
};

export default Home;
