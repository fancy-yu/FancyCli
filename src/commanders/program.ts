import { Command } from 'commander';


const program = new Command();
program
  .name('f')
  .description('快捷开发的脚手架')
  .version('1.0.0');

export {
  program
}

