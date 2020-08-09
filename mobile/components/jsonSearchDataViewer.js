import React, { Component } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { Picker } from '@react-native-community/picker';

export default class JsonSearchDataViewer extends Component {
    state = {
        requestUrl: {},
        festivalid: '',
        startTime: '',
        endTime: '',
        language: 'All',
        choosenIndex: 0,
    }
    constructor(props) {
        super(props);
        this.updateFestivalID = this.updateFestivalID.bind(this)
        this.updateStartTime = this.updateStartTime.bind(this);
        this.updateEndTime = this.updateEndTime.bind(this);
        this.onSearchGet = this.onSearchGet.bind(this);
        this.updateDataType = this.updateDataType.bind(this)
    }
    updateFestivalID(changedText) {
        this.setState({ festivalid: changedText });
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
        this.props.onSearchGet(`http://192.168.1.131:3000/performance/data?dataType=${this.state.choosenIndex}&festivalId=${this.state.festivalid}&startTime=${this.state.startTime}&endTime=${this.state.endTime}&page=0&pageSize=999&maxEntries=0`);
    }
    render() {
        return (
            <View>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <Text style={styles.text}>Festival ID</Text>
                        <TextInput onChangeText={this.updateFestivalID} style={styles.textInput} />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Start Time</Text>
                        <TextInput onChangeText={this.updateStartTime} style={styles.textInput} />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>End Time</Text>
                        <TextInput onChangeText={this.updateEndTime} style={styles.textInput} />
                    </View>
                </View>
                <Picker
                    selectedValue={this.state.language}
                    style={styles.picker}
                    onValueChange={this.updateDataType}>
                    <Picker.Item label="All" value="0" />
                    <Picker.Item label="Basic" value="1" />
                    <Picker.Item label="Advanced" value="2" />
                </Picker>
                <TouchableOpacity onPress={this.onSearchGet} style={styles.appButtonContainer}>
                    <Text style={styles.appButtonText}>Filter</Text>
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
        fontSize: 15,
        borderColor: 'white',
        borderWidth: 2,
        width: 43,
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
        fontSize: 15,
        alignSelf: "center",
    },
    text: {
        color: "#999999",
        alignSelf: "center",
        marginHorizontal: 10,
        fontSize: 15,
    }
});