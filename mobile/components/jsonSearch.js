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
<<<<<<< HEAD
        this.props.onSearchGet(`http://192.168.1.21:3000/performance/data?dataType=${this.state.choosenIndex}&festivalId=&startTime=${this.state.startTime}&endTime=${this.state.endTime}&page=0&pageSize=999&maxEntries=0`);
=======
        this.props.onSearchGet(`http://192.168.1.131:3000/performance/data?dataType=0&festivalId=&startTime=${this.state.startTime}&endTime=${this.state.endTime}&page=0&pageSize=999&maxEntries=0`);
>>>>>>> merged-modifications
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
                    <Picker
                        selectedValue={this.state.language}
                        style={styles.text}
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
        borderWidth: 5,
        paddingHorizontal: 12,
    },
    row: {
        flexDirection: 'row',
        alignSelf: 'stretch'
    },
    filler: {
        alignSelf: "center"
    },
    text: {
        height: 50,
        width: 250,
        color: "#999999"
    }
});
