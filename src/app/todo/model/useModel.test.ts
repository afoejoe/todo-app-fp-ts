import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useTodoModel } from ".";

Object.defineProperty(global.self, "crypto", {
  value: {
    randomUUID: jest.fn().mockReturnValue("mock-uuid-value"),
  },
});

const TEST_TODO = {
  id: "1",
  title: "test",
  completed: false,
};
jest.mock("../../../lib/db", () => ({
  db: {
    init: jest.fn(),
    addTodo: jest.fn(),
    deleteTodo: jest.fn(),
    getTodoList: jest.fn(() => Promise.resolve([TEST_TODO])),
    updateTodo: jest.fn(),
    deleteAll: jest.fn(),
  },
}));

describe("useTodoModel", () => {
  it("should add todo", () => {
    const { result } = renderHook(() => useTodoModel());
    const { addTodo } = result.current;

    expect(result.current.data).toBeNull();
    act(() => {
      addTodo("test");
    });
    expect(result.current.data).toEqual([
      {
        id: expect.any(String),
        title: "test",
        completed: false,
      },
    ]);
  });

  it("should delete todo", async () => {
    const { result } = renderHook(() => useTodoModel([TEST_TODO]));
    const { deleteTodo, data } = result.current;

    expect(data).not.toBeNull();

    act(() => {
      deleteTodo(TEST_TODO.id);
    });
    expect(result.current.data).toEqual([]);
  });

  it("should update todo", () => {
    const { result } = renderHook(() =>
      useTodoModel([
        {
          id: "1",
          title: "test",
          completed: false,
        },
      ]),
    );

    act(() => {
      result.current.updateTodo({
        id: "1",
        title: "test",
        completed: true,
      });
    });
    expect(result.current.data).toEqual([
      {
        id: "1",
        title: "test",
        completed: true,
      },
    ]);
  });

  it("should clear todo list", () => {
    const { result } = renderHook(() => useTodoModel());

    act(() => {
      result.current.clearTodoList();
    });

    expect(result.current.data).toEqual([]);
  });

  it("should get todo list", async () => {
    const { result } = renderHook(() => useTodoModel(null));

    await act(async () => {
      await result.current.getTodoList();
    });
    expect(result.current.data).toEqual([TEST_TODO]);
  });
});
