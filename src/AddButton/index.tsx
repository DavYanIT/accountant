import React, {
    useState,
    useEffect,
    useImperativeHandle,
    forwardRef,
    useRef,
} from "react";
import { TouchableOpacity, Animated, View } from "react-native";
import { styles } from "./styles";

type AddButtonProps = {
    onPress: (isOpen: boolean) => void;
};

type AddButtonRef = {
    open: () => void;
    close: () => void;
};

const AddButton = forwardRef<AddButtonRef, AddButtonProps>(
    ({ onPress }, ref) => {
        const [opened, setOpened] = useState(false);
        const deg1 = useRef(new Animated.Value(0)).current;

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
                style={styles.container}
                onPress={() => {
                    onPress(!opened);
                    setOpened(!opened);
                }}
            >
                <View style={styles.plusWrapper}>
                    <Animated.View
                        style={[
                            styles.plus,
                            { transform: [{ rotate: spin1 }] },
                        ]}
                    />
                    <Animated.View
                        style={[
                            styles.plus,
                            { transform: [{ rotate: spin2 }] },
                        ]}
                    />
                </View>
            </TouchableOpacity>
        );
    }
);

export default AddButton;
