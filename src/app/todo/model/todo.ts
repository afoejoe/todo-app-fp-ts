export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export function makeTodo(id: string, title: string, completed = false) {
  return {
    id,
    title,
    completed,
  };
}

export function selectId({ id }: Todo) {
  return id;
}

export function selectTitle({ title }: Todo) {
  return title;
}

export function selectCompleted({ completed }: Todo) {
  return completed;
}

export function isSameTodo(a: Todo, b: Todo) {
  return selectId(a) === selectId(b);
}
