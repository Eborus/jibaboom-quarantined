const e = require("express");

function compute(data) {
    try {
        return { error: null, result: sortArrayOfPerformances(data) };
    } catch (error) {
        return { error, result: null };
    }
}

function sortArrayOfPerformances(performances) {
    performances.sort((a, b) => a.endtime - b.endtime); // Sorts the array of performances on ascending end time
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

function computePopularity(data) {
    try {
        return { error: null, result: sortArrayOfPopularity(data) };
    } catch (error) {
        return { error, result: null };
    }
}

// Find the latest performance (in sorted array) that doesn't 
// conflict with the performance[i]. If there is no compatible performances, 
// then it returns -1. Basically the for loop in sortArrayofPerformances function but this time it returns values based on the outcomes
function latestNonConflict(pTest, n) {
    for (let i = (n - 1); i >= 0; i--) {
        if (pTest[i].endtime <= pTest[n].starttime) {
            return i;
        }
    }
    return -1;
}

function sortArrayOfPopularity(performances) {
performances.sort((a, b) => a.endtime - b.endtime);
console.log(performances);

    let n = performances.length;
    console.log(n);
    let maxPopularity = []; // Stores the max popularity
    let popularityArray = []; // Stores the indexes of performances associated in getting max popularity
    let resultArray = []; // Stores the arrays of performances associated in getting max popularity

    // Initialise popularity array with references to the length of array of filtered performances
    for (let i = 0; i < n; i++) {
        popularityArray[i] = [];
    }
    console.log(popularityArray);

    // Initialise the max popularity array by starting it off with the lowest popularity, inits the popularity array with the first performance
    maxPopularity[0] = performances[0].popularity;
    console.log("Max Popularity 1 = " + maxPopularity[0]);
    popularityArray[0].push(0);
    console.log(popularityArray);

    // Iterates through the sorted array
    for (let i = 1; i < n; i++) {
        console.log("Iterating Index " + i);
        let index = latestNonConflict(performances, i);
        console.log("Returned value is: " + index);

        let currentPopularity = performances[i].popularity;
        console.log("Popularity is: " + currentPopularity + "\n");
        if (index != -1) {
            currentPopularity += maxPopularity[index];
            console.log("Added to index of max popularity: " + maxPopularity[index] + "\n");
        }

        // if including the current performance leads to the maximum popularity so far
        if (maxPopularity[i - 1] < currentPopularity) {
            maxPopularity[i] = currentPopularity;
            console.log("This is now the max");

            if (index != -1) {
                console.log("Element being replaced: [" + popularityArray[i] + "] at index " + i);
                popularityArray[i] = popularityArray[index];
                console.log("New Value after set: " + popularityArray[i]);
                console.log("New popularity array after set: ");
                console.log(popularityArray);
            }
            console.log("Index for popularity array: " + i);
            console.log("Include");
            console.log("Old Value: " + popularityArray[i]);
            popularityArray[i].push(i);
            console.log("New Value: " + popularityArray[i]);
            console.log("New popularity array: ");
            console.log(popularityArray);
        }
        // excluding the current performance leads to the maximum popularity so far
        else {
            console.log("Index for popularity array: " + i);
            console.log("Exclude");
            console.log("Old Value: " + popularityArray[i]);
            popularityArray[i] = popularityArray[i - 1];
            console.log("New Value: " + popularityArray[i]);
            console.log("New popularity array: ");
            console.log(popularityArray);
            maxPopularity[i] = Math.max(currentPopularity, parseInt(maxPopularity[i - 1]));
        }
    }
    console.log("\nEntire data: " + maxPopularity);
    console.log("Max popularity is " + maxPopularity[n - 1]);

    // Prints out the performances used in getting the max popularity
    popularityArray[n - 1].forEach(function (index) {
        resultArray.push(performances[index]);
    })
    return resultArray;
}

module.exports = {
    compute,
    computePopularity
}