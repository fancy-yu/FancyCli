import { Container } from 'inversify'
import { UTILS_MANAGER_TYPES } from '../const/index.js'
import { CommonderConfig } from './config.js'
import { FileUtils } from './file.js'

export default class CommanderUtilsManager {
  static container: Container = new Container()
  constructor() {
    CommanderUtilsManager.container.bind(UTILS_MANAGER_TYPES.FileUtils).to(FileUtils)
    CommanderUtilsManager.container.bind(UTILS_MANAGER_TYPES.CommonderConfig).to(CommonderConfig)
  }

  get F() {
    return CommanderUtilsManager.container.get<FileUtils>(UTILS_MANAGER_TYPES.FileUtils)
  }

  get C() {
    return CommanderUtilsManager.container.get<CommonderConfig>(UTILS_MANAGER_TYPES.CommonderConfig)
  }
}
