import { formatedDate, setJSON, cloneDeep } from "../helpers";
import { showMessage } from "react-native-flash-message";

import type { MainAction, MainState } from "../types";

export function mainReducer(_state: MainState, action: MainAction) {
    if (action.type === "init") {
        return action.payload;
    }
    const state = cloneDeep(_state);
    const { day, ...spend } = action.payload;

    let index = state.findIndex((item) => item.day === day);
    if (index === -1) {
        index = state.length;
    }

    const daySpends = state[index] || { day: formatedDate(day), spends: [], dayTotal: 0 };

    switch (action.type) {
        case "upsert": {
            if (!spend.howMuch) {
                showMessage({
                    message: "Invalid data!",
                    description: "Spend sum is required",
                    type: "danger",
                });
                return _state;
            }
            let spendIndex = daySpends.spends.findIndex((item) => item.id === spend.id);
            if (spendIndex === -1) {
                spendIndex = daySpends.spends.length;
            }
            daySpends.spends[spendIndex] = spend;
            break;
        }
        case "remove": {
            const spendIndex = daySpends.spends.findIndex((item) => item.id === spend.id);
            if (spendIndex === -1) {
                showMessage({
                    message: "Not Found!",
                    description: "Please reload the app and try again",
                    type: "warning",
                });
                return _state;
            }
            daySpends.spends.splice(spendIndex, 1);
            break;
        }
    }
    daySpends.dayTotal = daySpends.spends.reduce((prev, curr) => prev + curr.howMuch, 0);
    state[index] = daySpends;
    setJSON(daySpends.day, daySpends);
    return state;
}
