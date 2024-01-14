import { useCallback, useState } from "react";
import { Todo, isSameTodo, makeTodo, selectId } from "./todo";
import { db } from "@/lib/db";

export function useTodoModel() {
  const [todoList, setTodoList] = useState<Todo[] | null>(null);

  const addTodo = useCallback(
    async (title: string) => {
      const todo = makeTodo(crypto.randomUUID(), title);

      if (todoList) {
        setTodoList([...todoList, todo]);
      } else {
        setTodoList([todo]);
      }

      await db.addTodo(todo);
    },
    [todoList],
  );

  const clearTodoList = useCallback(async () => {
    setTodoList([]);
    await db.deleteAll();
  }, []);

  const deleteTodo = useCallback(
    async (id: string) => {
      if (todoList) {
        setTodoList(todoList.filter((todo) => selectId(todo) !== id));
      }
      await db.deleteTodo(id);
    },
    [todoList],
  );

  const getTodoList = useCallback(async () => {
    await db.init();

    await db.getTodoList().then((data) => {
      setTodoList(data ?? []);
    });
  }, []);

  const updateTodo = useCallback(
    async (todo: Todo) => {
      if (todoList) {
        setTodoList(todoList.map((t) => (isSameTodo(t, todo) ? todo : t)));
      }

      await db.updateTodo(todo);
    },
    [todoList],
  );

  return {
    data: todoList,
    addTodo,
    deleteTodo,
    getTodoList,
    updateTodo,
    clearTodoList,
  };
}
