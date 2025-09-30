// utils/numberFormat.ts
export function formatCurrency(amount: number | string, suffix: string = "so'm") {
    if (!amount) return "0 " + suffix;

    return (
        Number(amount)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " " + suffix
    );
}
