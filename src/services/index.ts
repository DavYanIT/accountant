import { formatedDate, getDaysTillNow, getJSON, setJSON } from "../helpers";

import type { DaySpends, Spend } from "../types";

export async function addSpend(spend: Spend, day?: string) {
    const today = formatedDate(day);
    const todaySpends = ((await getJSON(today)) || {}) as DaySpends;

    if (!todaySpends.day) {
        todaySpends.day = today;
        todaySpends.spends = [];
        todaySpends.dayTotal = 0;
    }

    todaySpends.spends.push(spend);
    todaySpends.dayTotal = todaySpends.spends.reduce((prev, curr) => prev + curr.howMuch, 0);

    await setJSON(today, todaySpends);
    return todaySpends;
}

export async function updateSpend(spend: Spend, day?: string) {
    const formatedDay = formatedDate(day);
    const daySpends = (await getJSON(formatedDay)) as DaySpends;

    const spendIndex = daySpends.spends.findIndex((item) => item.id === spend.id);

    daySpends.spends.splice(spendIndex, 1, spend);
    daySpends.dayTotal = daySpends.spends.reduce((prev, curr) => prev + curr.howMuch, 0);

    await setJSON(formatedDay, daySpends);
    return daySpends;
}

export function getSpends(day: string) {
    return getJSON(day);
}

export async function getAllData(): Promise<Array<DaySpends>> {
    const daysTillNow = await getDaysTillNow();

    const data = (await Promise.all(daysTillNow.map(getJSON))) as Array<DaySpends>;

    return data.map(
        (item, index) => item || { day: daysTillNow[index], dayTotal: 0, spends: [] }
    );
}

export async function removeSpend(id: number, day: string) {
    const daySpends = (await getJSON(day)) as DaySpends;

    const spendIndex = daySpends.spends.findIndex((spend) => spend.id === id);

    if (spendIndex === -1) {
        throw new Error("Not found!");
    }

    daySpends.spends.splice(spendIndex, 1);
    daySpends.dayTotal = daySpends.spends.reduce((prev, curr) => prev + curr.howMuch, 0);
    await setJSON(day, daySpends);
    return daySpends;
}
