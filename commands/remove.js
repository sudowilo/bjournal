const { getData, setData } = require('../database/data');

async function removeTodo(indexes, date) {
    const data = await getData();
    const day = data.days[date];

    indexes.sort((a, b) => a - b);
    for (const rmIndex of indexes) {
        if (rmIndex >= day.todo.length) {
            console.log('this is not a valid index operation failed!');
            return;
        }
    }

    let newList = [];
    let counter = 0;
    for (const [i, todo] of day.todo.entries()) {
        if (i == indexes[counter]) { counter++; continue; }
        newList.push(todo);
    }

    if (indexes.length != counter) {
        console.log('duplicate indexes operation failed');
        return;
    }
    day.todo = newList;
    await setData(data);
}

module.exports = { removeTodo };