import { act, renderHook } from "@testing-library/react";
import { useTodoViewController } from "./useTodoViewController";
import { EFilter } from "@/types/enums";

const getTodoList = jest.fn();

jest.mock("../view-model/useTodoViewModel", () => ({
  useTodoViewModel: () => ({
    getTodoList: getTodoList,
    footerText: "",
    data: null,
    handleDeleteTodo: jest.fn(),
    handleToggleTodo: jest.fn(),
    handleAddTodo: jest.fn((e) => e.preventDefault()),
    handleClearCompleted: jest.fn(),
    handleFilterChange: jest.fn(),
  }),
}));

describe("useTodoViewController", () => {
  it("should call getTodoList", () => {
    const { result } = renderHook(() => useTodoViewController());

    expect(result.current.data).toBeNull();
    expect(getTodoList).toHaveBeenCalled();
  });

  it("should change filter", () => {
    const { result } = renderHook(() => useTodoViewController());
    const { handleFilterChange } = result.current;
    act(() => {
      handleFilterChange(EFilter.COMPLETED)();
    });
    expect(result.current.filter).toBe(EFilter.COMPLETED);
  });
});
