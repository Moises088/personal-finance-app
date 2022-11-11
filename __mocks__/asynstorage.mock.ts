import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { ASYNC_CATEGORIES, ASYNC_FINANCES, ASYNC_WALLETS } from '../src/constants/storage.constant';
import { CategoryEntity } from '../src/interfaces/services/category.interface';
import { FinanceEntity } from '../src/interfaces/services/finance.interface';
import { WalletEntity } from '../src/interfaces/services/wallet.interface';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

type MockProps = {
  ASYNC_CATEGORIES: CategoryEntity[];
  ASYNC_WALLETS: WalletEntity[];
  ASYNC_FINANCES: FinanceEntity[];
}

const Mock: MockProps = {
  ASYNC_CATEGORIES: [{ id: 1, name: 'Bike', color: '#d44', icon: 'biking' }],
  ASYNC_WALLETS: [{ name: 'Principal', id: 1 }],
  ASYNC_FINANCES: [
    { id: 1, categoryId: 1, walletId: 1, createdAt: '2022-11-10 00:00:00', isPaid: true, name: 'Conta', paidAt: '2022-11-10 00:00:00', value: 20.00 }
  ]
}

AsyncStorageMock.getItem = jest.fn((key, callback): Promise<string | null> => {
  if (key == ASYNC_CATEGORIES) return new Promise(resolve => resolve(JSON.stringify(Mock["ASYNC_CATEGORIES"])))
  if (key == ASYNC_WALLETS) return new Promise(resolve => resolve(JSON.stringify(Mock["ASYNC_WALLETS"])))
  if (key == ASYNC_FINANCES) return new Promise(resolve => resolve(JSON.stringify(Mock["ASYNC_FINANCES"])))
  return new Promise(resolve => resolve(JSON.stringify([])));
});

export default AsyncStorageMock;