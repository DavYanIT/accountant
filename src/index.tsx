import React, { useState, useEffect } from "react";
import { Dimensions, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import Page from "./Page";
import Add from "./Add";
import { addSpend, getAllData } from "./services";
import { styles } from "./styles";

import type { DaySpends } from "./types";

const { width } = Dimensions.get("window");

const Layout: React.FC = () => {
    const [data, setData] = useState<Array<DaySpends>>([]);
    const handleAdd = async (howMuch: number, forWhat: string) => {
        const result = await addSpend({
            id: Date.now(),
            howMuch,
            forWhat,
        });
        if (!result) {
            return;
        }
        const todayIndex = data.findIndex((item) => item.day === result?.day);
        if (todayIndex !== -1) {
            data.splice(todayIndex, 1, result);
        } else {
            data.push(result);
        }
        setData([...data]);
    };

    useEffect(() => {
        getAllData().then(setData);
    }, []);

    return (
        <View style={styles.container}>
            {!!data.length && (
                <Carousel
                    data={data}
                    renderItem={Page}
                    sliderWidth={width}
                    itemWidth={width}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    firstItem={(data.length || 1) - 1}
                />
            )}
            <Add onAdd={handleAdd} />
        </View>
    );
};

export default Layout;
