// components/TodoItem.tsx
import React from 'react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Check } from 'lucide-react';

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onToggle, onDelete }) => {
  return (
    <Card className="shadow-lg p-4 mb-4 rounded-lg hover:shadow-2xl transition">
      <CardContent className="flex justify-between items-center">
        <div>
          <span
            className={`text-lg ${completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
            style={{ marginRight: '10px' }}
          >
            {text}
          </span>
          {completed && <Badge variant="secondary">Done ✅</Badge>}
        </div>
        <div className="flex gap-2">
          <Button onClick={() => onToggle(id)} variant="outline" className="px-3 py-1">Toggle</Button>
          <Button onClick={() => onDelete(id)} variant="destructive" className="px-3 py-1">Delete</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
