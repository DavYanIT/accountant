import { colors } from "../styles";

export type Spend = {
    id: number;
    howMuch: number;
    forWhat?: string;
    currency?: "dram" | "dollar";
};

export type DaySpends = {
    day: string;
    spends: Array<Spend>;
    dayTotal: number;
};

export type MainState = Array<DaySpends>;
export type MainAction =
    | { type: "upsert" | "remove"; payload: Spend & { day: string } }
    | { type: "init"; payload: MainState };

export type SpendFormModalProps = {
    dispatch: (action: MainAction) => void;
};

export type SpendFormModalRef = {
    open(state?: FormValues): void;
    close(): void;
};

export type FormValues = {
    id?: number;
    day?: string;
    howMuch?: string;
    forWhat?: string;
};

export type ModalState = {
    styles: {
        height: number;
        width: number;
        bottom?: number;
        top?: number;
    };
    open: boolean;
} & Partial<FormValues>;

export type ModalStateReducer = (
    state: ModalState,
    action: { type: "hide" } | { type: "show" | "update.form"; payload: Partial<FormValues> }
) => ModalState;

export type ColorsType = typeof colors.light | typeof colors.dark;
