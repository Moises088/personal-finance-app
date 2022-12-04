import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_FINANCES } from "../constants/storage.constant";
import { FinanceDto, FinanceEntity } from "../interfaces/services/finance.interface";
import { Services } from "../interfaces/services/service.interface";
import { getPipeDateTimeString } from "../utils/date.util";
import { getPipeMoneyNumber } from "../utils/money.util";

class Finance implements FinanceEntity {
    id: number;
    name: string;
    description?: string | undefined;
    value: number;
    categoryId: number;
    walletId: number;
    billId: number;
    paidAt: string;
    isPaid: boolean;
    type: "INCOME" | "EXPENSE";
    createdAt: string;
    updatedAt?: string;

    constructor(createFinanceDto: FinanceDto, lastId: number) {
        this.id = lastId + 1;
        this.name = createFinanceDto.name;
        this.categoryId = createFinanceDto?.categoryId ?? 0;
        this.walletId = createFinanceDto.walletId;
        this.type = createFinanceDto.type;
        this.isPaid = createFinanceDto.isPaid;
        this.value = getPipeMoneyNumber(createFinanceDto.money);
        this.paidAt = createFinanceDto.paid;
        this.createdAt = getPipeDateTimeString();
        this.billId = createFinanceDto?.billId ?? 0
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
        if (!createDto?.categoryId && !createDto?.billId) throw new Error("Categoria ou Fatura é obrigatória")

        const finances = await this.find();
        const lastFinance = this.findLast(finances);

        const finance = new Finance(createDto, lastFinance?.id ?? 0);
        finances.push(finance);

        await AsyncStorage.setItem(ASYNC_FINANCES, JSON.stringify(finances));
        return finance;
    }

    public async update(id: number, updateDto: FinanceDto): Promise<FinanceEntity | undefined> {
        const finances = await this.find();
        let finance = finances.find(finance => finance.id == id);
        let index = finances.findIndex(finance => finance.id == id);
        if (!finance) return;

        finance = { ...finance, ...updateDto, value: getPipeMoneyNumber(updateDto.money), paidAt: updateDto.paid }
        finances.splice(index, 1, finance);

        await AsyncStorage.setItem(ASYNC_FINANCES, JSON.stringify(finances));

        return finance
    }

    public async delete(id: number): Promise<FinanceEntity[]> {
        const finances = await this.find();
        const remove = finances.filter(finance => finance.id !== id);
        await AsyncStorage.setItem(ASYNC_FINANCES, JSON.stringify(remove));

        return remove;
    }

    protected findLast(finances: FinanceEntity[]): FinanceEntity | undefined {
        return finances[finances.length - 1];
    }
}

export const AppFinanceService = new FinanceService()