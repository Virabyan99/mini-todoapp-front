"use client";

// pages/index.tsx
import type { NextPage } from 'next';
import TodoLayout from '../components/TodoLayout';
import { useEffect, useState } from 'react';
import TodoItem from '../components/TodoItem';

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
        console.log("Data from API:", data); // Add this line for debugging
        setTodos(data.todos); 
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return (
    <TodoLayout>
      <p>Welcome to your Todo App. Start by adding a todo item!</p>

      {/* Display loading state */}
      {loading && <p>Loading todos...</p>}

      {/* Display todos */}
      <div>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem key={todo.id} text={todo.text} completed={todo.completed} />
          ))
        ) : (
          <p>No todos available.</p>
        )}
      </div>
    </TodoLayout>
  );
};

export default Home;
