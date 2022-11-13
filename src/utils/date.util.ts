/**
 * 
 * @param date is date number
 * @param time if false returns date without time
 * @returns date string of the type yyyy-mm-dd hh:mm:ss
 */
export const getPipeDateTimeString = (date: number = Date.now(), time: boolean = true): string => {
    const transformDate = new Date(date);

    const day = String(transformDate.getDate()).padStart(2, "0");
    const month = String(transformDate.getMonth() + 1).padStart(2, "0");
    const hours = String(transformDate.getHours()).padStart(2, "0");
    const minutes = String(transformDate.getMinutes()).padStart(2, "0");
    const seconds = String(transformDate.getSeconds()).padStart(2, "0");

    if (!time) return `${transformDate.getFullYear()}-${month}-${day}`;

    return `${transformDate.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 
 * @param date is date number
 * @returns date string of the type dd/mm/yyyy
 */
export const getPipeDateStringPT = (date: number = Date.now()): string => {
    const onlyDate = getPipeDateTimeString(date, false);
    const [year, month, day] = onlyDate.split("-");

    return `${day}/${month}/${year}`;
}

/**
 * 
 * @param date is dd/mm/yyyy
 * @returns date string of the type yyyy-mm-dd
 */
export const getPipeTransformDateStringPT = (date: string): string => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
}

/**
 * 
 * @param date is dd/mm/yyyy
 * @returns date string yyyy-mm-dd 00:00:00
 */
export const getPipeTransformDateStringNumber = (date: string): string => {
    return getPipeTransformDateStringPT(date) + " 00:00:00";
}

/**
 * 
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