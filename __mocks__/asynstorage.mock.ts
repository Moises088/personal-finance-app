import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { ASYNC_CATEGORIES, ASYNC_WALLETS } from '../src/constants/storage.constant';
import { CategoryEntity } from '../src/interfaces/services/category.interface';
import { WalletEntity } from '../src/interfaces/services/wallet.interface';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

type MockProps = {
  ASYNC_CATEGORIES: CategoryEntity[];
  ASYNC_WALLETS: WalletEntity[];
}

const Mock: MockProps = {
  ASYNC_CATEGORIES: [{ id: 1, name: 'Bike', color: '#d44', icon: 'biking' }],
  ASYNC_WALLETS: [{ name: 'Principal', id: 1 }]
}

AsyncStorageMock.getItem = jest.fn((key, callback): Promise<string | null> => {
  if (key == ASYNC_CATEGORIES) return new Promise(resolve => resolve(JSON.stringify(Mock["ASYNC_CATEGORIES"])))
  if (key == ASYNC_WALLETS) return new Promise(resolve => resolve(JSON.stringify(Mock["ASYNC_WALLETS"])))
  return new Promise(resolve => resolve(JSON.stringify([])));
});

export default AsyncStorageMock;