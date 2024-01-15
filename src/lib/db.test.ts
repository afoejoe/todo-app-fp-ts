// import { act } from "react-dom/test-utils";
import { act } from "@testing-library/react";
import { db } from "./db";

import { indexedDB as fakeIndexedDB, } from 'fake-indexeddb';


global.structuredClone = jest.fn(val => {
    return JSON.parse(JSON.stringify(val));
});

const TODO_LIST = [
    { id: "1", title: "test", completed: false },
    { id: "2", title: "test2", completed: true },
]

describe('db', () => {
    beforeAll(() => {
        global.indexedDB = fakeIndexedDB
    })

    beforeEach(async () => {
        await db.init();
    });

    afterEach(async () => {
        await db.deleteAll();
    });

    it('initializes the db', async () => {
        await act(async () => {
            const res = await db.init();
            expect(res).not.toBeNull();
        })
    })



    it("deletes a todo", async () => {
        await act(async () => {
            await db.addTodo(TODO_LIST[0]);
            await db.deleteTodo("1");
            const res2 = await db.getTodoList();
            expect(res2.length).toEqual(0);
        })
    })



    it("adds and selects a todo", async () => {
        await act(async () => {
            await db.addTodo(TODO_LIST[0]);
            const res2 = await db.getTodoList();
            expect(res2.length).toEqual(1);
            expect(res2[0]).toEqual(TODO_LIST[0]);
        })
    })

    it("updates a todo", async () => {
        await act(async () => {
            await db.addTodo(TODO_LIST[0]);
            const updated = {
                ...TODO_LIST[0],
                title: "test2"
            }
            await db.updateTodo(updated);
            const updatedRes = await db.getTodoList();
            expect(updatedRes.length).toEqual(1);
            expect(updatedRes[0]).toEqual(updated);
        })
    })


    it("deletes all todos", async () => {
        await act(async () => {
            await db.addTodo(TODO_LIST[0]);
            await db.addTodo(TODO_LIST[1]);
            const res = await db.getTodoList();
            expect(res.length).toEqual(2);
            await db.deleteAll();
            const res2 = await db.getTodoList();
            expect(res2.length).toEqual(0);
        })
    })
})