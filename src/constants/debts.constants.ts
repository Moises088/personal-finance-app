import { DebtsInstitution } from "../interfaces/services/debts.interface";

export const DEBTS_INSTITUTION: DebtsInstitution[] = [
    { name: "NUBANK", logo: require("../../assets/institutions/nubank.png"), color: "#400159" },
    { name: "ITAU", logo: require("../../assets/institutions/itau.png"), color: "#181a59" },
    { name: "BANCO DO BRASIL", logo: require("../../assets/institutions/bb.png"), color: "#FFF200" },
    { name: "CAIXA", logo: require("../../assets/institutions/caixa.png"), color: "#00132b" },
    { name: "INTER", logo: require("../../assets/institutions/inter.png"), color: "#8a4303" },
    { name: "MASTERCARD", logo: require("../../assets/institutions/mastercard.png"), color: "#FFF" },
    { name: "CIELO", logo: require("../../assets/institutions/cielo.png"), color: "#FFF" },
    { name: "OUTRO", logo: require("../../assets/institutions/default.png"), color: "#FFF" },
];