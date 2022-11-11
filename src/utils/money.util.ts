/**
 * 
 * @param money is money string
 * @returns money number with two decimal places
 */
export const getPipeMoneyNumber = (money: string): number => {
    const moneyNumbers = money.replace(",", ".").replace(/[^0-9\.]/g, '');
    return decimalAdjust('round', parseFloat(moneyNumbers), -2)
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