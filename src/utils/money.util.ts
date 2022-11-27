/**
 * 
 * @param money is money string
 * @returns money number with two decimal places
 */
export const getPipeMoneyNumber = (money: string): number => {
    let moneyNoPoint = money.replace(".", "")
    const moneyNumbers = moneyNoPoint.replace(",", ".").replace(/[^0-9\.]/g, '');
    return decimalAdjust('round', parseFloat(moneyNumbers), -2)
}

/**
 * 
 * @param money is money number
 * @returns money string 0,00
 */
export const getPipeMoneyString = (money: number | undefined): string => {
    if (!money) return "0,00"
    return money.toFixed(2).replace(".", ",")
}

/**
 * @author https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/round#exemplos
 * @returns decimal rounding
 */
const decimalAdjust = (type: 'round', value: any, exp: number) => {
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}