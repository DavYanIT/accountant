import React, {
    useState,
    useEffect,
    useImperativeHandle,
    useCallback,
    forwardRef,
    useRef,
} from "react";
import { TouchableOpacity, Animated, View } from "react-native";
import { buttonStyles } from "./styles";

type AddButtonProps = {
    onPress: (isOpen: boolean) => void;
};

type AddButtonRef = {
    toggle: () => void;
};

const AddButton = forwardRef<AddButtonRef, AddButtonProps>(
    ({ onPress }, ref) => {
        const [opened, setOpened] = useState(false);
        const deg1 = useRef(new Animated.Value(0)).current;

        const toggle = useCallback(() => {
            onPress(!opened);
            setOpened(!opened);
        }, [opened]);

        useImperativeHandle(
            ref,
            () => ({
                toggle,
            }),
            [toggle]
        );

        useEffect(() => {
            Animated.timing(deg1, {
                toValue: Number(opened),
                duration: 250,
                useNativeDriver: true,
            }).start();
        }, [opened]);

        const spin1 = deg1.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "225deg"],
        });

        const spin2 = deg1.interpolate({
            inputRange: [0, 1],
            outputRange: ["90deg", "315deg"],
        });

        return (
            <TouchableOpacity style={buttonStyles.container} onPress={toggle}>
                <View style={buttonStyles.plusWrapper}>
                    <Animated.View
                        style={[
                            buttonStyles.plus,
                            { transform: [{ rotate: spin1 }] },
                        ]}
                    />
                    <Animated.View
                        style={[
                            buttonStyles.plus,
                            { transform: [{ rotate: spin2 }] },
                        ]}
                    />
                </View>
            </TouchableOpacity>
        );
    }
);

export default AddButton;
