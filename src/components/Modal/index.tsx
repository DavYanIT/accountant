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

const SpendFormModal = forwardRef<SpendFormModalRef, { open: boolean }>((props, ref) => {
    const modalStylesThemed = useThemedStyles(modalStyles);

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
        [props.open]
    );

    return (
        <View style={[props.styles, modalStylesThemed.container]}>
            {!!props.open && props.children}
        </View>
    );
});

export default SpendFormModal;
