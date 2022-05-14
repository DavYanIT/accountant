import React, { useReducer, useRef, forwardRef, useImperativeHandle } from "react";
import { Button, LayoutAnimation, NativeModules, TextInput, View } from "react-native";
import { formModalInitialState, formModalReducer } from "../../reducers";
import { modalStyles, formStyles } from "./styles";

import type {
    FormValues,
    ModalStateReducer,
    SpendFormModalProps,
    SpendFormModalRef,
} from "../../types";
import useThemedStyles from "../../hooks/useThemedStyles";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

const SpendFormModal = forwardRef<SpendFormModalRef, SpendFormModalProps>((props, ref) => {
    const forWhatRef = useRef({} as TextInput);
    const [modalState, dispatch] = useReducer<ModalStateReducer<FormValues>>(
        formModalReducer,
        formModalInitialState
    );
    const modalStylesThemed = useThemedStyles(modalStyles);
    const formStylesThemed = useThemedStyles(formStyles);

    const close = () => {
        LayoutAnimation.spring();
        dispatch({ type: "hide" });
    };

    useImperativeHandle(
        ref,
        () => ({
            open(state) {
                LayoutAnimation.spring();
                dispatch({ type: "show", payload: state || {} });
            },
            close,
        }),
        [modalState.open]
    );

    const dispatchMainAction = (type: "upsert" | "remove") => {
        const {
            id = Date.now(),
            howMuch: howMuchStr = "",
            forWhat = "",
            day = "",
        } = modalState;
        const howMuch = Number(howMuchStr);

        props.dispatch({ type, payload: { id, howMuch, forWhat, day } });
        close();
    };

    const formValueUpdater = (key: keyof FormValues) => (value: string) => {
        dispatch({ type: "update.form", payload: { [key]: value } });
    };

    return (
        <View style={[modalState.styles, modalStylesThemed.container]}>
            {!!modalState.open && (
                <View style={formStylesThemed.container}>
                    <View style={formStylesThemed.formItem}>
                        <TextInput
                            placeholder="How much"
                            value={modalState.howMuch}
                            autoFocus
                            onChangeText={formValueUpdater("howMuch")}
                            style={formStylesThemed.input}
                            keyboardType="numeric"
                            returnKeyType="next"
                            onSubmitEditing={() => forWhatRef.current.focus()}
                        />
                    </View>
                    <View style={formStylesThemed.formItem}>
                        <TextInput
                            ref={forWhatRef}
                            placeholder="For what"
                            value={modalState.forWhat}
                            onChangeText={formValueUpdater("forWhat")}
                            style={formStylesThemed.input}
                            onSubmitEditing={() => dispatchMainAction("upsert")}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}
                    >
                        {!!modalState.id && (
                            <Button
                                title="Delete"
                                onPress={() => dispatchMainAction("remove")}
                                color="red"
                            />
                        )}
                        <Button title="Save" onPress={() => dispatchMainAction("upsert")} />
                    </View>
                </View>
            )}
        </View>
    );
});

export default SpendFormModal;
