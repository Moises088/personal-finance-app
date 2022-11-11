/**
 * 
 * @param date is date number
 * @returns date string of the type yyyy-mm-dd hh:mm:ss
 */
export const getPipeDateString = (date: number = Date.now()): string => {
    return new Date(date).toLocaleString('sv');
}