import { Todo, makeTodo } from "./todo";

export function toggleTodo({ completed, ...rest }: Todo) {
  return makeTodo(rest.id, rest.title, !completed);
}

export function clearCompleted({ ...rest }: Todo) {
  return makeTodo(rest.id, rest.title, false);
}

export function selectAll({ ...rest }: Todo) {
  return makeTodo(rest.id, rest.title, true);
}

// addtodo, filtertodo, toggletodo, deletetodo, clearcompleted
