import * as Todo from "@/components/todo";
import { useTodoViewController } from "./useTodoViewController";

export default function TodoView() {
  const {
    footerText,
    data,
    filter,
    handleAddTodo,
    handleFilterChange,
    handleDeleteTodo,
    handleToggleTodo,
    handleClearCompleted,
  } = useTodoViewController();

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Todo App</h1>
      {data === null ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
          <Todo.Header
            filter={filter}
            onAddTodo={handleAddTodo}
            onFilterChange={handleFilterChange}
          />

          <Todo.Body
            items={data}
            onDelete={handleDeleteTodo}
            onToggle={handleToggleTodo}
          />

          <Todo.Footer
            footerText={footerText}
            onClearCompleted={handleClearCompleted}
          />
        </div>
      )}
    </>
  );
}
