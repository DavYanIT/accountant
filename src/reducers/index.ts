import { getDaysTillNow, getJSON } from "../helpers";

import type { DaySpends } from "../types";

export async function getAllData(): Promise<Array<DaySpends>> {
    const daysTillNow = await getDaysTillNow();

    const data = (await Promise.all(daysTillNow.map(getJSON))) as Array<DaySpends>;

    return data.map(
        (item, index) => item || { day: daysTillNow[index], dayTotal: 0, spends: [] }
    );
}

export { mainReducer } from "./main";
export { formModalReducer, formModalInitialState } from "./formModal";
