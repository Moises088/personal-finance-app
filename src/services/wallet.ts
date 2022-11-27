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
        if (!wallets.length) return await this.create({ name: "Principal" })
        return wallets.find(wallet => wallet.id == id);
    }

    public async create(createDto: WalletDto): Promise<WalletEntity> {
        const wallets = await this.find();

        const filter = wallets.filter(wallet => wallet.name == createDto.name);
        if (filter.length) throw new Error('Carteira já criada');

        const lastWallet = this.findLast(wallets);
        const wallet = new Wallet(lastWallet?.id ?? 0, createDto.name);

        wallets.push(wallet);

        await AsyncStorage.setItem(ASYNC_WALLETS, JSON.stringify(wallets));

        return wallet;
    }

    public async update(id: number, updateDto: WalletDto): Promise<WalletEntity | undefined> {
        return
    }

    protected findLast(wallets: WalletEntity[]): WalletEntity | undefined {
        return wallets[wallets.length - 1];
    }

    public async delete(id: number): Promise<WalletEntity[]> {
        return []
    }
}

export const AppWalletService = new WalletService()