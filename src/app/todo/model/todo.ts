import { Option } from "fp-ts/Option";
import { Eq, struct } from "fp-ts/lib/Eq";
import * as S from "fp-ts/string";

export interface Todo {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
}

export type TodoList = Option<Array<Todo>>;

/** Todo constructor. Takes id, title and completed and returns a Todo */
export function makeTodo(id: string, title: string, completed = false) {
  return {
    id,
    title,
    completed,
  };
}

/** Todo Id selector */
export function selectId({ id }: Todo) {
  return id;
}

/** Todo title selector */
export function selectTitle({ title }: Todo) {
  return title;
}

/** Todo completed selector */
export function selectCompleted({ completed }: Todo) {
  return completed;
}

const EqTodo: Eq<Todo> = struct({
  id: S.Eq,
});

/** Two todos are equal if they have the same id */
export function isSameTodo(a: Todo, b: Todo) {
  return EqTodo.equals(a, b);
}
