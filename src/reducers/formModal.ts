import { Dimensions } from "react-native";
import type { ModalStateReducer } from "../types";

const { width: viewportWidth } = Dimensions.get("window");

const modalHeight = 200;

export const formModalInitialState = {
    styles: {
        height: 0,
        width: 0,
        bottom: -(modalHeight + 1),
    },
    open: false,
};

export const formModalReducer: ModalStateReducer = (prevState, action) => {
    switch (action.type) {
        case "show": {
            return {
                styles: {
                    height: modalHeight,
                    width: viewportWidth - 64,
                    top: 100,
                },
                open: true,
                ...action.payload,
            };
        }
        case "hide": {
            return { ...formModalInitialState };
        }
        case "update.form": {
            return {
                ...prevState,
                ...action.payload,
            };
        }
    }
};
