let clicks = [];
        let bpmRecords = [];
        const bpmDisplay = document.getElementById('bpmDisplay');
        const bpmList = document.getElementById('bpmList');
        const clickButton = document.getElementById('clickButton');
        const resetButton = document.getElementById('resetButton');
        let keysPressed = new Set();
        let avgBPM = 0;
        const MIN_INTERVAL = 10; // 最小时间间隔，单位为毫秒

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
            if (clicks.length > 0 && (now - clicks[clicks.length - 1]) < MIN_INTERVAL) {
                return; // 如果上次点击距离当前点击时间间隔过短，则不记录 BPM
            }
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
            clicks = [];
            bpmRecords = [];
            avgBPM = 0;
            bpmDisplay.innerText = '点击或按空格键或字母键以测量 BPM';
            bpmList.innerHTML = '';
        });
