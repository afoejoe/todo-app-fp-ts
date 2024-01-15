import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useTodoModel } from ".";

Object.defineProperty(global.self, 'crypto', {
    value: {
        randomUUID: jest.fn().mockReturnValue('mock-uuid-value')
    }
});

jest.mock('../../../lib/db', () => ({
    db: {
        init: jest.fn(),
        addTodo: jest.fn(),
        deleteTodo: jest.fn(),
        getTodoList: jest.fn(),
        updateTodo: jest.fn(),
        deleteAll: jest.fn(),
    }
}))


describe('useTodoModel', () => {
    it("should add todo", () => {
        const { result } = renderHook(() => useTodoModel());
        const { addTodo } = result.current;
        act(() => {
            addTodo("test");
        });
        expect(result.current.data).toEqual([
            {
                id: expect.any(String),
                title: "test",
                completed: false,
            }])
    })


    it("should delete todo", () => {
        const { result } = renderHook(() => useTodoModel());
        const { deleteTodo, addTodo } = result.current;
        act(() => {
            addTodo("test");
            deleteTodo("mock-uuid-value");
        });
        expect(result.current.data).toEqual([])
    })


})