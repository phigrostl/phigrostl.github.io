document.addEventListener('DOMContentLoaded', () => {
    const clicks = [];
    const bpmRecords = [];
    const MIN_INTERVAL = 10; // 最小时间间隔，单位为毫秒

    const bpmDisplay = document.getElementById('bpmDisplay');
    const clickButton = document.getElementById('clickButton');
    const resetButton = document.getElementById('resetButton');
    const ctx = document.getElementById('bpmChart').getContext('2d');
    const keysPressed = new Set();
    let avgBPM = 0;

    const bpmChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // x 轴标签
            datasets: [
                {
                    label: 'BPM记录',
                    data: [], // y 轴数据
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                },
                {
                    label: '平均 BPM',
                    data: [], // 每个点的平均 BPM
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 1,
                    borderDash: [5, 5] // 虚线
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '记录'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'BPM'
                    }
                }
            }
        }
    });
    

    function updateBPMList() {
        const maxRecordsToShow = 10; // 限制显示的最大记录数
        const recordsToShow = bpmRecords.slice(-maxRecordsToShow);
        const fragment = document.createDocumentFragment();

        recordsToShow.forEach((bpm, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `记录 ${index + 1}: ${bpm.toFixed(2)} BPM`;
            fragment.appendChild(listItem);
        });
    }

    function updateChart() {
        bpmChart.data.labels = bpmRecords.map((_, index) => `记录 ${index + 1}`);
        bpmChart.data.datasets[0].data = bpmRecords; // 记录的BPM
        bpmChart.data.datasets[1] = { // 平均BPM
            label: '平均 BPM',
            data: bpmRecords.map(() => avgBPM), // 每个点的平均BPM
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 1,
            borderDash: [5, 5]
        };
        bpmChart.update();
    }
    

    function recordBPM() {
        const now = Date.now();

        if (clicks.length > 0 && (now - clicks[clicks.length - 1]) < MIN_INTERVAL) {
            bpmDisplay.innerText = `太快了!`;
            return; // 如果上次点击距离当前点击时间间隔过短，则不记录 BPM
        }

        clicks.push(now);

        if (clicks.length > 2) {
            clicks.shift();
        }

        if (clicks.length === 2) {
            const [firstClick, secondClick] = clicks;
            const interval = (secondClick - firstClick) / 1000; // 秒
            const bpm = Math.round(60 / interval);
            bpmRecords.push(bpm);
            avgBPM = bpmRecords.reduce((sum, currentBPM) => sum + currentBPM, 0) / bpmRecords.length;

            bpmDisplay.innerText = `当前平均 BPM: ${avgBPM.toFixed(2)} 进五：${Math.round(avgBPM / 5) * 5}`;
            updateBPMList();
            updateChart();
        } else {
            bpmDisplay.innerText = '请再次点击以记录 BPM';
        }
    }

    function handleKeyPress(event) {
        if (event.code === 'Space' || /^[a-zA-Z]$/.test(event.key)) {
            if (!keysPressed.has(event.code)) {
                keysPressed.add(event.code);
                recordBPM();
            }
        }
    }

    function handleKeyRelease(event) {
        if (event.code === 'Space' || /^[a-zA-Z]$/.test(event.key)) {
            keysPressed.delete(event.code);
        }
    }

    clickButton.addEventListener('click', recordBPM);
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyRelease);

    resetButton.addEventListener('click', () => {
        clicks.length = 0;
        bpmRecords.length = 0;
        avgBPM = 0;
        bpmDisplay.innerText = '点击或按空格键或字母键以测量 BPM';
        bpmChart.data.labels = [];
        bpmChart.data.datasets[0].data = [];
        bpmChart.update();
    });
});
