import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

export const DAY_PREFIX = "DAY_ITEM:";

const toDayKey = (day: string) => (day.startsWith(DAY_PREFIX) ? day : `${DAY_PREFIX}${day}`);

export const getJSON = async (key: string) => {
    try {
        return JSON.parse((await AsyncStorage.getItem(toDayKey(key))) || "");
    } catch (_err) {
        return null;
    }
};
export const setJSON = (key: string, data: any) =>
    AsyncStorage.setItem(toDayKey(key), JSON.stringify(data));

export const formatedDate = (date: string = new Date().toISOString()) =>
    moment(new Date(date)).format("DD MMM YYYY");

/** Shall help with inserting data with script */
export const sleep = (milisec: number) =>
    new Promise((resolve) => setTimeout(resolve, milisec));

export async function getDaysTillNow() {
    const today = moment();
    const firstDay = await getFirstDay();
    const days = [moment(firstDay).format("DD MMM YYYY")];

    while (Math.floor(moment.duration(today.diff(days[days.length - 1])).asDays()) !== 0) {
        const nextDay = moment(days[days.length - 1]).add(1, "day");
        days.push(nextDay.format("DD MMM YYYY"));
    }
    return days;
}

async function getFirstDay() {
    const firstStoredDate = await AsyncStorage.getItem("FIRST_DAY_WITH_DATA");
    if (firstStoredDate) {
        return firstStoredDate;
    }
    const today = `${DAY_PREFIX}${moment().format("DD MMM YYYY")}`;
    await AsyncStorage.setItem("FIRST_DAY_WITH_DATA", today);
    return today;
}
