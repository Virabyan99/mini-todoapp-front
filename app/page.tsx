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
        const response = await fetch("https://mini-todoapp-back.gmparstone99.workers.dev/api/todos");
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

  const handleToggle = async (id: number) => {
    // Toggle the todo item locally first
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Deletes a todo item by ID.
 * 
 * @param id - The ID of the todo item to be deleted.
 * Filters the current list of todos, removing the one that matches the provided ID.
 */

/******  174bbd5a-0bbf-4236-b57f-10d110873385  *******/    // Send the updated status to the backend
    const updatedTodo = updatedTodos.find(todo => todo.id === id);
    if (updatedTodo) {
      try {
        await fetch(`https://mini-todoapp-back.gmparstone99.workers.dev/api/todos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed: updatedTodo.completed }),
        });
      } catch (error) {
        console.error("Error updating todo:", error);
        // Optionally revert UI changes in case of an error
      }
    }
  };

  const handleDelete = async (id: number) => {
    // Remove the todo locally first
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);

    // Send the delete request to the backend
    try {
      await fetch(`https://mini-todoapp-back.gmparstone99.workers.dev/api/todos/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
      // Optionally revert UI changes in case of an error
    }
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
