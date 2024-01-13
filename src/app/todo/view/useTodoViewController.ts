import { EFilter } from "@/types/enums";
import { useTodoViewModel } from "../view-model/useTodoViewModel";
import { useCallback, useEffect, useState } from "react";

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

    return () => {
      // TODO: cleanup or abort
    };
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
