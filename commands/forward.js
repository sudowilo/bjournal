const { getData, setData } = require('../database/data');
const { insertTodo } = require('../commands/insert');

async function forwardTodo(indexes, date, forwardDate) {
    const data = await getData();
    const day = data.days[date];
    if (!day.todo) {
        console.log(`there is no todo in ${date}`)
        return;
    }
    indexes.sort((a, b) => a - b);
    for (const rmIndex of indexes) {
        if (rmIndex >= day.todo.length) {
            console.log('this is not a valid index operation failed!');
            return;
        }
    }

    let todos = [];
    let counter = 0;
    for (const [i, todo] of day.todo.entries()) {
        if (i == indexes[counter]) {
            counter++;
            todos.push(todo.text);
            if (!todo.forward) {
                todo.forward = true;
            }
        }
    }

    if (indexes.length != counter) {
        console.log('duplicate indexes operation failed');
        return;
    }

    await setData(data);
    insertTodo(todos, forwardDate);
}

module.exports = { forwardTodo };
