import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { AsyncMock, ASYNC_BUDGETS, ASYNC_CATEGORIES, ASYNC_DEBTS, ASYNC_FINANCES, ASYNC_WALLETS } from '../src/constants/storage.constant';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);


AsyncStorageMock.getItem = jest.fn((key, callback): Promise<string | null> => {
  if (key == ASYNC_CATEGORIES) return new Promise(resolve => resolve(JSON.stringify(AsyncMock["ASYNC_CATEGORIES"])))
  if (key == ASYNC_WALLETS) return new Promise(resolve => resolve(JSON.stringify(AsyncMock["ASYNC_WALLETS"])))
  if (key == ASYNC_FINANCES) return new Promise(resolve => resolve(JSON.stringify(AsyncMock["ASYNC_FINANCES"])))
  if (key == ASYNC_BUDGETS) return new Promise(resolve => resolve(JSON.stringify(AsyncMock["ASYNC_BUDGETS"])))
  if (key == ASYNC_DEBTS) return new Promise(resolve => resolve(JSON.stringify(AsyncMock["ASYNC_DEBTS"])))
  return new Promise(resolve => resolve(JSON.stringify([])));
});

export default AsyncStorageMock;