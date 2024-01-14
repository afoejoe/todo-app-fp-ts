import { render } from "@testing-library/react";
import TodoView from "./TodoView";
import "@testing-library/jest-dom";
import { UseTodoViewController } from "./useTodoViewController";
import { EFilter } from "@/types/enums";
import { it } from "node:test";


let data: UseTodoViewController['data'] = []


jest.mock("./useTodoViewController", () => {
    return {
        useTodoViewController: () => ({
            data: data,
            footerText: "2 items left",
            handleAddTodo: jest.fn(),
            handleDeleteTodo: jest.fn(),
            handleToggleTodo: jest.fn(),
            handleFilterChange: jest.fn(),
            handleClearCompleted: jest.fn(),
            filter: EFilter.ALL,
        }),
    };
});



describe("TodoView Component", () => {
    it("shows loading... before data is fetched", () => {
        const { container, getByText, debug } = render(<TodoView />);
        expect(getByText("Loading...")).toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });

    it.skip("renders empty data correctly", () => {
        data = [
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
        ];


        const { getByText, queryByText, container, debug } = render(<TodoView />);
        expect(queryByText("Loading...")).not.toBeInTheDocument();

        expect(getByText("You haven't added any items")).toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });

    test.skip("renders some data correctly", () => {
        data = [
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
        ];

        const { container, debug } = render(<TodoView />);
        expect(container).toMatchSnapshot();
    })
});
