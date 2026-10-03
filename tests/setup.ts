import { vi } from 'vitest';

let counter = 0;
vi.mock('expo-crypto', () => ({
  randomUUID: () => `12345678-1234-1234-1234-${String(++counter).padStart(12, '0')}`,
}));
