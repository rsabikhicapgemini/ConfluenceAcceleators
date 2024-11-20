// Function to identify the current quarter
function getCurrentQuarter() {
    const month = new Date().getMonth() + 1; // getMonth() returns 0-11, so add 1
    let quarter;

    if (month >= 1 && month <= 3) {
        quarter = 1;
    } else if (month >= 4 && month <= 6) {
        quarter = 2;
    } else if (month >= 7 && month <= 9) {
        quarter = 3;
    } else {
        quarter = 4;
    }

    return quarter;
}

// Function to get the year of the last quarter
function getLastQuarterYear(currentQuarter, currentYear) {
    if (currentQuarter === 1) {
        return currentYear - 1;
    }
    return currentYear;
}

// Function to get the last quarter
function getLastQuarter(currentQuarter) {
    if (currentQuarter === 1) {
        return 4;
    }
    return currentQuarter - 1;
}

// Function to get the months of a quarter
function getQuarterMonths(quarter, year) {
    const months = {
        1: ['Jan', 'Feb', 'Mar'],
        2: ['Apr', 'May', 'Jun'],
        3: ['Jul', 'Aug', 'Sep'],
        4: ['Oct', 'Nov', 'Dec']
    };
    return months[quarter].map(month => `${month}'${year.toString().slice(-2)}`);
}

// Function to get the next quarter and year
function getNextQuarter(currentQuarter, currentYear) {
    if (currentQuarter === 4) {
        return { quarter: 1, year: currentYear + 1 };
    }
    return { quarter: currentQuarter + 1, year: currentYear };
}

// Get the current date
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentQuarter = getCurrentQuarter();
const lastQuarter = getLastQuarter(currentQuarter);
const lastQuarterYear = getLastQuarterYear(currentQuarter, currentYear);
const currentQuarterMonths = getQuarterMonths(currentQuarter, currentYear);

// Get the next two quarters
const nextQuarter1 = getNextQuarter(currentQuarter, currentYear);
const nextQuarter2 = getNextQuarter(nextQuarter1.quarter, nextQuarter1.year);

// Create the table
const table = document.createElement('table');
table.style.borderCollapse = 'collapse';
table.style.width = '100%';

// Create the header row
const headerRow = document.createElement('tr');
const headers = [
    `Q${lastQuarter}'${lastQuarterYear}`,
    `Q${currentQuarter}'${currentYear}`,
    `Q${nextQuarter1.quarter}'${nextQuarter1.year}`,
    `Q${nextQuarter2.quarter}'${nextQuarter2.year}`
];

headers.forEach((headerText, index) => {
    const header = document.createElement('th');
    header.textContent = headerText;
    header.style.border = '1px solid black';
    header.style.padding = '8px';
    header.style.textAlign = 'center';
    if (index === 1) {
        header.colSpan = 3; // Span three columns for the current quarter
    }
    headerRow.appendChild(header);
});

// Create the month row using a nested loop
const monthRow = document.createElement('tr');
headers.forEach((headerText, index) => {
    if (index === 1) {
        currentQuarterMonths.forEach(month => {
            const monthCell = document.createElement('td');
            monthCell.textContent = month;
            monthCell.style.border = '1px solid black';
            monthCell.style.padding = '8px';
            monthCell.style.textAlign = 'center';
            monthRow.appendChild(monthCell);
        });
    } else {
        const emptyCell = document.createElement('td');
        emptyCell.style.border = '1px solid black';
        monthRow.appendChild(emptyCell);
    }
});

// Append rows to the table
table.appendChild(headerRow);
table.appendChild(monthRow);

// Append the table to the body
document.body.appendChild(table);