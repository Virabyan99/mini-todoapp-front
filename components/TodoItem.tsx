// components/TodoItem.tsx
import React from 'react';
import { Badge } from './ui/badge';

interface TodoItemProps {
  text: string; // Accept text prop
  completed?: boolean; // Accept completed prop, with a default value of false
}

const TodoItem: React.FC<TodoItemProps> = ({ text, completed = false }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0' }}>
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {text} {/* Display the text prop here */}
      </span>
      {completed && <Badge variant="secondary">Done</Badge>} {/* Display badge if completed */}
    </div>
  );
};

export default TodoItem;
