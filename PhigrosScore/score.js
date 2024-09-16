const noteNumInput = document.getElementById('noteNumInput');
const scoreInput = document.getElementById('scoreInput');
const startButton = document.getElementById('startButton');

startButton.addEventListener('click', () => {
    const noteNumValue = parseFloat(noteNumInput.value);
    const scoreValue = parseFloat(scoreInput.value);

    // Ensure valid inputs
    if (isNaN(noteNumValue) || isNaN(scoreValue) || noteNumValue <= 0) return;

    let a = noteNumValue;
    let m = 0;

    // Create and clear table
    const table = document.createElement('table');
    table.innerHTML = ''; // Clear any existing table content

    // Create header row
    const headerRow = table.insertRow();
    ['序号', 'P', 'G', '最大连击'].forEach(text => {
        const header = document.createElement('th');
        header.innerHTML = text;
        headerRow.appendChild(header);
    });

    // Populate table rows
    while (a >= 0) {
        for (let b = 0; a + b <= noteNumValue; b++) {
            for (let c = 0; a + b >= c - 1; c++) {
                const calculatedScore = (900000.0 / noteNumValue * a) + (900000.0 / noteNumValue * 0.65 * b) + (c * 100000.0 / noteNumValue);
                if (Math.abs(scoreValue - calculatedScore) <= 0.5) {
                    m++;
                    const row = table.insertRow();
                    [m, a, b, c].forEach(value => {
                        const cell = row.insertCell();
                        cell.innerHTML = value;
                    });
                }
            }
        }
        a--;
    }

    // Remove existing table if present
    const existingTable = document.getElementById('resultTable');
    if (existingTable) {
        existingTable.remove();
    }

    // Assign an id to the new table for easy reference
    table.id = 'resultTable';

    // Append the table to the document body
    document.body.appendChild(table);
});