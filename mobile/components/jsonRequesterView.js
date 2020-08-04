import React, { Component } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import JsonSearch from './jsonSearch';

export default class JsonRequestorView extends Component {
    state = {
        requestUrl: {}
    }
    constructor(props) {
        super(props);
        this.onTextInputChange = this.onTextInputChange.bind(this);
        this.onGetPress = this.onGetPress.bind(this);
    }
    onTextInputChange(changedText) {
        this.setState({ requestUrl: `http://192.168.1.21:3000/performance/data?dataType=0&festivalId=&startTime=&endTime=&page=0&pageSize=${changedText}&maxEntries=0` })
    }
    onGetPress() {
        this.props.onGetPress(this.state.requestUrl);
    }
    render() {
        return (
            <View>
                <View>
                    {/* <JsonSearch/> */}
                    <View style={styles.row}>
                        <Text style={styles.text}>Display</Text>
                        <TextInput onChangeText={this.onTextInputChange} style={styles.textInput} />
                        <Text style={styles.text}>Entries</Text>
                    </View>
                    <TouchableOpacity onPress={this.onGetPress} style={styles.appButtonContainer}>
                        <Text style={styles.appButtonText}>Search</Text>
                    </TouchableOpacity>
                </View>
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
        color: 'white',
        paddingHorizontal: 12,
        fontSize: 20,
    },
    text: {
        color: '#999999',
        fontSize: 20,
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        alignSelf: "center",
    }
});