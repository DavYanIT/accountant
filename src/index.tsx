import React, { useState, useEffect, useRef, useReducer } from "react";
import { Dimensions, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import Page from "./Page";
import AddButton from "./AddButton";
import SpendFormModal from "./SpendFormModal";
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

    useEffect(() => {
        getAllData().then((data) => {
            dispatch({ type: "init", payload: data });
            setPageIndex(data.length - 1);
        });
    }, []);

    return (
        <View style={styles.container}>
            {!!data.length && (
                <Carousel
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
        </View>
    );
};

export default Layout;
