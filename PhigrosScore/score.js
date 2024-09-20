const noteNumInput = document.getElementById('noteNumInput');
const scoreInput = document.getElementById('scoreInput');
const startButton = document.getElementById('startButton');

startButton.addEventListener('click', () => {
    const noteNumValue = parseFloat(noteNumInput.value);
    const scoreValue = parseFloat(scoreInput.value);
    if (isNaN(noteNumValue) || isNaN(scoreValue) || noteNumValue <= 0) return;
    let m = 0;
    const table = document.createElement('table');
    table.innerHTML = '';
    const headerRow = table.insertRow();
    ['序号', 'P', 'G', '最大连击'].forEach(text => {
        const header = document.createElement('th');
        header.innerHTML = text;
        headerRow.appendChild(header);
    });
    for (let a = noteNumValue; a >= 0; a--) {
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
    }
    if (m === 0)
    {
        alert('没有找到符合条件的解');
    }
    const existingTable = document.getElementById('resultTable');
    if (existingTable) {
        existingTable.remove();
    }
    table.id = 'resultTable';
    document.body.appendChild(table);
});