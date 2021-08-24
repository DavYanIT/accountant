export type Spend = {
    id: number;
    howMuch: number;
    forWhat: string;
    currency?: "dram" | "dollar";
};

export type DaySpends = {
    day: string;
    spends: Array<Spend>;
    dayTotal: number;
};
