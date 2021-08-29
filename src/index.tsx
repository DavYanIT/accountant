import React, { useState, useEffect, useRef } from "react";
import { Alert, Dimensions, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import Page from "./Page";
import AddButton from "./AddButton";
import SpendFormModal from "./SpendFormModal";
import { addSpend, getAllData, removeSpend, updateSpend } from "./services";
import { styles } from "./styles";

import type { DaySpends, Spend } from "./types";
import type { SpendFormModalRef } from "./SpendFormModal";

const { width } = Dimensions.get("window");

const Layout: React.FC = () => {
    const [data, setData] = useState<Array<DaySpends>>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const addButtonRef = useRef({ open() {}, close() {} });
    const spendFormRef = useRef({} as SpendFormModalRef);

    const handleAdd = async (howMuch: number, forWhat: string, day: string) => {
        if (!howMuch) {
            Alert.alert("Invalid data!", "Spend sum is required");
            return;
        }
        const result = await addSpend(
            {
                id: Date.now(),
                howMuch,
                forWhat,
            },
            day
        );
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
        spendFormRef.current.close();
        addButtonRef.current.close();
    };

    const handleRemove = async (id: number, day: string) => {
        const result = await removeSpend(id, day);
        const todayIndex = data.findIndex((item) => item.day === result?.day);
        data.splice(todayIndex, 1, result);
        setData([...data]);
        spendFormRef.current.close();
        addButtonRef.current.close();
    };

    const handleUpdate = async (spend: Spend, day: string) => {
        const result = await updateSpend(spend, day);
        const todayIndex = data.findIndex((item) => item.day === result?.day);
        if (!result) {
            return;
        }
        data.splice(todayIndex, 1, result);
        setData([...data]);
        spendFormRef.current.close();
        addButtonRef.current.close();
    };

    useEffect(() => {
        getAllData().then((data) => {
            setData(data);
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
                onSave={handleAdd}
                onRemove={handleRemove}
                onUpdate={handleUpdate}
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
