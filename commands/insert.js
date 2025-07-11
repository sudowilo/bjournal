const { getData, setData } = require('../database/data');
const { addDefaultTodo } = require('../commands/defaultTodos');

async function insertTodo(todos, date) {
    try {
        const data = await getData();
        let currentDay = data.days[date];
        if (!currentDay) {
            data.days[date] = { todo: [] };
            currentDay = data.days[date];
        }
        addDefaultTodo(data, date);
        for (let todo of todos) {
            todo = todo.trim();
            if (todo[0] === '^') {
                todo = todo.slice(2);
            }
            currentDay.todo.push({ text: todo, isDone: false });
        }
        await setData((data));
        console.log(`inserted to \x1b[1m${date}\x1b[0m todos!`);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

module.exports = { insertTodo };