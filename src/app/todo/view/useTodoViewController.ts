import { EFilter } from "@/types/enums";
import { useTodoViewModel } from "../view-model/useTodoViewModel";
import { useCallback, useEffect, useState } from "react";

export type UseTodoViewController = ReturnType<typeof useTodoViewController>;

export function useTodoViewController() {
  const [filter, setFilter] = useState(EFilter.ALL);

  const {
    getTodoList,
    footerText,
    data,
    handleDeleteTodo,
    handleToggleTodo,
    handleAddTodo,
    handleClearCompleted,
  } = useTodoViewModel({ filter });

  const handleFilterChange = useCallback((filter: EFilter) => {
    return () => {
      setFilter(filter);
    };
  }, []);

  useEffect(() => {
    getTodoList();
  }, [getTodoList]);

  return {
    filter,
    footerText,
    data,
    handleAddTodo,
    handleFilterChange,
    handleDeleteTodo,
    handleToggleTodo,
    handleClearCompleted,
  };
}
