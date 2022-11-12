import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_FINANCES } from "../constants/storage.constant";
import { FinanceDto, FinanceEntity } from "../interfaces/services/finance.interface";
import { Services } from "../interfaces/services/service.interface";
import { getPipeDateString } from "../utils/date.util";
import { getPipeMoneyNumber } from "../utils/money.util";

class Finance implements FinanceEntity {
    id: number;
    name: string;
    description?: string | undefined;
    value: number;
    categoryId: number;
    walletId: number;
    paidAt: string;
    isPaid: boolean;
    createdAt: string;
    updatedAt?: string;

    constructor(createFinanceDto: FinanceDto, lastId: number) {
        this.id = lastId + 1;
        this.name = createFinanceDto.name;
        this.categoryId = createFinanceDto.categoryId;
        this.walletId = createFinanceDto.walletId;
        this.isPaid = createFinanceDto.isPaid;
        this.value = getPipeMoneyNumber(createFinanceDto.money);
        this.paidAt = getPipeDateString(createFinanceDto.paid);
        this.createdAt = getPipeDateString();
    }
}

class FinanceService implements Services<FinanceEntity, FinanceDto>{
    public async find(): Promise<FinanceEntity[]> {
        const finances = await AsyncStorage.getItem(ASYNC_FINANCES);
        if (finances) return JSON.parse(finances);
        return [];
    }

    public async findOne(id: number): Promise<FinanceEntity | undefined> {
        const finances = await this.find();
        return finances.find(finance => finance.id == id);
    }

    public async create(createDto: FinanceDto): Promise<FinanceEntity> {
        const finances = await this.find();
        const lastFinance = this.findLast(finances);

        const finance = new Finance(createDto, lastFinance?.id ?? 0);
        finances.push(finance);

        await AsyncStorage.setItem(ASYNC_FINANCES, JSON.stringify(finances));
        return finance;
    }

    public async update(updateDto: FinanceDto): Promise<void> {
        throw new Error("Method not implemented.");
    }

    protected findLast(finances: FinanceEntity[]): FinanceEntity | undefined {
        return finances[finances.length - 1];
    }
}

export const AppFinanceService = new FinanceService()