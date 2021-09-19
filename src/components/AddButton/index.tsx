import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from "react";
import {
    TouchableOpacity,
    Animated,
    LayoutAnimation,
    Keyboard,
    Dimensions,
} from "react-native";
import { View } from "../Themed";
import useThemedStyles from "../../hooks/useThemedStyles";
import { addButtonStyles, buttonSize } from "./styles";

const { height: viewportHeight } = Dimensions.get("window");

type AddButtonProps = {
    onPress: (isOpen: boolean) => void;
};

type AddButtonRef = {
    open: () => void;
    close: () => void;
};

const AddButton = forwardRef<AddButtonRef, AddButtonProps>(({ onPress }, ref) => {
    const [opened, setOpened] = useState(false);
    const deg1 = useRef(new Animated.Value(0)).current;
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const styles = useThemedStyles(addButtonStyles);

    useImperativeHandle(
        ref,
        () => ({
            open() {
                setOpened(true);
            },
            close() {
                setOpened(false);
            },
        }),
        []
    );

    useEffect(() => {
        Animated.timing(deg1, {
            toValue: Number(opened),
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [opened]);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", (event) => {
            LayoutAnimation.spring();
            setKeyboardHeight(event.endCoordinates.height);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", (event) => {
            LayoutAnimation.spring();
            // onPress(false);
            // setOpened(false);
            setKeyboardHeight(0);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const spin1 = deg1.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "225deg"],
    });

    const spin2 = deg1.interpolate({
        inputRange: [0, 1],
        outputRange: ["90deg", "315deg"],
    });

    return (
        <TouchableOpacity
            style={[
                styles.positionStyle,
                styles.viewStyle,
                { top: viewportHeight - keyboardHeight - buttonSize - 16 },
            ]}
            onPress={() => {
                onPress(!opened);
                setOpened(!opened);
            }}
        >
            <View style={[styles.plusWrapper, styles.viewStyle]}>
                <Animated.View style={[styles.plus, { transform: [{ rotate: spin1 }] }]} />
                <Animated.View style={[styles.plus, { transform: [{ rotate: spin2 }] }]} />
            </View>
        </TouchableOpacity>
    );
});

export default AddButton;
