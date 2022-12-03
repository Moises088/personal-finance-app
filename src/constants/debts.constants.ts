import { DebtsInstitution } from "../interfaces/services/debts.interface";

export const DEBTS_INSTITUTION: DebtsInstitution[] = [
    { id: 1, name: "NUBANK", logo: require("../../assets/institutions/nubank.png"), color: "#400159" },
    { id: 2, name: "ITAU", logo: require("../../assets/institutions/itau.png"), color: "#181a59" },
    { id: 3, name: "BANCO DO BRASIL", logo: require("../../assets/institutions/bb.png"), color: "#FFF200" },
    { id: 4, name: "CAIXA", logo: require("../../assets/institutions/caixa.png"), color: "#00132b" },
    { id: 5, name: "INTER", logo: require("../../assets/institutions/inter.png"), color: "#8a4303" },
    { id: 6, name: "MASTERCARD", logo: require("../../assets/institutions/mastercard.png"), color: "#FFF" },
    { id: 7, name: "CIELO", logo: require("../../assets/institutions/cielo.png"), color: "#FFF" },
    { id: 8, name: "OUTRO", logo: require("../../assets/institutions/default.png"), color: "#FFF" },
];