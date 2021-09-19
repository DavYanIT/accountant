import React from "react";
import { Text, View } from "../Themed";
import { headerStyles } from "./styles";
import useThemedStyles from "../../hooks/useThemedStyles";

const Header: React.FC = ({ children }) => {
    const styles = useThemedStyles(headerStyles);

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <Text style={styles.text}>{children}</Text>
            </View>
        </View>
    );
};

export default Header;
