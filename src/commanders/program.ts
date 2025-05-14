import { Command } from 'commander'
import { underlineTheme } from '../const/index.js'

const program = new Command()
program
  .name('f')
  .description(underlineTheme('快捷开发的脚手架'))
  .version('1.0.0')

export {
  program,
}
