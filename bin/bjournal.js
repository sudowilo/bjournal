#! /usr/bin/env node
const { Command } = require('commander');
const program = new Command();

const {toIsoLocalDate} = require('../lib/getDate');
const {listTodos, listRecentDaysTodos} = require('../commands/list');

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

program.parse();