import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";

const createLocalStorage = () => {
  const storage: Record<string, string> = {};

  return {
    get length() {
      return Object.keys(storage).length;
    },
    key(index: number) {
      return Object.keys(storage)[index] ?? null;
    },
    getItem(key: string) {
      return storage[key] ?? null;
    },
    setItem(key: string, value: string) {
      storage[key] = value;
    },
    removeItem(key: string) {
      delete storage[key];
    },
    clear() {
      Object.keys(storage).forEach((key) => delete storage[key]);
    },
  };
};

const mockedLocalStorage = createLocalStorage();

globalThis.localStorage = mockedLocalStorage;

afterEach(() => {
  cleanup();
  mockedLocalStorage.clear();
});
