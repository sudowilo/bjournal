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
    .description('cli todo and soon goal pointer')
    .version('2.0.1')
    .addHelpText(
        'before',
        '\n\x1b[1mFor more options and usage details, use --help with a specific command.\nExample: bjournal insert --help or -h || bjournal help insert\x1b[0m\n'
    );
program
    .command('insert')
    .alias('i')
    .arguments('<string...>')
    .description('Add one or more todos to a specific day (default: today)')
    .usage(`
Examples:
  bjournal i 'Go to the gym'                  # Add a todo for today
  bjournal i 'Buy a new mouse' 'Install drivers'  # Add multiple todos for today
  bjournal i -t 'Go to the bank in the morning'   # Add a todo for tomorrow
  bjournal i -d 2025-08-01 'Pay the bills'        # Add a todo for a specific date
`)
    .option('-d, --date <string>', 'Specify a custom date (e.g., 2025-08-01)', isoLocalDate())
    .option('-t, --tomorrow', 'Add todos to tomorrow', getTomorrow)
    .option('-y, --yesterday', 'Add todos to yesterday', getYesterday)
    .action((str, option) => {
        const { date, tomorrow, yesterday } = option;
        if (tomorrow && yesterday) {
            console.log('Only one date option may be selected');
            return;
        }
        const dateOption = yesterday ? yesterday : tomorrow;
        const isoDate = toIsoLocalDate(dateOption ? dateOption : date);
        insertTodo(str, isoDate);
    });

program
    .command('list')
    .alias('l')
    .description('View todos for a specific day or a recent range (default: today)')
    .usage(`
Examples:
  bjournal list                  # List today's todos
  bjournal list -t              # List tomorrow's todos
  bjournal list -y              # List yesterday's todos
  bjournal list -d 2025-08-01   # List todos of a specific date
  bjournal list -7              # Show todos from the last 7 days
`)
    .option('-d, --date <string>', 'Specify a custom date (e.g., 2025-08-01)', isoLocalDate())
    .option('-t, --tomorrow', 'View todos from tomorrow', getTomorrow)
    .option('-y, --yesterday', 'View todos from yesterday', getYesterday)
    .option('-7, --last-7', 'Show todos from the past 7 days (including today)')
    .action((option) => {
        const { date, tomorrow, yesterday, recent7 } = option;
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
    });

program
    .command('remove')
    .alias('rm')
    .arguments('<index...>')
    .description('Remove one or more todos by their index for a specific day')
    .usage(`
Examples:
  bjournal rm 1 2               # Remove items 1 and 2 from today's list
  bjournal rm -t 3              # Remove item 3 from tomorrow's list
  bjournal rm -d 2025-08-01 1   # Remove item 1 from a specific date
`)
    .option('-d, --date <string>', 'Specify a custom date (e.g., 2025-08-01)', isoLocalDate())
    .option('-t, --tomorrow', 'Remove from tomorrow', getTomorrow)
    .option('-y, --yesterday', 'Remove from yesterday', getYesterday)
    .action((indexes, option) => {
        const { date, tomorrow, yesterday } = option;
        if (tomorrow && yesterday) {
            console.log('Only one date option may be selected');
            return;
        }
        const dateOption = yesterday ? yesterday : tomorrow;
        const isoDate = toIsoLocalDate(dateOption ? dateOption : date);
        removeTodo(indexes, isoDate);
    });

program
    .command('done')
    .alias('d')
    .arguments('<index...>')
    .description('Mark one or more todos as done for a specific day')
    .usage(`
Examples:
  bjournal done 1 3             # Mark items 1 and 3 as done for today
  bjournal done -y 2            # Mark item 2 as done for yesterday
  bjournal done -d 2025-08-01 1 # Mark item 1 as done for a specific date
`)
    .option('-d, --date <string>', 'Specify a custom date (e.g., 2025-08-01)', isoLocalDate())
    .option('-t, --tomorrow', 'Mark todos from tomorrow', getTomorrow)
    .option('-y, --yesterday', 'Mark todos from yesterday', getYesterday)
    .action((indexes, option) => {
        const { date, tomorrow, yesterday } = option;
        if (tomorrow && yesterday) {
            console.log('Only one date option may be selected');
            return;
        }
        const dateOption = yesterday ? yesterday : tomorrow;
        const isoDate = toIsoLocalDate(dateOption ? dateOption : date);
        markDone(indexes, isoDate);
    });

program
    .command('undone')
    .alias('u')
    .arguments('<index...>')
    .description('Mark one or more todos as not done for a specific day')
    .usage(`
Examples:
  bjournal undone 1 2           # Mark items 1 and 2 as undone
  bjournal undone -t 3          # Mark item 3 as undone for tomorrow
`)
    .option('-d, --date <string>', 'Specify a custom date (e.g., 2025-08-01)', isoLocalDate())
    .option('-t, --tomorrow', 'Mark todos from tomorrow', getTomorrow)
    .option('-y, --yesterday', 'Mark todos from yesterday', getYesterday)
    .action((indexes, option) => {
        const { date, tomorrow, yesterday } = option;
        if (tomorrow && yesterday) {
            console.log('Only one date option may be selected');
            return;
        }
        const dateOption = yesterday ? yesterday : tomorrow;
        const isoDate = toIsoLocalDate(dateOption ? dateOption : date);
        markUndone(indexes, isoDate);
    });

program
    .command('bold')
    .alias('b')
    .arguments('<index...>')
    .description('Mark one or more todos as important (bold); marking multiple times increases emphasis')
    .usage(`
Examples:
  bjournal bold 1               # Mark item 1 as important (bold)
  bjournal bold 1 2             # Bold multiple items
  bjournal bold -y 2            # Bold an item from yesterday
`)
    .option('-d, --date <string>', 'Specify a custom date (e.g., 2025-08-01)', isoLocalDate())
    .option('-t, --tomorrow', 'Bold todos from tomorrow', getTomorrow)
    .option('-y, --yesterday', 'Bold todos from yesterday', getYesterday)
    .action((indexes, option) => {
        const { date, tomorrow, yesterday } = option;
        if (tomorrow && yesterday) {
            console.log('Only one date option may be selected');
            return;
        }
        const dateOption = yesterday ? yesterday : tomorrow;
        const isoDate = toIsoLocalDate(dateOption ? dateOption : date);
        markBold(indexes, isoDate);
    });

program
    .command('forward')
    .alias('f')
    .arguments('<index...>')
    .description('Move one or more todos to another day')
    .usage(`
Examples:
  bjournal f 1 -f 2025-08-01       # Forward item 1 from today to a specific date
  bjournal f -t 2                  # Forward item 2 from tomorrow to the next day
  bjournal f 1 2 -f 2025-08-02     # Forward multiple items to a given day
  bjournal f -d 2025-07-11 -f 2025-08-01 0      #Forwards item form -d to -f 
`)
    .option('-d, --date <string>', 'Specify the date the todo currently exists on')
    .option('-t, --tomorrow', 'Move todos from tomorrow', getTomorrow)
    .option('-y, --yesterday', 'Move todos from yesterday', getYesterday)
    .option('-f, --forward-date <string>', 'Target date to forward the todo(s) to (default: tomorrow)', getTomorrow)
    .action((indexes, option) => {
        let { date, tomorrow, yesterday, forwardDate } = option;
        if (tomorrow && yesterday) {
            console.log('Only one date option may be selected');
            return;
        }
        const dateOption = yesterday ? yesterday : tomorrow;
        if (!date) {
            date = new Date().toLocaleDateString();
        }
        if (!forwardDate) {
            forwardDate = getTomorrow(dateOption ? dateOption : date);
        }
        const isoDate = toIsoLocalDate(dateOption ? dateOption : date);
        const isoForwardDate = toIsoLocalDate(forwardDate);
        forwardTodo(indexes, isoDate, isoForwardDate);
    });

program
    .command('default-todos')
    .description('Manage default todos that are automatically added when inserting or listing a day')
    .usage(`
Examples:
  bjournal default-todos -l             # List all default todos
  bjournal default-todos -i 'Drink water' 'Review goals'  # Add default items
  bjournal default-todos -r 1           # Remove a default item by index
`)
    .option('-l, --list', 'List all default todos')
    .option('-i, --insert <string...>', 'Add one or more default todos')
    .option('-r, --remove <index...>', 'Remove default todos by index')
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
    });

program
    .command('backup')
    .description('Backup or locate your bjournal data file')
    .usage(`
Examples:
  bjournal backup --show-path                     # Show the path to your data.json
  bjournal backup --get-backup ~/backups/bjournal # Backup your data to a specific path
`)
    .option('--show-path', 'Show the file path where your data is stored')
    .option('--get-backup <path>', 'Save a backup of your data to a specified path')
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