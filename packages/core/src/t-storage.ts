import type { StorageSchema } from "./type";

type ExpiringValue<T> = {
  value: T;
  expiresAt: number | null;
};

export class TStorage<S extends Record<string, any>> {
  private storage: StorageSchema;
  private timers = new Map<string, ReturnType<typeof setTimeout>>();

  constructor() {
      this.storage = globalThis.localStorage;
  }

  private clearTimer(key: string): void {
    const existing = this.timers.get(key);
    if (existing) {
      clearTimeout(existing);
      this.timers.delete(key);
    }
  }

  private scheduleExpiry(key: string, expiresAt: number | null): void {
    this.clearTimer(key);
    if (expiresAt === null) return;

    const delay = expiresAt - Date.now();
    if (delay <= 0) {
      this.storage.removeItem(key);
      return;
    }

    const timer = setTimeout(() => {
      this.storage.removeItem(key);
      this.timers.delete(key);
    }, delay);

    this.timers.set(key, timer);
  }

  setItem<K extends keyof S>(key: K, value: S[K], options?: { expires?: number }): void {
    const storageKey = String(key);
    const ttlMs = options?.expires;
    const expiresAt = typeof ttlMs === "number" ? Date.now() + ttlMs : null;

    const payload: ExpiringValue<S[K]> = {
      value,
      expiresAt,
    };

    const raw = JSON.stringify(payload);
    this.storage.setItem(storageKey, raw);
    this.scheduleExpiry(storageKey, expiresAt);
  }

  getItem<K extends keyof S>(key: K): S[K] | null {
    const raw = this.storage.getItem(String(key));
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw) as ExpiringValue<S[K]> | S[K];

      // Backward compatibility for values written before TTL wrapper.
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        "value" in parsed &&
        "expiresAt" in parsed
      ) {
        const wrapped = parsed as ExpiringValue<S[K]>;
        if (wrapped.expiresAt !== null && Date.now() > wrapped.expiresAt) {
          this.removeItem(key);
          return null;
        }

        this.scheduleExpiry(String(key), wrapped.expiresAt);
        return wrapped.value;
      }

      return parsed as S[K];
    } catch {
      return null;
    }
  }

  removeItem<K extends keyof S>(key: K): void {
    const storageKey = String(key);
    this.clearTimer(storageKey);
    this.storage.removeItem(storageKey);
  }
  
  hasItem<K extends keyof S>(key: K): boolean {
    return this.getItem(key) !== null;
  }

  clear(): void {
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }
    this.timers.clear();
    this.storage.clear();
  }
}

export class SessionStorage<S extends Record<string, any>> {
  private storage: StorageSchema;

  constructor() {
      this.storage = globalThis.sessionStorage;
  }

  setItem<K extends keyof S>(key: K, value: S[K]): void {
    const raw = JSON.stringify(value);
    this.storage.setItem(String(key), raw);
  }

  getItem<K extends keyof S>(key:K):S[K] | null{
    const raw = this.storage.getItem(String(key));
    return raw ? JSON.parse(raw) : null;
  }

  clear(): void{
    this.storage.clear();
  }
}