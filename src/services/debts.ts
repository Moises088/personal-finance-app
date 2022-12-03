import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEBTS_INSTITUTION } from "../constants/debts.constants";
import { ASYNC_DEBTS } from "../constants/storage.constant";
import { DebtsBalance, DebtsDto, DebtsEntity, DebtsInstitution } from "../interfaces/services/debts.interface";
import { Services } from "../interfaces/services/service.interface";
import { getPipeDateTimeString } from "../utils/date.util";

class Debts implements DebtsEntity {
    id: number;
    type: "INVOICE" | "BILL" | "LOAN";
    total: number;
    totalPerMonth: number;
    institutionId: number;
    institutionName?: string;
    paidMonthAt: string;
    createdAt: string;
    updatedAt?: string;

    constructor(id: number, debtsDto: DebtsDto) {
        this.id = id + 1;
        this.type = debtsDto.type;
        this.total = debtsDto.total;
        this.totalPerMonth = debtsDto.totalPerMonth;
        this.institutionId = debtsDto.institutionId;
        this.institutionName = debtsDto.institutionName;
        this.paidMonthAt = debtsDto.paidMonthAt;
        this.createdAt = getPipeDateTimeString();
    }
}

class DebtsService implements Services<DebtsEntity, DebtsDto> {
    public async find(): Promise<DebtsEntity[]> {
        const categories = await AsyncStorage.getItem(ASYNC_DEBTS);
        return JSON.parse(categories ?? JSON.stringify([]));
    }

    public async findOne(id: number): Promise<DebtsEntity | undefined> {
        const debts = await this.find();
        return debts.find(debt => debt.id == id);
    }

    public async create(createDto: DebtsDto): Promise<DebtsEntity> {
        const debts = await this.find();

        const lastDebt = this.findLast(debts);
        const debt = new Debts(lastDebt?.id ?? 0, createDto);
        debts.push(debt);

        await AsyncStorage.setItem(ASYNC_DEBTS, JSON.stringify(debts));

        return debt;
    }

    public async update(id: number, updateDto: DebtsDto): Promise<DebtsEntity | undefined> {
        return
    }

    public async delete(id: number): Promise<DebtsEntity[]> {
        const debts = await this.find();
        const remove = debts.filter(debt => debt.id !== id);
        await AsyncStorage.setItem(ASYNC_DEBTS, JSON.stringify(remove));

        return remove;
    }

    public async getDebtsBalance(): Promise<DebtsBalance[]> {
        const debts = await this.find();
        const debtsBalance: DebtsBalance[] = []

        for (const debt of debts) {
            if (!debt.totalPerMonth) debt.totalPerMonth = debt.total
            const totalMonth = Math.ceil(debt.total / debt.totalPerMonth)
            const institution = DEBTS_INSTITUTION.find(institution => institution.id == debt.institutionId) as DebtsInstitution
            debtsBalance.push({
                ...debt,
                totalMonth,
                institution
            })
        }

        return debtsBalance
    }

    protected findLast(debts: DebtsEntity[]): DebtsEntity | undefined {
        return debts[debts.length - 1];
    }
}

export const AppDebtsService = new DebtsService()