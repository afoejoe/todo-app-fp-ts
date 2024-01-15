import { EFilter } from "@/types/enums";
import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useTodoViewModel } from "./useTodoViewModel";
import { FormEvent } from "react";

const DATA = [
    { id: "1", title: "title1", completed: false },
    { id: "2", title: "title2", completed: true },
];

const mockTodoModel = {
    data: null as any,
    deleteTodo: jest.fn(),
    addTodo: jest.fn(),
    getTodoList: jest.fn(),
    clearTodoList: jest.fn(),
    updateTodo: jest.fn(),
};

jest.mock("../model/useTodoModel", () => ({
    useTodoModel: () => mockTodoModel,
}));

describe("useTodoViewModel", () => {
    it("calls delete with id", () => {
        const { result } = renderHook(() =>
            useTodoViewModel({ filter: EFilter.ALL }),
        );
        const { handleDeleteTodo } = result.current;
        act(() => {
            handleDeleteTodo("1")();
        });
        expect(mockTodoModel.deleteTodo).toHaveBeenCalledWith("1");
    });

    it("calls toggle with the right argument", () => {
        const { result } = renderHook(() =>
            useTodoViewModel({ filter: EFilter.ALL }),
        );
        const { handleToggleTodo } = result.current;
        act(() => {
            handleToggleTodo(DATA[0])();
        });
        expect(mockTodoModel.updateTodo).toHaveBeenCalledWith({
            ...DATA[0],
            completed: true,
        });
    });

    it("calls addTodo with the right argument", () => {
        const { result } = renderHook(() =>
            useTodoViewModel({ filter: EFilter.ALL }),
        );
        const { handleAddTodo } = result.current;
        act(() => {
            handleAddTodo({
                preventDefault: jest.fn(),
                currentTarget: {
                    newTodoTitle: { value: "title" },
                    reset: jest.fn(),
                },
            } as unknown as FormEvent<HTMLFormElement>);
        });

        expect(mockTodoModel.addTodo).toHaveBeenCalledWith("title");
    });

    it("calls clearTodoList", () => {
        const { result } = renderHook(() =>
            useTodoViewModel({ filter: EFilter.ALL }),
        );
        const { handleClearCompleted } = result.current;
        act(() => {
            handleClearCompleted();
        });
        expect(mockTodoModel.clearTodoList).toHaveBeenCalled();
    });

    it("generates the right footer text without data", () => {
        const { result } = renderHook(() =>
            useTodoViewModel({ filter: EFilter.ALL }),
        );
        const { footerText } = result.current;
        expect(footerText).toBe("You haven't added any items");
    });

    describe("Filters Data", () => {
        it("generates the right filter with data", () => {
            mockTodoModel.data = DATA;

            const {
                result: {
                    current: { footerText },
                },
            } = renderHook(() => useTodoViewModel({ filter: EFilter.ALL }));

            expect(footerText).toBe(
                'You have <span className="font-medium">1</span> pending tasks, out of <span className="font-medium"> 2</span> tasks.',
            );
        });

        it("returns correctly filtered data: filter - ALL", () => {
            mockTodoModel.data = DATA;

            const {
                result: {
                    current: { data },
                },
            } = renderHook(() => useTodoViewModel({ filter: EFilter.ALL }));
            expect(data?.length).toBe(2);
        });

        it("returns correctly filtered data: filter - COMPLETED", () => {
            mockTodoModel.data = DATA;

            const {
                result: {
                    current: { data },
                },
            } = renderHook(() => useTodoViewModel({ filter: EFilter.COMPLETED }));
            expect(data?.length).toBe(1);
        });

        it("returns correctly filtered data: filter - INCOMPLETE", () => {
            mockTodoModel.data = DATA;

            const {
                result: {
                    current: { data },
                },
            } = renderHook(() => useTodoViewModel({ filter: EFilter.INCOMPLETE }));
            expect(data?.length).toBe(1);
        });
    });
});
