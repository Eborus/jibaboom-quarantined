import React, { Component } from "react"
import { TextField, InputField, Button, View } from 'react-native';

const url = 'http://192.168.1.21:3000/performance/data?dataType=0&festivalId=&startTime=&endTime=&page=0&pageSize=999&maxEntries=0'

export default class JsonSearch extends Component {
    constructor() {
        state = {
            dataType: 0,
            festivalId: 0,
            startTime: '',
            endTime: '',
            error: null,
        }
    }
    updateFestivalId(festivalId) {
        this.setState({ festivalId: festivalId });
    }
    submitForm() {
        // url += `festivalId=''&startTime=''`;
        console.log(url)
        let req = new Request(url, {
            method: 'GET',
        });

        fetch(req)
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(error => this.setState({ error }))
    }
    render() {
        return (
            <View>
                <TextField>ERROR! {JSON.stringify(this.state.error)}</TextField>
                <InputField onChange={updateFestivalId(festivalId)}></InputField>
                <Button onClick={this.submitForm}>Submit</Button>
            </View>
        )
    }
}