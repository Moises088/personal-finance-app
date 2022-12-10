import { FinanceEntity, FinancesBalanceEntity } from "./finance.interface";

export interface DebtsEntity extends DebtsDto {
    id: number;
    createdAt: string;
    updatedAt?: string;
}

export interface DebtsDto {
    type: "INVOICE" | "BILL" | "LOAN";
    total: number;
    totalPerMonth: number;  
    institutionId: number;
    institutionName?: string;
    paidMonthAt: string;
}

export interface DebtsInstitution {
    id: number;
    name: string;
    color: string;
    logo: any
}

export interface DebtsInstitutionTotal extends DebtsInstitution {
    total: number
}

export interface DebtForms {
    institution: DebtsInstitution;
    total: string;
    totalPerMonth: string;
    paidMonthAt: string;
    institutionName?: string;
}

export interface DebtsBalance extends DebtsEntity {
    totalMonth: number;
    institution: DebtsInstitution;
    finances: FinancesBalanceEntity[];
    totalPaid: number;
    totalRemain: number;
}