#! /usr/bin/env node
const {Command} = require('commander');
const program = new Command();

program
    .name('bjournal')
    .description('cli todo and goal pointer')
    .version('0.0.0');

program
    .command('list')
    .alias('l')
    .argument('<string>', 'lets see what you got')
    .description('lists todos (and goals)')
    .option('-d --date', 'todos of specific day')
    .action((str, option)=>{
        console.log(str);
        console.log(option);
    })

program.parse();