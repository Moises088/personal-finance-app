import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_WALLETS } from "../constants/storage.constant";
import { Services } from "../interfaces/services/service.interface";
import { WalletDto, WalletEntity } from "../interfaces/services/wallet.interface";

class Wallet implements WalletEntity {
    public id: number;
    public name: string;

    constructor(id: number, name: string) {
        this.id = id + 1;
        this.name = name;
    }
}

class WalletService implements Services<WalletEntity, WalletDto>{
    public async find(): Promise<WalletEntity[]> {
        const wallets = await AsyncStorage.getItem(ASYNC_WALLETS);
        if (wallets) return JSON.parse(wallets);
        return [];
    }

    public async findOne(id: number): Promise<WalletEntity | undefined> {
        const wallets = await this.find();
        return wallets.find(wallet => wallet.id == id);
    }

    public async create(createDto: WalletDto): Promise<WalletEntity> {
        const wallets = await this.find();

        const { wallet } = this.onCreateWallet(wallets, createDto)
        wallets.push(wallet);

        await AsyncStorage.setItem(ASYNC_WALLETS, JSON.stringify(wallets));

        return wallet;
    }

    public async update(updateDto: WalletDto): Promise<void> {
        return
    }

    public onCreateWallet(wallets: WalletEntity[], { name }: WalletDto) {
        const filter = wallets.filter(wallet => wallet.name == name);
        if (filter.length) throw new Error('Carteira já criada');

        const lastWallet = this.findLast(wallets);
        const wallet = new Wallet(lastWallet?.id ?? 0, name);

        return { wallet }
    }

    protected findLast(wallets: WalletEntity[]): WalletEntity | undefined {
        return wallets[wallets.length - 1];
    }
}

export const AppWalletService = new WalletService()