import type { StorageSchema } from "./type";

export class TStorage<S extends Record<string, any>> {
  private storage: StorageSchema;

  constructor() {
      this.storage = globalThis.localStorage;
  }

  setItem<K extends keyof S>(key: K, value: S[K]): void {
    const raw = JSON.stringify(value);
    this.storage.setItem(String(key), raw);
  }

  getItem<K extends keyof S>(key: K): S[K] | null {
    const raw = this.storage.getItem(String(key));
    return raw ? JSON.parse(raw) : null;
  }

  removeItem<K extends keyof S>(key: K): void {
    this.storage.removeItem(String(key));
  }
  
  IsExist<K extends keyof S>(key:K):boolean{
    const raw = this.storage.getItem(String(key));  
    if(!raw) return false;
    return true;
  }

  clear(): void {
    this.storage.clear();
  }
}
