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
    const header1 = document.createElement('th');
    const header2 = document.createElement('th');
    const header3 = document.createElement('th');
    const header4 = document.createElement('th');
    header1.innerHTML = '序号';
    header2.innerHTML = 'P';
    header3.innerHTML = 'G';
    header4.innerHTML = '最大连击';
    headerRow.appendChild(header1);
    headerRow.appendChild(header2);
    headerRow.appendChild(header3);
    headerRow.appendChild(header4);

    // Populate table rows
    while (a >= 0) {
        let b = 0;
        while (a + b <= noteNumValue) {
            let c = 0;
            while (a + b >= c - 1) {
                const calculatedScore = (900000.0 / noteNumValue * a) + (900000.0 / noteNumValue * 0.65 * b) + (c * 100000.0 / noteNumValue);
                if (scoreValue - 0.5 <= calculatedScore && calculatedScore <= scoreValue + 0.5) {
                    m++;
                    const row = table.insertRow();
                    row.insertCell().innerHTML = `${m}`;
                    row.insertCell().innerHTML = `${a}`;
                    row.insertCell().innerHTML = `${b}`;
                    row.insertCell().innerHTML = `${c}`;
                }
                c++;
            }
            b++;
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
