const { toIsoLocalDate } = require('../lib/getDate');
const { getData, setData } = require('../database/data');
const { addDefaultTodo } = require('../commands/defaultTodos');

async function sortTodos(day) {
    const done = [];
    const undone = [];
    const forward = [];
    for (const [index, todo] of day.todo.entries()) {
        if (todo.isDone) {
            todo.forward ? forward.push(todo) : done.push(todo);
        } else {
            todo.forward ? forward.push(todo) : undone.push(todo);
        }
    }
    const newList = undone.concat(done.concat(forward));
    day.todo = newList;
}


function displayTodos(day) {
    if (!day) {
        console.log('nothing todo!');
    } else {
        sortTodos(day);
        for (const [index, todo] of day.todo.entries()) {
            let mark = todo.isDone ? '🗙' : '●';
            mark += todo.forward ? ' ^' : '';
            if (index > 9) mark = '\b'+mark;
            console.log(index, mark, todo.text);
        }
    }
}

async function listTodos(date) {
    try {
        const data = await getData();
        addDefaultTodo(data, date);
        const day = data.days[date];
        displayTodos(day);
        await setData(data);
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