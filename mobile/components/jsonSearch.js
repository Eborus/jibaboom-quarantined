import React, { Component } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { Picker } from '@react-native-community/picker';

export default class JsonRequestorView extends Component {
    state = {
        requestUrl: {},
        startTime: '',
        endTime: '',
        language: 'All',
        choosenIndex: 0,
    }
    constructor(props) {
        super(props);
        this.updateStartTime = this.updateStartTime.bind(this);
        this.updateEndTime = this.updateEndTime.bind(this);
        this.onSearchGet = this.onSearchGet.bind(this);
        this.updateDataType = this.updateDataType.bind(this)
    }
    updateStartTime(changedText) {
        this.setState({ startTime: changedText });
    }
    updateEndTime(changedText) {
        this.setState({ endTime: changedText });
    }
    updateDataType(itemValue, itemPosition) {
        this.setState({ language: itemValue, choosenIndex: itemPosition })
    }
    onSearchGet() {
        this.props.onSearchGet(`http://192.168.1.21:3000/performance/data?dataType=${this.state.choosenIndex}&festivalId=&startTime=${this.state.startTime}&endTime=${this.state.endTime}&page=0&pageSize=999&maxEntries=0`);
    }
    render() {
        return (
            <View>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <Text style={styles.text}>Start Time</Text>
                        <TextInput onChangeText={this.updateStartTime} style={styles.textInput} />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>End Time</Text>
                        <TextInput onChangeText={this.updateEndTime} style={styles.textInput} />
                    </View>
                    <Picker
                        selectedValue={this.state.language}
                        style={styles.picker}
                        onValueChange={this.updateDataType}>
                        <Picker.Item label="All" value="0" />
                        <Picker.Item label="Basic" value="1" />
                        <Picker.Item label="Advanced" value="2" />
                    </Picker>
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
        borderWidth: 2,
        width: 53,
    },
    row: {
        flexDirection: 'row',
    },
    filler: {
        alignSelf: "center"
    },
    picker: {
        height: 50,
        width: 250,
        color: "#999999",
        fontSize: 20,
        alignSelf: "center",
    },
    text: {
        color: "#999999",
        alignSelf: "center",
        marginHorizontal: 10,
        fontSize: 20,
    }
});