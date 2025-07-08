const { toIsoLocalDate } = require('../lib/getDate');
const { getData, setData } = require('../database/data');

function displayTodos(day) {
    if (!day) {
        console.log('nothing todo!');
    } else {
        for (const todo of day.todo) {
            const mark = todo.isDone ? '🗙' : '●';
            console.log(mark, todo.text);
        }
    }
}

async function listTodos(date) {
    try {
        const data = await getData();
        const day = data.days[date];
        displayTodos(day);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

async function listRecentDaysTodos(date, days) {
    try {
        const data = await getData();
        for (let dayCount = days; dayCount > 0; dayCount--) {
            const selectedDate = new Date(date);
            selectedDate.setDate(selectedDate.getDate() - dayCount);
            console.log('\x1b[1m' + toIsoLocalDate(selectedDate) + '\x1b[0m');
            const isoDate = toIsoLocalDate(selectedDate);
            const day = data.days[isoDate];
            displayTodos(day);
        }
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

module.exports = { listTodos, listRecentDaysTodos };