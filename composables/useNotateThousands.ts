export function useNotateThousands(number: number | string) {
    if (number === null || isNaN(Number(number))) return "";
    return Number(number).toLocaleString('en-US', { maximumFractionDigits: 2 });
}