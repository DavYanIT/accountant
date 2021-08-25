import React, {
    useReducer,
    useRef,
    forwardRef,
    useImperativeHandle,
} from "react";
import {
    Button,
    Dimensions,
    LayoutAnimation,
    NativeModules,
    TextInput,
    View,
} from "react-native";
import { modalStyles, formStyles } from "./styles";

const { width: viewportWidth } = Dimensions.get("window");

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

type SpendFormModalProps = {
    onSave: (howMuch: number, forWhat?: string) => void;
    onRemove: (id: number, day: string) => void;
};

type FormValues = {
    id?: number;
    day?: string;
    howMuch: string;
    forWhat: string;
};

type ModalState = {
    styles: {
        height: number;
        width: number;
        bottom?: number;
        top?: number;
    };
    open: boolean;
} & Partial<FormValues>;

type ModalStateReducer = (
    state: ModalState,
    action:
        | { type: "hide" }
        | { type: "show" | "update.form"; payload: Partial<FormValues> }
) => ModalState;

const modalHeight = 200;

const initialState = {
    styles: {
        height: 0,
        width: 0,
        bottom: -(modalHeight + 1),
    },
    open: false,
};

const modalStateReducer: ModalStateReducer = (prevState, action) => {
    switch (action.type) {
        case "show": {
            LayoutAnimation.spring();
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
            LayoutAnimation.spring();
            return { ...initialState };
        }
        case "update.form": {
            return {
                ...prevState,
                ...action.payload,
            };
        }
    }
};

const SpendFormModal = forwardRef<any, SpendFormModalProps>((props, ref) => {
    const forWhatRef = useRef({} as TextInput);
    const [modalState, dispatch] = useReducer<ModalStateReducer>(
        modalStateReducer,
        initialState
    );

    const close = () => {
        dispatch({ type: "hide" });
    };

    useImperativeHandle(
        ref,
        () => ({
            open(state: FormValues) {
                dispatch({ type: "show", payload: state });
            },
            close,
        }),
        [modalState.open]
    );

    const handleSave = () => {
        props.onSave(Number(modalState.howMuch), modalState.forWhat);
        close();
    };

    const handleRemove = () => {
        if (!modalState.id || !modalState.day) {
            return;
        }
        props.onRemove(modalState.id, modalState.day);
    };

    const formValueUpdater = (key: keyof FormValues) => (value: string) => {
        dispatch({ type: "update.form", payload: { [key]: value } });
    };

    return (
        <View style={[modalState.styles, modalStyles.container]}>
            {!!modalState.open && (
                <View style={formStyles.container}>
                    <View style={formStyles.formItem}>
                        <TextInput
                            placeholder="How much"
                            value={modalState.howMuch}
                            onChangeText={formValueUpdater("howMuch")}
                            style={formStyles.input}
                            keyboardType="numeric"
                            returnKeyType="next"
                            onSubmitEditing={() => forWhatRef.current.focus()}
                        />
                    </View>
                    <View style={formStyles.formItem}>
                        <TextInput
                            ref={forWhatRef}
                            placeholder="For what"
                            value={modalState.forWhat}
                            onChangeText={formValueUpdater("forWhat")}
                            style={formStyles.input}
                            onSubmitEditing={handleSave}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}
                    >
                        <Button title="Save" onPress={handleSave} />
                        {!!modalState.id && (
                            <Button
                                title="Delete"
                                onPress={handleRemove}
                                color="red"
                            />
                        )}
                    </View>
                </View>
            )}
        </View>
    );
});

export default SpendFormModal;
