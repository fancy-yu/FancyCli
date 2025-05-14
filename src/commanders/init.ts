import { DEFAULT_CONFIG, DEFAULT_CONFIG_FILE_NAMES } from '../const/index.js'
import CommanderUtilsManager from '../utils/index.js'
import { exit, log } from '../utils/tools.js'
import { program } from './program.js'

export function createInitCommander() {
  const cu = CommanderUtilsManager.getInstance()
  program
    .command('init')
    .description('初始化默认配置')
    .action(() => {
      const fu = cu.F
      const exist = fu.validateFileExist(fu.resolvePath(`${fu.rootPath}/${DEFAULT_CONFIG_FILE_NAMES[0]}`))
      if (exist) {
        log.info(`${DEFAULT_CONFIG_FILE_NAMES[0]} already exist`)
        exit(1)
      }
      fu.writeInFile(fu.resolvePath(`${fu.rootPath}/${DEFAULT_CONFIG_FILE_NAMES[0]}`), JSON.stringify(DEFAULT_CONFIG, null, 2))
    })
}
