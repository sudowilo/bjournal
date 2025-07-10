#! /usr/bin/env node
const { Command } = require('commander');
const program = new Command();

const { toIsoLocalDate, isoLocalDate } = require('../lib/getDate');
const { listTodos, listRecentDaysTodos } = require('../commands/list');
const { insertTodo } = require('../commands/insert');
const { removeTodo } = require('../commands/remove');
const { markDone, markUndone, markBold } = require('../commands/mark');

program
    .name('bjournal')
    .description('cli todo and goal pointer')
    .version('0.0.0');

program
    .command('insert')
    .alias('i')
    .arguments('<string...>')
    .description('inserting todo to specific date')
    .option('-d, --date <string>', 'todos of specific day', new Date())
    .action((str, option) => {
        const isoDate = toIsoLocalDate(option.date);
        insertTodo(str, isoDate);
    })

program
    .command('list')
    .alias('l')
    .description('lists todos (and goals)')
    .option('-d, --date <string>', 'todos of specific day', new Date())
    .option('-7, --recent7', 'show recent 7 days todos')
    .action((option) => {
        const isoDate = toIsoLocalDate(option.date);
        if (option.recent7) {
            listRecentDaysTodos(isoDate, 7);
        } else {
            listTodos(isoDate);
        }
    })

program
    .command('remove')
    .alias('rm')
    .arguments('<index...>')
    .description('removing given index from todo list')
    .option('-d, --date <string>', 'todos of specific day', new Date())
    .action((indexes, option) => {
        const isoDate = toIsoLocalDate(option.date);
        removeTodo(indexes, isoDate);
    })

program
    .command('done')
    .alias('d')
    .arguments('<index...>')
    .description('marks given indexes done')
    .option('-d, --date <string>', 'todos of specific day', new Date())
    .action((indexes, option) => {
        const isoDate = toIsoLocalDate(option.date);
        markDone(indexes, isoDate);
    })

program
    .command('undone')
    .alias('u')
    .arguments('<index...>')
    .description('marks given indexes undone')
    .option('-d, --date <string>', 'todos of specific day', new Date())
    .action((indexes, option) => {
        const isoDate = toIsoLocalDate(option.date);
        markUndone(indexes, isoDate);
    })

program
    .command('bold')
    .alias('b')
    .arguments('<index...>')
    .description('mark given indexes as import and bold you can make it bold several times for more import todos')
    .option('-d, --date <string>', 'todos of specific day', new Date())
    .action((indexes, option) => {
        const isoDate = toIsoLocalDate(option.date);
        markBold(indexes, isoDate);
    })

program.parse();