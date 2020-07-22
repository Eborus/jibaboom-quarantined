import React, { Component } from "react"
import { View, Text, StyleSheet } from 'react-native';

export default class JsonPrinterView extends Component {
    render() {
        const array = JSON.stringify(this.props.json, null, 4).split('\n');
        let lineNumber = 1;
        return (
            <View>
                <Text style={style.title} >{this.props.title}</Text>
                <View>
                    {array.map(str => (
                        <View style={style.row} key={lineNumber}>
                            <Text style={style.lineNumber}>{lineNumber++}</Text>
                            <Text style={style.lineContent}>{str}</Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#999999',
    },
    row: {
        flexDirection: 'row',
    },
    lineNumber: {
        flex: 1,
        textAlign: 'center',
        backgroundColor: '#CCC',
        padding: 5,
    },
    lineContent: {
        flex: 9,
        padding: 5,
    },
});