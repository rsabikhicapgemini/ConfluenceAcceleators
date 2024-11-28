const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(path.resolve(filePath))
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}
function printColumnHeaders(data) {
    if (data.length > 0) {
        const headers = Object.keys(data[0]);
        console.log('Column Headers:', headers.join(', '));
    } else {
        console.log('No data available to print headers.');
    }
}
printColumnHeaders(sampleData);
const filePath = ".\sampledata.csv";