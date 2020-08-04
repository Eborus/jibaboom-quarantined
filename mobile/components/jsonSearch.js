import React, { Component } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class JsonRequestorView extends Component {
    state = {
        requestUrl: {},
        startTime: '',
        endTime: '',
    }
    constructor(props) {
        super(props);
        this.updateStartTime = this.updateStartTime.bind(this);
        this.updateEndTime = this.updateEndTime.bind(this);
        this.onSearchGet = this.onSearchGet.bind(this);
    }
    updateStartTime(changedText) {
        this.setState({ startTime: changedText });
    }
    updateEndTime(changedText) {
        this.setState({ endTime: changedText });
    }
    onSearchGet() {
        this.props.onSearchGet(`http://192.168.1.21:3000/performance/data?dataType=0&festivalId=&startTime=${this.state.startTime}&endTime=${this.state.endTime}&page=0&pageSize=999&maxEntries=0`);
    }
    render() {
        return (
            <View>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <TextInput onChangeText={this.updateStartTime} style={styles.textInput} />
                    </View>
                    <View style={styles.row}>
                        <TextInput onChangeText={this.updateEndTime} style={styles.textInput} />
                    </View>
                </View>
                <TouchableOpacity onPress={this.onSearchGet} style={styles.appButtonContainer}>
                    <Text style={styles.appButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#945104',
    },
    appButtonContainer: {
        backgroundColor: "#945104",
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 25,
        color: "#999999",
        fontWeight: "bold",
        alignSelf: "center",
    },
    textInput: {
        color: '#999999',
        fontSize: 20,
        borderColor: 'white',
        borderWidth: 5,
        paddingHorizontal: 12,
    },
    row: {
        flexDirection: 'row',
        alignSelf: 'stretch'
    },
    filler: {
        alignSelf: "center"
    }
});
