import React, { Component } from "react"
import { TextField, InputField, Button, View } from 'react-native';

const url = 'http://10.0.2.2:3000/performance/data/'

export default class JsonSearch extends Component {
    constructor() {
        state = {
            festivalId: 0,
            startTime: '',
            endTime: '',
            error: null,
        }
        this.updateFestivalId = this.updateFestivalId.bind(this);
    }
    updateFestivalId(festivalId) {
        this.setState({ festivalId: festivalId });
    }
    submitForm() {
        url += `festivalId=${this.state.festivalId}&startTime=${this.state.startTime}`;
        fetch(url)
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(error => this.setState({ error }))
    }
    render() {
        return (
            <View>
                <TextField>ERROR! {JSON.stringify(this.state.error)}</TextField>
                <InputField onChange={this.updateFestivalId}></InputField>
                <Button onClick={this.submitForm}>Submit</Button>
            </View>
        )
    }
}
adfasdfsdfs