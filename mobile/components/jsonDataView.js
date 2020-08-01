import React, { Component, useState, useEffect } from "react";
import { View, SafeAreaView, ActivityIndicator, FlatList, Text, StyleSheet } from "react-native";

const basicDataUrl = 'http://10.0.2.2:3000/performance/data'
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
        <View style={{ flex: 1, padding: 24 }}>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList style={style.text}
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <Text style={style.text}>{item.id}, {item.festival_id}</Text>
                    )}
                />
            )}
        </View>
    );
};
const style = StyleSheet.create({
    text: {
        color: '#999999',
    },
});