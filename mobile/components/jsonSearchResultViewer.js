import React, { Component } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { Picker } from '@react-native-community/picker';

export default class JsonSearchDataViewer extends Component {
    state = {
        requestUrl: {},
        festivalid: '',
        startTime: '',
        endTime: '',
        language: 'Most Performance',
        choosenIndex: 0,
    }
    constructor(props) {
        super(props);
        this.updateFestivalID = this.updateFestivalID.bind(this)
        this.onSearchGetResultViewer = this.onSearchGetResultViewer.bind(this);
        this.updateDataType = this.updateDataType.bind(this)
    }
    updateFestivalID(changedText) {
        this.setState({ festivalid: changedText });
    }
    updateDataType(itemValue, itemPosition) {
        this.setState({ language: itemValue, choosenIndex: itemPosition })
    }
    onSearchGetResultViewer() {
        if (this.state.choosenIndex == 0) {
            this.props.onSearchGetResultViewer(`http://192.168.1.131:3000/basic/result?festivalId=${this.state.festivalid}`);
        } else if (this.state.choosenIndex == 1){
            this.props.onSearchGetResultViewer(`http://192.168.1.131:3000/advance/result?festivalId=${this.state.festivalid}`)
        }   
    }
    render() {
        return (
            <View>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <Text style={styles.text}>Festival ID</Text>
                        <TextInput onChangeText={this.updateFestivalID} style={styles.textInput} />
                    </View>
                    <Picker
                        selectedValue={this.state.language}
                        style={styles.picker}
                        onValueChange={this.updateDataType}>
                        <Picker.Item label="Most Performance" value="0" />
                        <Picker.Item label="Max Popularity" value="1" />
                    </Picker>
                </View>
                <TouchableOpacity onPress={this.onSearchGetResultViewer} style={styles.appButtonContainer}>
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