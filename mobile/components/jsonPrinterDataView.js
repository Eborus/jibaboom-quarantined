import React, { Component } from "react"
import { View, Text, StyleSheet } from 'react-native';

export default class jsonPrinterDataView extends Component {
    render() {
        const array = this.props.json;
        console.log(this.props.json);
        let lineNumber = 1;
        let rows;
        if (array.error) {
            rows = (<View><Text>{array.error}</Text></View>);
        } else {
            rows = array.result.map((val, key) => (
                <View style={style.row} key={lineNumber}>
                    <Text style={style.lineNumber}>{lineNumber++}</Text>
                    <Text style={style.resultContent}>{val.performance_id}   ,      {val.starttime}       ,      {val.endtime}      ,         {val.popularity}</Text>
                </View>
            ))
        }
        return (
            <View>
                <Text style={style.title} >{this.props.title}</Text>
                <View>
                    <View style={style.row} key={lineNumber}>
                            <Text style={style.lineNumber}>{lineNumber++}</Text>
                            <Text style={style.lineContent}>Performance Id  ,  Start Time  ,  End Time  ,  Popularity  </Text>
                        </View>
                    {rows}
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
        color: '#999999'
    },
    resultContent: {
        flex: 9,
        padding: 5,
        paddingLeft: 20,
        color: '#999999'
    }
});