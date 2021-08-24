import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

export const getJSON = async (key: string) =>
    JSON.parse((await AsyncStorage.getItem(key)) || "{}");
export const setJSON = (key: string, data: any) =>
    AsyncStorage.setItem(key, JSON.stringify(data));

export const formatedDate = (date: moment.MomentInput = new Date()) =>
    moment(date).format("DD MMM YYYY");

export const dayToKey = (day: moment.MomentInput) => `DAY_ITEM:${day}`;

/** Shall help with inserting data with script */
export const sleep = (milisec: number) =>
    new Promise((resolve) => setTimeout(resolve, milisec));
