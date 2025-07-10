#! /usr/bin/env node
const { Command } = require('commander');
const program = new Command();

const {toIsoLocalDate, isoLocalDate} = require('../lib/getDate');
const {listTodos, listRecentDaysTodos} = require('../commands/list');
const {insertTodo} = require('../commands/insert');
const {removeTodo} = require('../commands/remove');
const {markDone} = require('../commands/mark');

program
    .name('bjournal')
    .description('cli todo and goal pointer')
    .version('0.0.0');

program
    .command('list')
    .alias('l')
    .description('lists todos (and goals)')
    .option('-d, --date <string>', 'todos of specific day', new Date())
    .option('-7, --recent7', 'show recent 7 days todos')
    .action((option) => {
        const date = new Date(option.date);
        const isoDate = toIsoLocalDate(date);
        if (option.recent7){
            listRecentDaysTodos(isoDate, 7);
        } else {
            listTodos(isoDate);
        }
    })

program
    .command('insert')
    .alias('i')
    .arguments('<string...>')
    .description('inserting todo to specific date')
    .option('-d, --date <string>', 'todos of specific day', new Date())
    .action((str, option)=>{
        const date = new Date(option.date);
        const isoDate = toIsoLocalDate(date);
        insertTodo(str, isoDate);
    })


program
    .command('remove')
    .alias('rm')
    .arguments('<index...>')
    .description('removing given index from data list')
    .option('-d, --date <string>', 'todos of specific day', new Date())
    .action((indexes, option)=>{
        const date = new Date(option.date);
        const isoDate = toIsoLocalDate(date);
        removeTodo(indexes, isoDate);
    })

program
    .command('done')
    .alias('d')
    .arguments('<index...>')
    .description('marks given indexes done')
    .option('-d, --date <string>', 'todos of specific day', new Date())
    .action((indexes, option)=>{
        const date = new Date(option.date);
        const isoDate = toIsoLocalDate(date);
        markDone(indexes, isoDate);
    })

program.parse();