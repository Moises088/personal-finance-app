import moment from "moment";
import 'moment/locale/pt-br';

/**
 * @param date is date number
 * @param time if false returns date without time
 * @returns date string of the type yyyy-mm-dd hh:mm:ss
 */
export const getPipeDateTimeString = (date: number = Date.now(), time: boolean = true): string => {
    const transformDate = moment(date);
    if (!time) return transformDate.format("YYYY-MM-DD");
    return transformDate.format("YYYY-MM-DD HH:mm:ss");
}

/**
 * @param date is date number
 * @param format date format string
 * @returns moment string
 */
export const getPipeCustomDateString = (date: number | string = Date.now(), format: string): string => {
    const transformDate = moment(date);
    return transformDate.format(format);
}

/**
 * @param date is dd/mm/yyyy
 * @returns date string of the type yyyy-mm-dd
 */
export const getPipeTransformDateStringPT = (date: string): string => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
}

/**
 * @param date is dd/mm/yyyy
 * @returns date string yyyy-mm-dd 00:00:00
 */
export const getPipeTransformDateStringNumber = (date: string): string => {
    return getPipeTransformDateStringPT(date) + " 00:00:00";
}

/**
 * @param date is yyyy-mm-dd hh:mm:ss
 * @returns date string DD MM. Ex: 22 Ago
 */
export const getPipeTransformDateStringExtense = (date: string): string => {
    const getDate = moment(date);
    return getDate.locale("pt-br").format("DD MMM")
}

/**
 * @param date is yyyy-mm-dd
 * @returns error string array
 */
export const validateDateString = (date: string): string[] => {
    const erros = [];
    const [year, month, day] = date.split("-");

    if (parseInt(day) > 31) erros.push("Dia inválido")
    if (parseInt(month) > 12 || parseInt(month) < 1) erros.push("Mês inválido")
    if (parseInt(year) > 2030 || parseInt(year) < 1980) erros.push("Ano inválido. Escolha entre 1980 e 2030")

    return erros;
}