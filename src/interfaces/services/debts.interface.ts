export interface DebtsEntity extends DebtsDto {
    id: number;
    createdAt: string;
    updatedAt?: string;
}

export interface DebtsDto {
    type: "INVOICE" | "BILL" | "LOAN";
    total: number;
    totalPerMonth: number;  
    institution: DebtsInstitution;
    institutionName?: string;
    paidMonthAt: string;
}

export interface DebtsInstitution {
    name: string;
    color: string;
    logo: any
}

export interface DebtForms {
    institution: DebtsInstitution;
    total: string;
    totalPerMonth: string;
    paidMonthAt: string;
    institutionName?: string;
}