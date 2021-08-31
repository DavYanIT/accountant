import React from "react";
import { Text, View } from "react-native";
import { headerStyles } from "./styles";

const Header: React.FC = ({ children }) => (
    <View style={headerStyles.container}>
        <View style={headerStyles.background}>
            <Text style={headerStyles.text}>{children}</Text>
        </View>
    </View>
);

export default Header;
