import React, { Component } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class JsonRequestorView extends Component {
    state = {
        requestUrl: 'Byebye'
    }
    constructor(props) {
        super(props);
        this.onTextInputChange = this.onTextInputChange.bind(this);
        this.onGetPress = this.onGetPress.bind(this);
    }
    onTextInputChange(changedText) {
        this.setState({ requestUrl: changedText })
    }
    onGetPress() {
        this.props.onGetPress(this.state.requestUrl);
    }
    render() {
        return (
            <View>
                <View style={styles.row}>
                    <Text style={styles.text}>Display</Text>
                    <TextInput onChangeText={this.onTextInputChange} style={styles.textInput} />
                    <Text style={styles.text}>Entries</Text>
                </View>
                <TouchableOpacity onPress={this.onGetPress} style={styles.appButtonContainer}>
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