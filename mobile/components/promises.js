function showLoading() {
    console.log('Loading...');
}
function populateTable(data) {
    console.log(`populate table with ${data}`);
}
function updatePagination(count) {
    console.log(`Pagination: ${count}`);
}

function getBasicData(callback) {
    console.log('Getting basic data');
    return new Promise((resolve, _) => {
        setTimeout(() => {
            console.log('Got basic data');
            const data = 'HELLO MOTO'
            resolve(data);
        }, 3000);
    })
    
}
function getBasicCount(callback) {
    return new Promise((resolve, _) => {
        console.log('Getting basic count');
        setTimeout(() => {
            console.log('Got basic count');
            const count = 9999;
            resolve(count);
        }, 2000);
    });
}
function finish() {
    console.log('finished')
}

function enterDataViewerPage() {
    showLoading();
    const basicCountPromise = getBasicCount()
        .then(updatePagination);
    const basicDataCount = getBasicData()
        .then(populateTable)
    return Promise.all([basicCountPromise, basicDataCount]);
}

const enterAdvanceDataViewerPage = enterDataViewerPage;

enterDataViewerPage().then(enterAdvanceDataViewerPage).then(finish);