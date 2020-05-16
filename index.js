//Current Issues with the pagination
//If the user increases the rows displayed per page and goes to the next page, max page size still remains the same. Meaning if it already displays all 18 data, the user can still
//go to the next page up to two more times with each new page returning a blank table. You can also see the no. of entries increasing despite it being abnormal.
//Planning to fix this by Sun evening, not to worry... I hope -Jason

const basicDataQuery = {
    festivalId: null,
    startTime: null,
    page: 0,
    pageSize: 5,
    maxPages: 3,
};

const dataPaginationFunction = {
    changePage: function(delta) {
        basicDataQuery['page'] += parseInt(delta);
        if(basicDataQuery['page'] >= basicDataQuery['maxPages']) {
            basicDataQuery['page'] = basicDataQuery['maxPages'];
        } else if(basicDataQuery['page'] < 0) {
            basicDataQuery['page'] = 0;
        }
    },
    changePageSize: function (newPageSize) {
        basicDataQuery['pageSize'] = newPageSize
    }
};

const basicDataUrl = 'http://localhost:3000/performance/data';

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

function refreshDataTable() {
    getDataFromBackend(function (error, data) {
        if (error) return alert(error);
        populateDataTable(data);
    })
    displayEntriesText();
}

function filterData(event) {
    $('#basic-data-filter-form input').not(':input[type=submit]').each((index, input) => {
        basicDataQuery[$(input).attr('key')] = $(input).val();
    });
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
    displayEntriesText();
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
function displayEntriesText() {
    let maxTableRows;
    $.get(basicDataUrl, basicDataQuery).done((result) => {
        maxTableRows = result.length;
        console.log(maxTableRows); //Still figuring this part out, trying to fix the entries text thing
    })
    let displayEntryText = document.getElementById("entriesText");
    let count = basicDataQuery['page'];
    let maxIndex = basicDataQuery['pageSize'] * (count + 1);
    let minIndex = (maxIndex - basicDataQuery['pageSize']) + 1

    if (maxIndex > 18) {
        maxIndex = 18;
    }
    if (minIndex < 1 && minIndex < maxTableRows) {
        minIndex = 1;
    }

    displayEntryText.innerHTML = "Showing " + minIndex + " to " + maxIndex + " of 18 entries";
}