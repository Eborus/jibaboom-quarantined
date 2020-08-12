import React, { Component, useState, useEffect } from "react";
import { View, SafeAreaView, ActivityIndicator, FlatList, Text, StyleSheet } from "react-native";

const basicDataUrl = 'http://192.168.1.131:3000/performance/data?dataType=0&festivalId=&startTime=&endTime=&page=0&pageSize=999&maxEntries=0'
const testURL = 'https://reactnative.dev/movies.json'

export default class DataView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSource: null,
        }
    }

    componentDidMount() {
        return fetch(basicDataUrl)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                dataSource: responseJson,
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {

        if(this.state.isLoading) {
            return(
                <View style={style.container}>
                    <ActivityIndicator />
                </View>
            )
        } else {
            let result = this.state.dataSource.result.map((val, key) => {
                return <View style={style.innerContainer} key={key}>
                        <Text style={style.text}>{val.id}</Text>
                        <Text style={style.text}>{val.performance_id}</Text>
                        <Text style={style.text}>{val.starttime}</Text>
                        <Text style={style.text}>{val.endtime}</Text>
                        <Text style={style.text}>{val.popularity}</Text>
                        </View>
            });

        return(
            <View style={style.container}>
                <View style={style.innerContainer}>
                <Text style={style.text1}>Id</Text>
                <Text style={style.text1}>Performance ID</Text>
                <Text style={style.text1}>Start Time</Text>
                <Text style={style.text1}>End Time</Text>
                <Text style={style.text1}>Popularity</Text>
                </View>
                {result}
            </View>
        );

        }
    } // End of render

}
const style = StyleSheet.create({
    text: {
        color: '#999999',
        padding: 20,
    },
    text1: {
        color: '#999999',
        padding: 5,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 100,
    },
    innerContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
});