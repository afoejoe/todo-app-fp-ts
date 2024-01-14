import { Todo } from "@/app/todo/model/todo";
import { DB_CONFIG } from "./config";

class DB {
  private db: IDBDatabase | null = null;

  async init() {
    const request = indexedDB.open(DB_CONFIG.name, DB_CONFIG.version);
    request.onerror = (event) => console.error("IndexedDB error:", event);
    request.onsuccess = (_event) => {
      this.db = request.result;
      return new Promise((resolve) => resolve(request.result));
    };

    return await new Promise(
      (resolve) => (
        (request.onupgradeneeded = (ev) => {
          if (!request.result) {
            throw new Error("DB not initialized");
          }

          if (!request.result.objectStoreNames.contains(DB_CONFIG.todoStore)) {
            request.result.createObjectStore(DB_CONFIG.todoStore, {
              keyPath: "id",
            });
          }
        }),
        (request.onsuccess = (ev) => {
          this.db = request.result;
          resolve(ev);
        })
      ),
    );
  }

  async addTodo(todo: Todo): Promise<unknown> {
    const transaction = this.db?.transaction(DB_CONFIG.todoStore, "readwrite");
    const store = transaction?.objectStore(DB_CONFIG.todoStore);

    if (!store) {
      throw new Error(DB_CONFIG.storeNotFoundError);
    }
    const request = store.add(todo);
    return new Promise(
      (resolve, reject) => (
        (request.onsuccess = resolve), (request.onerror = reject)
      ),
    );
  }

  async getTodoList(): Promise<Todo[]> {
    const transaction = this.db?.transaction(DB_CONFIG.todoStore, "readonly");
    const store = transaction?.objectStore(DB_CONFIG.todoStore);

    if (!store) {
      throw new Error(DB_CONFIG.storeNotFoundError);
    }

    const request: IDBRequest<Todo[]> = store!.getAll();

    return await new Promise((resolve) => {
      request.onsuccess = () => resolve(request.result);
    });
  }

  async updateTodo(todo: Todo): Promise<void> {
    const transaction = this.db?.transaction(DB_CONFIG.todoStore, "readwrite");
    const store = transaction?.objectStore(DB_CONFIG.todoStore);
    if (!store) {
      throw new Error(DB_CONFIG.storeNotFoundError);
    }
    const request = store.put(todo);
    await new Promise(
      (resolve, reject) => (
        (request.onsuccess = resolve), (request.onerror = reject)
      ),
    );
  }

  async deleteTodo(id: Todo["id"]): Promise<void> {
    const transaction = this.db?.transaction(DB_CONFIG.todoStore, "readwrite");
    const store = transaction?.objectStore(DB_CONFIG.todoStore);
    if (!store) {
      throw new Error(DB_CONFIG.storeNotFoundError);
    }
    const request = store.delete(id);
    await new Promise(
      (resolve, reject) => (
        (request.onsuccess = resolve), (request.onerror = reject)
      ),
    );
  }

  async deleteAll(): Promise<void> {
    const transaction = this.db?.transaction(DB_CONFIG.todoStore, "readwrite");
    const store = transaction?.objectStore(DB_CONFIG.todoStore);
    if (!store) {
      throw new Error(DB_CONFIG.storeNotFoundError);
    }
    const request = store.clear();
    await new Promise(
      (resolve, reject) => (
        (request.onsuccess = resolve), (request.onerror = reject)
      ),
    );
  }

  close() {
    console.log("db closed");

    this.db?.close();
  }
}

export const db = new DB();
