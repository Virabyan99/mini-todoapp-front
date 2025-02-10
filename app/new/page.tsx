"use client";

// pages/new.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';


const NewTodo = () => {
  const [todoText, setTodoText] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoText) {
      alert('Please enter a Todo text!');
      return;
    }

    try {
      // Create the Todo item on the backend (POST request)
      const response = await fetch('https://mini-todoapp-back.gmparstone99.workers.dev/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: todoText,
          completed: isCompleted,
        }),
      });

      if (response.ok) {
        // Redirect to the home page after successful submission
        router.push('/');
      } else {
        alert('Failed to create todo');
      }
    } catch (error) {
      console.error('Error creating todo:', error);
      alert('Failed to create todo');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="bg-white shadow-lg rounded-lg p-5">
        <CardHeader>
          <h1 className="text-3xl font-semibold text-gray-800">Create Todo</h1>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg" htmlFor="todoText">
                Todo Text
              </label>
              <input
                type="text"
                id="todoText"
                name="todoText"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                placeholder="Enter todo description"
              />
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="completed"
                name="completed"
                checked={isCompleted}
                onChange={() => setIsCompleted(!isCompleted)}
                className="mr-2"
              />
              <label htmlFor="completed" className="text-gray-700 text-lg">
                Mark as Completed
              </label>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                className="w-1/3 text-gray-600 border-gray-400 hover:bg-gray-200"
                onClick={() => router.push('/')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                className="w-1/3 bg-blue-600 text-white hover:bg-blue-700"
              >
                Create Todo
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter>
          <small className="text-gray-600">Built with Next.js, shadcnui & Hono.js</small>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewTodo;
