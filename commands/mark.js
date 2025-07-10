const { getData, setData } = require('../database/data');

async function markDone(indexes, date) {
    const data = await getData();
    const day = data.days[date];

    indexes.sort((a, b) => a - b);
    for (const rmIndex of indexes) {
        if (rmIndex >= day.todo.length) {
            console.log('this is not a valid index operation failed!');
            return;
        }
    }

    let counter = 0;
    for (const [i, todo] of day.todo.entries()) {
        if (i == indexes[counter]) {
            counter++;
            todo.isDone = true;
        }
    }

    if (indexes.length != counter) {
        console.log('duplicate indexes operation failed');
        return;
    }
    await setData(data);
}

module.exports = { markDone };