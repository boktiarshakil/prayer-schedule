document.addEventListener('DOMContentLoaded', () => {
    const prayerForm = document.getElementById('prayer-form');
    const scheduleContainer = document.getElementById('schedule-container');
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    let prayerTimes = [];
    let tasks = [];

    // ফর্ম সাবমিট হ্যান্ডলার
    prayerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        prayerTimes = [];
        for(let i=1; i<=5; i++) {
            const timeInput = document.getElementById(`prayer-time-${i}`).value;
            if(timeInput) {
                const time = convertToDate(timeInput);
                prayerTimes.push(time);
            }
        }
        displaySchedule();
    });

    // টাস্ক ফর্ম সাবমিট হ্যান্ডলার
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskName = document.getElementById('task-name').value;
        const taskDuration = parseInt(document.getElementById('task-duration').value);
        if(taskName && taskDuration) {
            tasks.push({name: taskName, duration: taskDuration});
            displayTasks();
            taskForm.reset();
        }
    });

    // টাস্ক রিমুভ ফাংশন
    taskList.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON') {
            const index = e.target.getAttribute('data-index');
            tasks.splice(index, 1);
            displayTasks();
        }
    });

    // সময়সূচী প্রদর্শন ফাংশন
    function displaySchedule() {
        scheduleContainer.innerHTML = '';
        prayerTimes.forEach((prayerTime, index) => {
            const start = new Date(prayerTime.getTime() - 7*60000);
            const end = new Date(prayerTime.getTime() + 30*60000);
            const box = document.createElement('div');
            box.classList.add('schedule-box');
            box.innerHTML = `
                <p><strong>সময় ${index + 1}:</strong> ${formatTime(start)} - ${formatTime(end)}</p>
            `;
            scheduleContainer.appendChild(box);
        });
    }

    // টাস্ক প্রদর্শন ফাংশন
    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            taskItem.innerHTML = `
                <span>${task.name} (${task.duration} মিনিট)</span>
                <button data-index="${index}">রিমুভ</button>
            `;
            taskList.appendChild(taskItem);
        });
    }

    // টাইম স্ট্রিংকে ডেট অবজেক্টে রূপান্তর
    function convertToDate(timeStr) {
        const now = new Date();
        const [hours, minutes] = timeStr.split(':').map(Number);
        now.setHours(hours, minutes, 0, 0);
        return now;
    }

    // ডেট অবজেক্টকে সময় স্ট্রিং এ রূপান্তর
    function formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes} ${ampm}`;
    }
});
