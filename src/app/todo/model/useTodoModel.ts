import { useCallback, useState } from "react";
import { Todo, isSameTodo, makeTodo, selectId } from "./todo";

export function useTodoModel() {
  const [todoList, setTodoList] = useState<Todo[] | null>(null);

  const addTodo = useCallback(
    (title: string) => {
      if (todoList) {
        setTodoList([...todoList, makeTodo(crypto.randomUUID(), title)]);
      } else {
        setTodoList([makeTodo("1", title)]);
      }
      // TODO: persist to db
    },
    [todoList],
  );

  const clearTodoList = useCallback(() => {
    setTodoList([]);
  }, []);

  const deleteTodo = useCallback(
    (id: string) => {
      if (todoList) {
        setTodoList(todoList.filter((todo) => selectId(todo) !== id));
      }
    },
    [todoList],
  );

  const getTodoList = useCallback(() => {
    setTodoList([makeTodo("1", "Todo 1"), makeTodo("2", "Todo 2")]);
  }, []);

  const updateTodo = useCallback(
    (todo: Todo) => {
      if (todoList) {
        setTodoList(todoList.map((t) => (isSameTodo(t, todo) ? todo : t)));
      }
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
