import { EFilter } from "@/types/enums";
import { useTodoModel } from "../model";
import { FormEvent, useCallback, useMemo } from "react";
import {
  Todo,
  makeTodo,
  selectCompleted,
  selectId,
  selectTitle,
} from "../model/todo";

type UseTodoViewProps = {
  filter: EFilter;
};

export function useTodoViewModel({ filter }: UseTodoViewProps) {
  const { data, deleteTodo, addTodo, getTodoList, clearTodoList, updateTodo } =
    useTodoModel();

  const handleDeleteTodo = useCallback(
    (id: string) => {
      return () => {
        deleteTodo(id);
      };
    },
    [deleteTodo],
  );

  const handleToggleTodo = useCallback(
    (todo: Todo) => {
      return () => {
        updateTodo(
          makeTodo(selectId(todo), selectTitle(todo), !selectCompleted(todo)),
        );
      };
    },
    [updateTodo],
  );

  const handleAddTodo = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const newTodoTitle = event.currentTarget.newTodoTitle.value;
      if (!newTodoTitle) {
        return;
      }

      event.currentTarget.reset();
      await addTodo(newTodoTitle);
    },
    [addTodo],
  );

  const handleClearCompleted = useCallback(async () => {
    await clearTodoList();
  }, [clearTodoList]);

  const filteredData = useMemo(() => {
    if (!data) {
      return null;
    }

    return data.filter(({ completed }) => {
      return (
        filter === EFilter.ALL ||
        (filter === EFilter.COMPLETED && completed) ||
        (filter === EFilter.INCOMPLETE && !completed)
      );
    });
  }, [data, filter]);

  const footerText =
    !data || data.length === 0
      ? "You haven't added any items"
      : `You have <span className="font-medium">${data.filter(({ completed }) => !completed).length}</span> pending tasks, out of <span className="font-medium"> ${data.length}</span> tasks.`;

  return {
    footerText,
    data: filteredData,
    getTodoList,
    handleDeleteTodo,
    handleToggleTodo,
    handleAddTodo,
    handleClearCompleted,
  };
}
