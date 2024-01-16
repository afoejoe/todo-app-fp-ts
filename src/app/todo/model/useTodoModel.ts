import { useCallback, useState } from "react";
import { Todo, TodoList, isSameTodo, makeTodo, selectId } from "./todo";
import { db } from "@/lib/db";
import * as O from "fp-ts/Option";

export function useTodoModel(defaultTodoList: Todo[] | null = null) {
  const [todoList, setTodoList] = useState<TodoList>(
    O.fromNullable(defaultTodoList),
  );

  const addTodo = useCallback(
    async (title: string, id = crypto.randomUUID()) => {
      const todo = makeTodo(id, title);

      if (O.isSome(todoList)) {
        setTodoList(O.some([...todoList.value, todo]));
      } else {
        setTodoList(O.some([todo]));
      }

      await db.addTodo(todo);
    },
    [todoList],
  );

  const clearTodoList = useCallback(async () => {
    setTodoList(O.some([]));
    await db.deleteAll();
  }, []);

  const deleteTodo = useCallback(
    async (id: string) => {
      if (O.isSome(todoList)) {
        setTodoList(
          O.map((val) => val.filter((todo) => selectId(todo) !== id)),
        );
      }
      await db.deleteTodo(id);
    },
    [todoList],
  );

  const getTodoList = useCallback(async () => {
    await db.init();

    await db.getTodoList().then((data) => {
      setTodoList(O.some(data));
    });
  }, []);

  const updateTodo = useCallback(async (todo: Todo) => {
    setTodoList(
      O.map((val) => val.map((t) => (isSameTodo(t, todo) ? todo : t))),
    );

    await db.updateTodo(todo);
  }, []);

  return {
    data: todoList,
    addTodo,
    deleteTodo,
    getTodoList,
    updateTodo,
    clearTodoList,
  };
}
