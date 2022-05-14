import React, { useState, useEffect, useRef, useReducer } from "react";
import { Dimensions } from "react-native";
import { View } from "./components/Themed";
import Carousel from "react-native-snap-carousel";
import Page from "./components/Page";
import AddButton from "./components/AddButton";
import SpendFormModal from "./components/SpendFormModal";
// import BackTodayIcon from "./components/BackTodayIcon";
import { getAllData, mainReducer } from "./reducers";
import { styles } from "./styles";

import type { MainAction, MainState, SpendFormModalRef } from "./types";

const { width } = Dimensions.get("window");

const Layout: React.FC = () => {
    const [data, dispatch] = useReducer<(state: MainState, action: MainAction) => MainState>(
        mainReducer,
        []
    );
    const [pageIndex, setPageIndex] = useState(0);
    const addButtonRef = useRef({ open() {}, close() {} });
    const spendFormRef = useRef({} as SpendFormModalRef);
    // const carouselRef = useRef({} as Carousel<DaySpends>);

    useEffect(() => {
        getAllData().then((data) => {
            // const sumForWeeks: Array<number> = [];
            // for (const dayIndex in data) {
            //     const weekIndex = Math.floor((data.length - 1 - Number(dayIndex)) / 7);
            //     console.log(weekIndex, 'weekIndex')
            //     if (!sumForWeeks[weekIndex]) {
            //         sumForWeeks[weekIndex] = 0
            //     }
            //     sumForWeeks[weekIndex] += data[dayIndex].dayTotal;
            // }
            // console.log(sumForWeeks, 'sumForWeeks')
            dispatch({ type: "init", payload: data });
            setPageIndex(data.length - 1);
        });
    }, []);

    return (
        <View style={styles.container}>
            {!!data.length && (
                <Carousel
                    // ref={carouselRef}
                    data={data}
                    renderItem={({ item }) => (
                        <Page
                            item={item}
                            onCardPress={(spend, day) => {
                                addButtonRef.current.open();
                                spendFormRef.current.open({
                                    ...spend,
                                    howMuch: String(spend.howMuch),
                                    day,
                                });
                            }}
                        />
                    )}
                    sliderWidth={width}
                    itemWidth={width}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    onSnapToItem={setPageIndex}
                    firstItem={data.length - 1}
                    initialScrollIndex={data.length - 1}
                />
            )}
            <SpendFormModal
                ref={spendFormRef}
                dispatch={(action) => {
                    addButtonRef.current.close();
                    dispatch(action);
                }}
            />
            <AddButton
                ref={addButtonRef}
                onPress={(isOpen) => {
                    if (isOpen) {
                        spendFormRef.current.open({ day: data[pageIndex].day });
                    } else {
                        spendFormRef.current.close();
                    }
                }}
            />
            {/* <BackTodayIcon onPress={() => carouselRef.current.snapToItem(data.length - 1)} /> */}
        </View>
    );
};

export default Layout;
