import { fireEvent, render } from "@testing-library/react";
import TodoView from "./TodoView";
import "@testing-library/jest-dom";
import { UseTodoViewController } from "./useTodoViewController";
import { EFilter } from "@/types/enums";
import * as O from "fp-ts/Option";

let data: UseTodoViewController["data"] = O.none;

const handleAddTodo = jest.fn((e) => e.preventDefault());
const handleDeleteTodo = jest.fn();
const handleToggleTodo = jest.fn();
const handleFilterChange = jest.fn();
const handleClearCompleted = jest.fn();

jest.mock("./useTodoViewController", () => {
  return {
    useTodoViewController: () => ({
      data: data,
      footerText: "You haven't added any items",
      handleAddTodo: handleAddTodo,
      handleDeleteTodo: handleDeleteTodo,
      handleToggleTodo: handleToggleTodo,
      handleFilterChange: handleFilterChange,
      handleClearCompleted: handleClearCompleted,
      filter: EFilter.ALL,
    }),
  };
});

describe("TodoView Component", () => {
  describe("Rendering", () => {
    it("shows loading... before data is fetched", () => {
      data = O.none;
      const { container, getByText } = render(<TodoView />);

      expect(getByText("Loading...")).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });

    it("renders empty data correctly", () => {
      data = O.some([]);
      const { getByText, queryByText, container } = render(<TodoView />);

      expect(queryByText("Loading...")).not.toBeInTheDocument();
      expect(getByText("You haven't added any items")).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });

    it("renders some data correctly", () => {
      data = O.some([
        {
          id: "1",
          title: "Todo 1",
          completed: false,
        },
        {
          id: "2",
          title: "Todo 2",
          completed: true,
        },
      ]);

      const { container, queryByText, getByText } = render(<TodoView />);

      expect(getByText("Todo 1")).toBeInTheDocument();
      expect(queryByText("Loading...")).not.toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });

  describe("interactions", () => {
    data = O.some([
      {
        id: "1",
        title: "Todo 1",
        completed: false,
      },
      {
        id: "2",
        title: "Todo 2",
        completed: true,
      },
    ]);
    it("should add a new todo", () => {
      const { getByRole } = render(<TodoView />);

      const button = getByRole("button", {
        name: "Add",
      });

      fireEvent.click(button);
      expect(handleAddTodo).toHaveBeenCalled();
    });

    it("should toggle a todo", () => {
      const { getByRole } = render(<TodoView />);
      const button = getByRole("button", {
        name: "Todo 1",
      });

      fireEvent.click(button);
      expect(handleToggleTodo).toHaveBeenCalled();
    });

    it("should delete a todo", () => {
      const { getAllByRole } = render(<TodoView />);
      const button = getAllByRole("button", {
        name: "Delete",
      });

      fireEvent.click(button[0]);
      expect(handleDeleteTodo).toHaveBeenCalled();
    });

    it("should clear completed todos", () => {
      const { getByRole } = render(<TodoView />);
      const button = getByRole("button", {
        name: "Clear Completed",
      });
      fireEvent.click(button);
      expect(handleClearCompleted).toHaveBeenCalled();
    });

    it("should filter todos", () => {
      const { getByRole } = render(<TodoView />);
      const button = getByRole("button", {
        name: "Completed",
      });

      fireEvent.click(button);
      expect(handleFilterChange).toHaveBeenCalled();
    });
  });
});
