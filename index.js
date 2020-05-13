const basicDataQuery = {
    festivalId: null,
    startTime: null,
};

const basicDataUrl = 'http://localhost:3000/basic/data';

function populateDataTable(data) {
    console.log(data);
    const dataTableHtml = data.map(({id, performance_id, festival_id, performance, startTime, endTime, popularity}) => `
            <tr>
                <th scope="row">${id}</th>
                <td>${performance_id}</td>
                <td>${festival_id}</td>
                <td>${performance}</td>
                <td>${startTime}</td>
                <td>${endTime}</td>
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
}

function filterData(event) {
    $('#basic-data-filter-form input').not(':input[type=submit]').each((index, input) => {
        basicDataQuery[$(input).attr('key')] = $(input).val();
    });
    refreshBasicDataTable();
    return false;
}

function registerBasicDataFilterForm() {
    $('#basic-data-filter-form').submit(filterData);
}

$(document).ready(function () {
    registerBasicDataFilterForm();
    refreshDataTable();
})