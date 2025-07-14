#! /usr/bin/env node
const { Command } = require('commander');
const program = new Command();

const { toIsoLocalDate, isoLocalDate, getTomorrow, getYesterday } = require('../lib/getDate');
const { listTodos, listRecentDaysTodos } = require('../commands/list');
const { insertTodo } = require('../commands/insert');
const { removeTodo } = require('../commands/remove');
const { markDone, markUndone, markBold } = require('../commands/mark');
const { forwardTodo } = require('../commands/forward');
const { listDefaults, insertDefault, removeDefault } = require('../commands/defaultTodos');
const { getDataPath, getBackup } = require('../commands/backup');

program
    .name('bjournal')
    .description('cli todo and goal pointer')
    .option('-y, --yesterday', 'todos of yesterday use for commands', getYesterday)
    .version('1.0.4');

program
    .command('insert')
    .alias('i')
    .arguments('<string...>')
    .description('inserting todo to specific date')
    .option('-d, --date <string>', 'todos of specific day', new Date())
    .option('-t, --tomorrow', 'todos of tomorrow', getTomorrow)
    .action((str, option) => {
        const { yesterday } = program.opts();
        const { date, tomorrow } = option;
        if (tomorrow && yesterday) {
            console.log('Only one date option may be selected');
            return;
        }
        const dateOption = yesterday ? yesterday : tomorrow;
        const isoDate = toIsoLocalDate(dateOption ? dateOption : date);
        insertTodo(str, isoDate);
    })

program
    .command('list')
    .alias('l')
    .description('lists todos (and goals)')
    .option('-d, --date <string>', 'todos of specific day', new Date())
    .option('-t, --tomorrow', 'todos of tomorrow', getTomorrow)
    .option('-7, --recent7', 'show recent 7 days todos')
    .action((option) => {
        const { yesterday } = program.opts();
        const { date, tomorrow, recent7 } = option;
        if (tomorrow && yesterday || tomorrow && recent7 || yesterday && recent7) {
            console.log('Only one date option may be selected');
            return;
        }
        const dateOption = yesterday ? yesterday : tomorrow;
        const isoDate = toIsoLocalDate(dateOption ? dateOption : date);

        if (recent7) {
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
    .option('-t, --tomorrow', 'todos of tomorrow', getTomorrow)
    .action((indexes, option) => {
        const { yesterday } = program.opts();
        const { date, tomorrow } = option;
        if (tomorrow && yesterday) {
            console.log('Only one date option may be selected');
            return;
        }
        const dateOption = yesterday ? yesterday : tomorrow;
        const isoDate = toIsoLocalDate(dateOption ? dateOption : date);
        removeTodo(indexes, isoDate);
    })

program
    .command('done')
    .alias('d')
    .arguments('<index...>')
    .description('marks given indexes done')
    .option('-d, --date <string>', 'todos of specific day', new Date())
    .option('-t, --tomorrow', 'todos of tomorrow', getTomorrow)
    .action((indexes, option) => {
        const { yesterday } = program.opts();
        const { date, tomorrow } = option;
        if (tomorrow && yesterday) {
            console.log('Only one date option may be selected');
            return;
        }
        const dateOption = yesterday ? yesterday : tomorrow;
        const isoDate = toIsoLocalDate(dateOption ? dateOption : date);
        markDone(indexes, isoDate);
    })

program
    .command('undone')
    .alias('u')
    .arguments('<index...>')
    .description('marks given indexes undone')
    .option('-d, --date <string>', 'todos of specific day', new Date())
    .option('-t, --tomorrow', 'todos of tomorrow', getTomorrow)
    .action((indexes, option) => {
        const { yesterday } = program.opts();
        const { date, tomorrow } = option;
        if (tomorrow && yesterday) {
            console.log('Only one date option may be selected');
            return;
        }
        const dateOption = yesterday ? yesterday : tomorrow;
        const isoDate = toIsoLocalDate(dateOption ? dateOption : date);
        markUndone(indexes, isoDate);
    })

program
    .command('bold')
    .alias('b')
    .arguments('<index...>')
    .description('mark given indexes as import and bold, you can make it bold several times for more import todos')
    .option('-d, --date <string>', 'todos of specific day', new Date())
    .option('-t, --tomorrow', 'todos of tomorrow', getTomorrow)
    .action((indexes, option) => {
        const { yesterday } = program.opts();
        const { date, tomorrow } = option;
        if (tomorrow && yesterday) {
            console.log('Only one date option may be selected');
            return;
        }
        const dateOption = yesterday ? yesterday : tomorrow;
        const isoDate = toIsoLocalDate(dateOption ? dateOption : date);
        markBold(indexes, isoDate);
    })


program
    .command('forward')
    .alias('f')
    .arguments('<index...>')
    .description('forwards todo to specific date')
    .option('-d, --date <string>', 'todos of specific day')
    .option('-t, --tomorrow', 'todos of tomorrow', getTomorrow)
    .option('-f, --forward-date <string>', 'date of day to forward (default: tomorrow)', getTomorrow())
    .action((indexes, option) => {
        const { yesterday } = program.opts();
        let { date, tomorrow, forwardDate } = option;
        if (tomorrow && yesterday) {
            console.log('Only one date option may be selected');
            return;
        }
        if (!date) {
            date = new Date().toLocaleDateString();
        } else {
            forwardDate = getTomorrow(date);
        }
        const dateOption = yesterday ? yesterday : tomorrow;
        const isoDate = toIsoLocalDate(dateOption ? dateOption : date);
        const isoForwardDate = toIsoLocalDate(forwardDate);
        forwardTodo(indexes, isoDate, isoForwardDate);
    })

program
    .command('default-todos')
    .description('default todos added to days todo when you list or insert that day')
    .option('-l, --list', 'lists all defaults')
    .option('-i, --insert <string...>', 'inserts new default value')
    .option('-r, --remove <index...>', 'removes a default from list')
    .action((option) => {
        const { list, insert, remove } = option;
        if ((list && insert) || (list && remove) || (insert && remove)) {
            console.log('chose only one of options');
            return;
        }
        if (list) {
            listDefaults();
        } else if (insert) {
            insertDefault(insert);
        } else if (remove) {
            removeDefault(remove);
        } else {
            console.log('to see options -h');
        }
    })

program
    .command('backup')
    .description('get a backup from your data.json file to specific path')
    .option('--show-path', 'path of data bjournal uses (you can copy your backup here)')
    .option('--get-backup <path>', 'get a backup from your data to specific path')
    .action((option) => {
        if (option.showPath) {
            getDataPath();
        } else if (option.getBackup) {
            getBackup(option.getBackup);
        } else {
            console.log('to see options -h');
        }

    });

program.parse();