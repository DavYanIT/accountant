import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { dayToKey, formatedDate, getJSON, setJSON } from "../helpers";

import type { DaySpends, Spend } from "../types";

export async function addSpend(spend: Spend, day?: string) {
    try {
        // const today = formatedDate();
        const today = formatedDate(day);
        // const today = formatedDate(new Date("08/20/2021"));
        const todaySpends = (await getJSON(dayToKey(today))) as DaySpends;

        if (!todaySpends.day) {
            todaySpends.day = today;
            todaySpends.spends = [];
            todaySpends.dayTotal = 0;
        }

        todaySpends.spends.push(spend);
        todaySpends.dayTotal = todaySpends.spends.reduce(
            (prev, curr) => prev + curr.howMuch,
            0
        );

        await setJSON(dayToKey(today), todaySpends);
        // sleep(1000);
        return todaySpends;
    } catch (err) {
        console.log("The Error", err);
        // saving error
    }
}

export function getSpends(day: string) {
    return getJSON(dayToKey(day));
}

export async function getAllData(): Promise<Array<DaySpends>> {
    const allKeys = await AsyncStorage.getAllKeys();
    const dayKeys = allKeys.filter((item) => item.startsWith("DAY_ITEM:"));
    dayKeys.sort((a, b) => (a > b ? 1 : -1));

    return await Promise.all(dayKeys.map(getJSON));
}

export async function removeSpend(id: number, day: string) {
    const daySpends = (await getJSON(dayToKey(day))) as DaySpends;

    const spendIndex = daySpends.spends.findIndex((spend) => spend.id === id);

    if (spendIndex === -1) {
        throw new Error("Not found!");
    }

    daySpends.spends.splice(spendIndex, 1);
    daySpends.dayTotal = daySpends.spends.reduce(
        (prev, curr) => prev + curr.howMuch,
        0
    );
    await setJSON(dayToKey(day), daySpends);
    return daySpends;
}

// HELPER SCRIPTS

function removeDataForDay(day?: moment.MomentInput) {
    console.log("removeDataForDay for", day);
    AsyncStorage.removeItem(dayToKey(day));
}
// removeDataForDay("22 Aug 2021");

async function recalculateTotal() {
    const data = await getAllData();
    data.forEach(async (day) => {
        day.dayTotal = day.spends.reduce(
            (prev, curr) => prev + curr.howMuch,
            0
        );
        await setJSON(dayToKey(day.day), day);
    });
}

// data.forEach(async dayItem => {
//     for (const spend of dayItem.spends) {
//         await addSpend({
//             id: Date.now(),
//             ...spend,
//         }, dayItem.day);
//         await sleep(1500);
//         console.log(dayItem.day, spend.howMuch, spend.forWhat);
//     }
// })

// recalculateTotal()
