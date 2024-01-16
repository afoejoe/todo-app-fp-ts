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
import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/lib/function";

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
    return pipe(
      data,
      O.map((d) => {
        console.log({ d }, "Hello");
        return d?.filter(({ completed }) => {
          return (
            filter === EFilter.ALL ||
            (filter === EFilter.COMPLETED && completed) ||
            (filter === EFilter.INCOMPLETE && !completed)
          );
        });
      }),
    );
  }, [data, filter]);

  const footerText = pipe(
    data,
    O.fold(
      () => "",
      (d) =>
        d.length === 0
          ? "You haven't added any items"
          : `You have <span className="font-medium">${d.filter(({ completed }) => !completed).length}</span> pending tasks, out of <span className="font-medium"> ${d?.length}</span> tasks.`,
    ),
  );

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
