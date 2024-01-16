import { useCallback, useState } from "react";
import { Todo, TodoList, isSameTodo, makeTodo, selectId } from "./todo";
import { db } from "@/lib/db";
import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/lib/function";

export function useTodoModel(defaultTodoList: Todo[] | null = null) {
  const [todoList, setTodoList] = useState<TodoList>(
    O.fromNullable(defaultTodoList),
  );

  const addTodo = useCallback(
    async (title: string, id = crypto.randomUUID()) => {
      const todo = makeTodo(id, title);

      pipe(
        todoList,
        O.getOrElse(() => <Todo[]>[]),
        (val) => [...val, todo],
        O.some,
        setTodoList
      ),

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
      pipe(
        todoList,
        O.map((val) => val.filter((todo) => selectId(todo) !== id)),
        setTodoList,
      );

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
      O.map(
        (val) => val.map((curTodo) => (
          isSameTodo(curTodo, todo) ? todo : curTodo
        ))
      ),
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
