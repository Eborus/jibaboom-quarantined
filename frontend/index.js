const defaults = {
    dataType: 0,
    festivalId: null,
    startTime: null,
    endTime: null,
    page: 0,
    pageSize: 999,
    maxEntries: 0,
};

const basicDataQuery = {
    dataType: 0,
    festivalId: null,
    startTime: null,
    endTime: null,
    page: 0,
    pageSize: 5,
    maxPages: 3,
};

const basicResultQuery = {
    festivalId: null,
};

// Init variables
const basicDataUrl = 'https://jibaboom-2b21-quarantined.herokuapp.com/performance/data';
const basicResultUrl = 'https://jibaboom-2b21-quarantined.herokuapp.com/basic/result';
const advanceResultUrl = 'https://jibaboom-2b21-quarantined.herokuapp.com/advance/result';
var resultType = 0;

// Pagination Handling
const dataPaginationFunction = {
    changePage: function(delta) {
        basicDataQuery['maxPages'] = Math.floor((defaults['maxEntries'] - 1) / basicDataQuery['pageSize']);
        basicDataQuery['page'] += parseInt(delta);
        if(basicDataQuery['page'] >= basicDataQuery['maxPages']) {
            basicDataQuery['page'] = basicDataQuery['maxPages'];
        } else if(basicDataQuery['page'] < 0) {
            basicDataQuery['page'] = 0;
        }
    },
    changePageSize: function (newPageSize) {
        basicDataQuery['pageSize'] = newPageSize
        basicDataQuery['maxPages'] = Math.floor((defaults['maxEntries'] - 1) / newPageSize);
        basicDataQuery['page'] = 0;
    }
};

//Filtering data and generating table
function populateDataTable(data) {
    console.log(data);
    const dataTableHtml = data.map(({ id, performance_id, festival_id, performance, starttime, endtime, popularity }) => `
            <tr>
                <th scope="row">${id}</th>
                <td>${performance_id}</td>
                <td>${festival_id}</td>
                <td>${performance}</td>
                <td>${starttime}</td>
                <td>${endtime}</td>
                <td>${popularity}</td>
            </tr>
    `,
    );
    $('#data-tbody').html(dataTableHtml);
}

function getDataFromBackend(callback) {
    $.get(basicDataUrl, basicDataQuery).done((result) => callback(null, result))
        .fail((message) => callback(message, null));
}

function getTotalEntries(callback) {
    defaults['dataType'] = basicDataQuery['dataType'];
    defaults['festivalId'] = basicDataQuery['festivalId'];
    defaults['startTime'] = basicDataQuery['startTime'];
    defaults['endTime'] = basicDataQuery['endTime'];
    $.get(basicDataUrl, defaults).done((result) => callback(null, result))
        .fail((message) => callback(message, null));
}

function refreshDataTable() {
    getDataFromBackend(function (error, data) {
        if (error) return alert(`Error: Unable to retrieve data from backend, Code: 503`);
        populateDataTable(data);
    })
    getTotalEntries(function (error, entries) {
        if (error) return alert(`Error: Unable to get the total number of entries, Code: 500`);
        console.log("Total number of entries returned is " + entries.length)
        defaults['maxEntries'] = entries.length;
        displayEntriesText(defaults['maxEntries']);
    })
}

function filterData(event) {
    $('#basic-data-filter-form input').not(':input[type=submit]').each((index, input) => {
        basicDataQuery[$(input).attr('key')] = $(input).val();
    });
    basicDataQuery['page'] = 0;
    refreshDataTable();
    return false;
}

function registerDataFilterForm() {
    $('#basic-data-filter-form').submit(filterData);
}

$(document).ready(function () {
    registerDataFilterForm();
    refreshDataTable();
    registerBasicDataPaginationForm();
    registerDTypeSelection();
    displayEntriesText();
    registerBasicResultInput()
})


// Pagination Part

function registerBasicDataPaginationForm() {
    $('#pagination-back').click(paginateData);
    $('#pagination-forward').click(paginateData);
    $('#rowsPerPageSelection').change(paginateData)
}

function paginateData(event) {
    const fn = $(this).attr('fn');
    const value = $(this).attr('value') || $(this).val();
    dataPaginationFunction[fn](value);
    refreshDataTable();
}

//Called at the start and each time the table is refreshed to update the entries text. Currently not responsive if the table gets more records.
function displayEntriesText(totalRows) {
    let maxTableRows = totalRows;
    let displayEntryText = document.getElementById("entriesText");
    let count = basicDataQuery['page'];
    let maxIndex = basicDataQuery['pageSize'] * (count + 1);
    let minIndex = (maxIndex - basicDataQuery['pageSize']) + 1

    if (maxIndex > maxTableRows) {
        maxIndex = maxTableRows;
    }
    if (minIndex < 1 && minIndex < maxTableRows) {
        minIndex = 1;
    }

    displayEntryText.innerHTML = "Showing " + minIndex + " to " + maxIndex + " of " + maxTableRows + " entries";
}

//Determine data type

function registerDTypeSelection() {
    $('#dataTypeSelection').change(changeDataType);
}

function changeDataType(event) {
    const dataValue = document.getElementById("dataTypeSelection").value;
    basicDataQuery['dataType'] = dataValue;
    basicDataQuery['page'] = 0;
    console.log(basicDataQuery['dataType']);
    refreshDataTable();
}

// Result Viewer Part
function registerBasicResultInput() {
    $('#basic-result-input-form').submit(computeResults);
    $('#inputSelection').change(changeResultType);
}

function changeResultType(event) {
    resultType = document.getElementById("inputSelection").value;
    console.log("ResultType is " + resultType);
    if(document.getElementById("inputFestivalId").value != '') {
        computeResults();
    }
}

function computeResults() {
    $('#basic-result-input-form input').not(':input[type=submit]').each((index, input) => {
        basicResultQuery[$(input).attr('key')] = $(input).val();
    });
    refreshResultTable();
    return false;
}

function refreshResultTable() {
    getResultFromBackend(function (error, data) {
        if (error) return alert(`Error: Unable to retrieve data from backend, Code: 503`);
        populateResultTable(data);
    })
}

function getResultFromBackend(callback) {
    if(resultType == 0) { // Basic Result Query
    $.get(basicResultUrl, basicResultQuery).done((result) => callback(null, result))
        .fail((message) => callback(message, null));
    } else if (resultType == 1) { // Advanced Result Query
        $.get(advanceResultUrl, basicResultQuery).done((result) => callback(null, result))
        .fail((message) => callback(message, null));
    } else { // Fallback to most performances if an unexpected error occurs
        console.log("A bug has been detected! ResultType value was " + resultType);
        resultType = 0;
        $.get(basicResultUrl, basicResultQuery).done((result) => callback(null, result))
        .fail((message) => callback(message, null));
    }
}

function populateResultTable(data) {
    const dataTableHtml = data.result.map(({ id, performance_id, festival_id, starttime, endtime, popularity }) => `
            <tr>
                <th scope="row">${id}</th>
                <td>${performance_id}</td>
                <td>${festival_id}</td>
                <td>${starttime}</td>
                <td>${endtime}</td>
                <td>${popularity}</td>
            </tr>
    `,
    );
    $('#result-tbody').html(dataTableHtml);
}