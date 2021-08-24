import React, { useReducer, useState, useRef } from "react";
import {
    NativeModules,
    LayoutAnimation,
    Dimensions,
    Button,
    View,
    TextInput,
} from "react-native";
import AddButton from "./AddButton";

import { modalStyles } from "./styles";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

const { width: viewportWidth, height: viewportHeight } =
    Dimensions.get("window");

type AddProps = {
    onAdd: (howMuch: number, forWhat: string) => void;
};

type ModalVisibility = {
    height: number;
    width: number;
    bottom?: number;
    top?: number;
};

type ModalVisibilityReducer = (
    state: ModalVisibility,
    action: { type: "show" | "hide" }
) => ModalVisibility;

const modalHeight = 200;

const initialState = {
    height: 0,
    width: 0,
    bottom: -(modalHeight + 1),
};

const modalVisibilityReducer: ModalVisibilityReducer = (_prevState, action) => {
    switch (action.type) {
        case "show": {
            return {
                height: modalHeight,
                width: viewportWidth - 64,
                top: 100,
            };
        }
        case "hide": {
            return { ...initialState };
        }
    }
};

const Add: React.FC<AddProps> = ({ onAdd }) => {
    const [howMuch, setHowMuch] = useState<string>();
    const [forWhat, setForWhat] = useState<string>("");
    const addButtonRef = useRef({ toggle() {} });
    const howMuchRef = useRef({} as TextInput);
    const forWhatRef = useRef({} as TextInput);
    const [modalVisibility, dispatch] = useReducer<ModalVisibilityReducer>(
        modalVisibilityReducer,
        initialState
    );

    const handleSave = () => {
        onAdd(Number(howMuch), forWhat);
        addButtonRef.current.toggle();
        howMuchRef.current.blur();
        forWhatRef.current.blur();
    };

    return (
        <>
            <View style={[modalVisibility, modalStyles.container]}>
                {!!modalVisibility.height && (
                    <>
                        <View style={{ flexDirection: "row" }}>
                            <TextInput
                                ref={howMuchRef}
                                placeholder="How much"
                                value={howMuch}
                                onChangeText={setHowMuch}
                                style={modalStyles.input}
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <TextInput
                                ref={forWhatRef}
                                placeholder="For what"
                                value={forWhat}
                                onChangeText={setForWhat}
                                style={modalStyles.input}
                            />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Button title="Add" onPress={handleSave} />
                        </View>
                    </>
                )}
            </View>
            <AddButton
                ref={addButtonRef}
                onPress={(isOpen) => {
                    LayoutAnimation.spring();
                    dispatch({ type: isOpen ? "show" : "hide" });
                }}
            />
        </>
    );
};

export default Add;
