import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllData } from ".";
import { setJSON, DAY_PREFIX } from "../helpers";

async function logAllDataJSON() {
    const allData = await getAllData();
    console.log(JSON.stringify(allData, null, 2));
}

// logAllDataJSON()

function removeDataForDay(day?: any) {
    console.log("removeDataForDay for", day);
    AsyncStorage.removeItem(day);
}
// removeDataForDay(DAY_PREFIX+"Invalid date");

async function recalculateTotal() {
    const data = await getAllData();
    data.forEach(async (day) => {
        day.dayTotal = day.spends.reduce((prev, curr) => prev + curr.howMuch, 0);
        await setJSON(day.day, day);
    });
}
