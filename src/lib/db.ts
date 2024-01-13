import { Todo } from "@/app/todo/model/todo";

class DB {
  private db: IDBDatabase | null = null;
  private objectStore: IDBObjectStore | null = null;

  async init() {
    const request = indexedDB.open("todoList", 1);
    request.onerror = (event) => console.error("IndexedDB error:", event);
    request.onsuccess = (_event) => {
      this.db = request.result;
      this.objectStore = this.db.createObjectStore("todos", { keyPath: "id" });
    };
    await new Promise((resolve) => (request.onupgradeneeded = resolve));
  }

  async addTodo(todo: Todo): Promise<Todo> {
    const transaction = this.db?.transaction("todos", "readwrite");
    const store = transaction?.objectStore("todos");

    if (!store) {
      throw new Error("Store not found");
    }
    const request = store.add(todo);
    return new Promise(
      (resolve) =>
        (request.onsuccess = () => resolve(request.result as unknown as Todo)),
    );
  }

  async getTodos(): Promise<Todo[]> {
    const transaction = this.db?.transaction("todos", "readonly");
    const store = transaction?.objectStore("todos");
    if (!store) {
      throw new Error("Store not found");
    }

    const request = store.getAll();
    return (await new Promise(
      (resolve) => (request.onsuccess = () => resolve),
    )) as Todo[];
  }

  async updateTodo(todo: Todo): Promise<void> {
    const transaction = this.db?.transaction("todos", "readwrite");
    const store = transaction?.objectStore("todos");
    if (!store) {
      throw new Error("Store not found");
    }
    const request = store.put(todo);
    await new Promise((resolve) => (request.onsuccess = resolve));
  }

  async deleteTodo(id: number): Promise<void> {
    const transaction = this.db?.transaction("todos", "readwrite");
    const store = transaction?.objectStore("todos");
    if (!store) {
      throw new Error("Store not found");
    }
    const request = store.delete(id);
    await new Promise((resolve) => (request.onsuccess = resolve));
  }

  close() {
    this.db?.close();
  }
}

export const db = new DB();
