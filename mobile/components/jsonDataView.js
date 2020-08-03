import React, { Component, useState, useEffect } from "react";
import { View, SafeAreaView, ActivityIndicator, FlatList, Text, StyleSheet, ScrollView } from "react-native";

const basicDataUrl = 'http://192.168.1.21:3000/performance/data?dataType=0&festivalId=&startTime=&endTime=&page=0&pageSize=999&maxEntries=0'
const testURL = 'https://reactnative.dev/movies.json'

export default DataView = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(basicDataUrl)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View style={style.itemcontainer}>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList style={style.text}
                    data={data}
                    initialNumToRender={data.length}
                    keyExtractor={({ id }, index) => id.toString()}
                    renderItem={({ item, }) => (
                    <View style={style.items}>
                    <Text style={style.itemText}>{item.id}, {item.festival_id}, {item.starttime}</Text>
                    </View>
                    )}
                />
            )}
        </View>
    );
};
const style = StyleSheet.create({
    text: {
        color: '#999999'
    },
    itemcontainer: {
        marginTop: 20,
        marginBottom: 8
    },
    items: {
        borderBottomColor: '#bfbfbf',
        borderBottomWidth: 1,
        marginBottom: 10
    },
    itemText: {
        color: '#999999',
        fontSize: 16,
        padding: 5
    }
});