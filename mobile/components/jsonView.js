import React, { Component } from "react";
import { View, Button, } from 'react-native';

import JsonRequestorView from './jsonRequesterView';
import JsonPrinterView from './jsonPrinterView';
import JsonDataView from './jsonDataView';
import cacheManager from '../managers/cacheManager';
import JsonSearchDataViewer from './jsonSearchDataViewer'
import JsonSearchResultViewer from './jsonSearchResultViewer'

export default class JsonView extends Component {
    state = {
        ddata: {},
        rdata: {},
        cacheData: {},
    }

    constructor(props) {
        super(props);
        this.onGetPress = this.onGetPress.bind(this);
        this.onSearchGetDataViewer = this.onSearchGetDataViewer.bind(this);
        this.onSearchGetResultViewer = this.onSearchGetResultViewer.bind(this);
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
            this.setState( cacheData )
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
            .then(ddata => this.setState({ ddata }))
            .catch((error) => {
                console.log(error)
                const result = { error: error.message }
                cacheManager
                    .get(requestUrl)
                    .then((cacheJson) => {
                        if (!cacheJson) {
                            result.cacheMessage = 'URL not cached '
                            return this.setState({ ddata: result })
                        }
                        result.json = cacheJson;
                        result.cached = true;
                        this.setState({ ddata: result })
                    }).catch((cacheError) => {
                        this.setState({
                            data: result,
                            cacheData: { error: cacheError.message }
                        })
                    })
            })
    }
    onSearchGetDataViewer(requestUrl) {
        fetch(requestUrl)
            .then(response => response.json())
            .then((json) => {
                cacheManager
                    .set(requestUrl, json)
                    .then(this.updateCacheViewer)
                    .catch(this.catchCacheError);
                return json
            })
            .then(ddata => this.setState({ ddata }))
            .catch((error) => {
                console.log(error)
                const result = { error: error.message }
                cacheManager
                    .get(requestUrl)
                    .then((cacheJson) => {
                        if (!cacheJson) {
                            result.cacheMessage = 'URL not cached '
                            return this.setState({ ddata: result })
                        }
                        result.json = cacheJson;
                        result.cached = true;
                        this.setState({ ddata: result })
                    }).catch((cacheError) => {
                        this.setState({
                            ddata: result,
                            cacheData: { error: cacheError.message }
                        })
                    })
            })
    }

    onSearchGetResultViewer(requestUrl) {
        fetch(requestUrl)
            .then(response => response.json())
            .then((json) => {
                cacheManager
                    .set(requestUrl, json)
                    .then(this.updateCacheViewer)
                    .catch(this.catchCacheError);
                return json
            })
            .then(rdata => this.setState({ rdata }))
            .catch((error) => {
                console.log(error)
                const result = { error: error.message }
                cacheManager
                    .get(requestUrl)
                    .then((cacheJson) => {
                        if (!cacheJson) {
                            result.cacheMessage = 'URL not cached '
                            return this.setState({ rdata: result })
                        }
                        result.json = cacheJson;
                        result.cached = true;
                        this.setState({ data: result })
                    }).catch((cacheError) => {
                        this.setState({
                            rdata: result,
                            cacheData: { error: cacheError.message }
                        })
                    })
            })
    }

    render() {
        return (
            <View>
                {/* ResultViewer */}
                <JsonSearchResultViewer onSearchGetResultViewer={this.onSearchGetResultViewer} />
                <JsonPrinterView title='Result Viewer' json={this.state.rdata} />
                {/* DataViewer */}
                <JsonSearchDataViewer onSearchGet={this.onSearchGetDataViewer} />
                <JsonRequestorView onGetPress={this.onGetPress} />
                <JsonPrinterView title='Data Viewer' json={this.state.ddata} />
                <JsonPrinterView title='Cache' json={this.state.cacheData} />
                <Button title="Clear Cache" onPress={this.onClearCache} />
                <JsonDataView />
            </View>
        )
    }
}