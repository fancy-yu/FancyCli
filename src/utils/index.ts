import { Container } from 'inversify'
import { CommonderConfig } from './config.js'
import { FileUtils } from './file.js'

export default class CommanderUtilsManager {
  private static _instance: CommanderUtilsManager
  static container: Container = new Container()

  // 私有构造函数，防止外部实例化
  private constructor() {
    // 注册依赖（只执行一次）
    CommanderUtilsManager.container.bind(FileUtils).toSelf()
    CommanderUtilsManager.container.bind(CommonderConfig).toSelf()
  }

  // 静态方法获取单例实例
  static getInstance(): CommanderUtilsManager {
    if (!this._instance) {
      this._instance = new CommanderUtilsManager()
    }
    return this._instance
  }

  // 获取服务的方法
  get F(): FileUtils {
    return CommanderUtilsManager.container.get(FileUtils)
  }

  get C(): CommonderConfig {
    return CommanderUtilsManager.container.get(CommonderConfig)
  }
}
