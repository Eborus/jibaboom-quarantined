import React, { Component } from "react";
import { View, Button, } from 'react-native';

import JsonRequestorView from './jsonRequesterView';
import JsonPrinterView from './jsonPrinterView';
import cacheManager from '../managers/cacheManager';

export default class JsonView extends Component {
    state = {
        data: {},
        cacheData: {},
    }

    constructor(props) {
        super(props);
        this.onGetPress = this.onGetPress.bind(this);
        this.updateCacheViewer = this.updateCacheViewer.bind(this);
        this.catchCacheError = this.catchCacheError.bind(this);
        this.onClearCache = this.onClearCache.bind(this);
        this.updateCacheViewer();
    }

    async onClearCache() {
        try {
            await cacheManager.clearAll();
            await this.updateCacheViewer()
        } catch (error) {
            this.catchCacheError(error);
        }
    }

    catchCacheError(error) {
        return this.setState({ cacheData: { error: error.message } });
    }

    async updateCacheViewer() {
        try {
            const cacheData = await cacheManager.getAll();
            this.setState({ cacheData })
        } catch (error) {
            this.catchCacheError(error);
        }
    }

    onGetPress(requestUrl) {
        fetch(requestUrl)
            .then(response => response.json())
            .then((json) => {
                cacheManager
                    .set(requestUrl, json)
                    .then(this.updateCacheViewer)
                    .catch(this.catchCacheError);
                return json
            })
            .then(data => this.setState({ data }))
            .catch((error) => {
                console.log(error)
                const result = { error: error.message }
                cacheManager
                    .get(requestUrl)
                    .then((cacheJson) => {
                        if (!cacheJson) {
                            result.cacheMessage = 'URL not cached '
                            return this.setState({ data: result })
                        }
                        result.json = cacheJson;
                        result.cached = true;
                        this.setState({ data: result })
                    }).catch((cacheError) => {
                        this.setState({
                            data: result,
                            cacheData: { error: cacheError.message }
                        })
                    })
            })
    }

    render() {
        return (
            <View>
                <JsonRequestorView onGetPress={this.onGetPress} />
                <JsonPrinterView title='JSON Response' json={this.state.data} />
                <JsonPrinterView title='Cache' json={this.state.cacheData} />
                <Button title="Clear Cache" onPress={this.onClearCache} />
            </View>
        )
    }
}