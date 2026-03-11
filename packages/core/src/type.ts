export type StorageSchema = {
    getItem(key: string): string | null;   
    setItem(key: string, value: string, options?:{expires?: number | null}): void;
    removeItem(key: string): void;
    clear(): void;
  };