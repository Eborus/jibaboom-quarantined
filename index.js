const basicDataQuery = {
    festivalId: null,
    startTime: null,
};

const basicDataUrl = 'http://localhost:3000/performance/data';

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
})