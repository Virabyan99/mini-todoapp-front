// components/TodoLayout.tsx
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";

const TodoLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="bg-white shadow-lg rounded-lg p-5">
        <CardHeader className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold text-gray-800">Todo App</h1>
          
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        <CardFooter className="mt-4">
          <small className="text-gray-600">Built with Next.js, shadcnui & Hono.js</small>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TodoLayout;
