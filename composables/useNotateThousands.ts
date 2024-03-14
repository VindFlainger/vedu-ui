export function useNotateThousands(number: number) {
    if (number === null || isNaN(number)) return "";
    return number.toLocaleString('en-US', {maximumFractionDigits: 2});
}