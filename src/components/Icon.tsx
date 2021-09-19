import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

type IconOfType =
    | {
          name: React.ComponentProps<typeof FontAwesome>["name"];
          color: string;
          iconSet: "FontAwesome";
      }
    | {
          name: React.ComponentProps<typeof Feather>["name"];
          color: string;
          iconSet: "Feather";
      }
    | {
          name: React.ComponentProps<typeof Ionicons>["name"];
          color: string;
          iconSet: "Ionicons";
      }
    | {
          name: React.ComponentProps<typeof AntDesign>["name"];
          color: string;
          iconSet?: "AntDesign";
      };

export default function Icon(
    props: Omit<React.ComponentProps<typeof FontAwesome>, "name"> & IconOfType
) {
    switch (props.iconSet) {
        case "FontAwesome": {
            return <FontAwesome {...props} />;
        }
        case "Feather": {
            return <Feather {...props} />;
        }
        case "Ionicons": {
            return <Ionicons {...props} />;
        }
        default: {
            return <AntDesign {...props} />;
        }
    }
}
