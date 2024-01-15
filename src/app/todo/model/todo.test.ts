import { makeTodo, selectCompleted, selectId, selectTitle } from "./todo";

describe("todo", () => {
  it("should create a todo", () => {
    const todo = makeTodo("1", "title", false);
    expect(todo).toEqual({
      id: "1",
      title: "title",
      completed: false,
    });
  });

  it("should select id", () => {
    const todo = makeTodo("1", "title", false);
    expect(selectId(todo)).toBe("1");
  });

  it("should select title", () => {
    const todo = makeTodo("1", "title", false);
    expect(selectTitle(todo)).toBe("title");
  });

  it("should select completed", () => {
    const todo = makeTodo("1", "title", false);
    expect(selectCompleted(todo)).toBe(false);
  });
});
