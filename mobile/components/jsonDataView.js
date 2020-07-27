import React, { Component } from "react";
import { View } from "react-native";

export default class DataView extends Component {
    state = {
        basicDataUrl: 'http://localhost:3000/performance/data'
    }

    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this)
    }
    getData(basicDataUrl) {
        fetch(basicDataUrl)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    render() {
        return (
            <View>
                <View getData={this.getData}></View>
            </View>
        )
    }
}