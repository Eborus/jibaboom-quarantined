function compute(data) {
    try {
        return { error: null, result: sortArrayOfPerformances(data) };
    } catch (error) {
        return { error, result: null };
    }
}

function sortArrayOfPerformances(performances) {
    performances.sort((a, b) => a.endtime - b.endtime); // Sorts the array of performances on descending end time
    console.log(performances);

    let selected = [];

    let i = 0; //first selected performance, i -> marks previously selected performances

    let firstSelectedPerformance = performances[i];

    selected.push( firstSelectedPerformance );

    let j = 1; //looping variable, j marks the currently selected performance

    for(j = 1; j < performances.length; j++) {
        if(performances[j].starttime >= performances[i].endtime) {
            selected.push(performances[j]);
            i = j;
        }
    }
    return selected;
}

module.exports = {
    compute
}