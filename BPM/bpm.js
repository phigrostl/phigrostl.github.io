let clicks = [];
let bpmRecords = [];
const bpmDisplay = document.getElementById('bpmDisplay');
const bpmList = document.getElementById('bpmList');
const clickButton = document.getElementById('clickButton');
const resetButton = document.getElementById('resetButton');
let avgBPM = 0;

function updateBPMList() {
    bpmList.innerHTML = '';
    const maxRecordsToShow = 10; // 限制显示的最大记录数
    const recordsToShow = bpmRecords.slice(-maxRecordsToShow);
    recordsToShow.forEach((bpm, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `记录 ${index + 1}: ${bpm.toFixed(2)} BPM`;
        bpmList.appendChild(listItem);
    });
}

function recordBPM() {
    const now = new Date().getTime();
    clicks.push(now);
    if (clicks.length > 2) {
        clicks.shift();
    }
    if (clicks.length === 2) {
        const [firstClick, secondClick] = clicks;
        const interval = (secondClick - firstClick) / 1000;
        const bpm = Math.round(60 / interval);
        bpmRecords.push(bpm);
        avgBPM = bpmRecords.reduce((sum, currentBPM) => sum + currentBPM, 0) / bpmRecords.length;
        bpmDisplay.innerText = `当前平均 BPM: ${avgBPM.toFixed(2)}`;
        updateBPMList();
    } else {
        bpmDisplay.innerText = '请再次点击以记录 BPM';
    }
}

clickButton.addEventListener('click', recordBPM);

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || /^[a-zA-Z]$/.test(event.key)) {
        event.preventDefault(); // 防止空格键默认行为（如滚动页面）
        recordBPM();
    }
});

resetButton.addEventListener('click', () => {
    clicks = [];
    bpmRecords = [];
    avgBPM = 0;
    bpmDisplay.innerText = '点击或按空格或字母以测量 BPM';
    bpmList.innerHTML = '';
});
