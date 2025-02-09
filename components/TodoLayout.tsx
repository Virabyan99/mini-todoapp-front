// components/TodoLayout.tsx (modified header section)

import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";


const TodoLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <Card>
        <CardHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Todo App</h1>
          <Button variant="outline">Menu</Button>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <small>Built with Next.js, shadcnui & Hono.js</small>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TodoLayout;
