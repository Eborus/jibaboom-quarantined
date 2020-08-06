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
            let result = this.state.dataSource.map((val, key) => {
                return <View key={key}>
                        <Text style={style.text}>Id: {val.id} FestivalId: {val.festival_id}</Text>
                        </View>
            });

        return(
            <View style={style.container}>
                {result}
            </View>
        );

        }
    } // End of render

}
const style = StyleSheet.create({
    text: {
        color: '#999999',
    },
    container: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center",
        marginBottom: 100,
    }
});