const { getData, setData } = require('../database/data');

function initDefaults(data, defaults) {
    if (!defaults) {
        data.defaultTodos = {
            todos: [
                "drink 8 glass of water",
                "meditate for 2 minutes"
            ],
        }
        console.log('defaults initialized');
    }
    return data.defaultTodos;
}

async function listDefaults() {
    const data = await getData();
    let defaults = data.defaultTodos;
    defaults = initDefaults(data, defaults);
    for (const [index, todo] of defaults.todos.entries()) {
        console.log(index, todo);
    }
    await setData(data);
}

async function insertDefault(newTodos) {
    const data = await getData();
    let defaults = data.defaultTodos;
    defaults = initDefaults(data, defaults);
    for (const todo of newTodos) {
        defaults.todos.push(todo);
    }
    await setData(data);
}

async function removeDefault(indexes) {
    const data = await getData();
    let defaults = data.defaultTodos;
    defaults = initDefaults(data, defaults);
    indexes = indexes.sort((a, b) => a - b);
    const newDefaultTodos = [];
    for (const rmIndex of indexes) {
        for (let i = 0; i < defaults.todos.length; i++) {
            if (i != rmIndex) {
                newDefaultTodos.push(defaults.todos[i]);
            }
        }
    }
    defaults.todos = newDefaultTodos;
    await setData(data);
}

async function addDefaultTodo(data, date) {
    let defaults = data.defaultTodos;
    defaults = initDefaults(data, defaults);

    let day = data.days[date];
    if (!day) {
        data.days[date] = { todo: [] };
        day = data.days[date];
    }

    if (day.default) return;

    for (const todo of defaults.todos) {
        day.todo.push({ text: todo, isDone: false });
    }
    day.default = true;
}

module.exports = { listDefaults, insertDefault, removeDefault, addDefaultTodo };