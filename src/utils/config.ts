import type { IDefaultConfig } from '../types/generate.js'
import type { FileUtils } from './file.js'
import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { build } from 'esbuild'
import { inject, injectable, LazyServiceIdentifier } from 'inversify'
import { assign, attempt } from 'lodash'
import { __dirname, __filename, DEFAULT_CONFIG, DEFAULT_CONFIG_FILE_NAMES, UTILS_MANAGER_TYPES } from '../const/index.js'
import { getNotFoundMsg, log } from './tools.js'

@injectable()
export class CommonderConfig {
  configPath: string = ''
  fileName: string = ''
  userConfig: IDefaultConfig
  configFileType: 'yaml' | 'json' | 'ts' | '' = ''
  constructor(
      @inject(new LazyServiceIdentifier(() => UTILS_MANAGER_TYPES.FileUtils))
      private F: FileUtils,
  ) {}

  private async getConfigPath() {
    const fileU = this.F
    for (const filename of DEFAULT_CONFIG_FILE_NAMES) {
      const filePath = path.resolve(fileU.rootPath, filename)
      if (!fs.existsSync(filePath))
        continue
      this.configPath = filePath
      this.fileName = filename
      path.extname(filename)
      break
    }
  }

  private readConfig() {
    const exist = this.F.validateFileExist(this.configPath)
    const configStr = exist ? this.F.readFile(this.configPath) : '{}'
    if (!configStr) {
      log.warn(`${this.fileName} is empty, the default config will be used`)
    }
    const tmpConfig = attempt(JSON.parse, configStr, DEFAULT_CONFIG)
    const config = assign(tmpConfig, DEFAULT_CONFIG)
    log.info(`currnet config -> \n ${config}`)
    this.userConfig = config
  }

  async bundleConfigFile() {
    if (!this.configPath) {
      getNotFoundMsg('configfile')
      return
    }
    const res = await build({
      format: 'esm',
      bundle: true,
      write: false,
      absWorkingDir: this.F.rootPath,
      entryPoints: [this.fileName],
      target: [`node${process.versions.node}`],
      platform: 'node',
      mainFields: ['main'],
      sourcemap: 'inline',
      sourceRoot: path.dirname(this.fileName) + path.sep,
      metafile: true,
      define: {
        __filename: JSON.stringify(__filename),
        __dirname: JSON.stringify(__dirname),
      },
      loader: {
        '.ts': 'ts',
      },
      plugins: [{
        name: 'inject-node-meta',
        setup(build) {
          build.onLoad({ filter: /\.[tj]s$/ }, async (args) => {
            const contents = await fs.promises.readFile(args.path, 'utf8')

            return {
              contents: `
                const __filename = ${JSON.stringify(args.path)};
                const __dirname = ${JSON.stringify(dirname(args.path))};
                ${contents}
              `,
              loader: args.path.endsWith('.ts') ? 'ts' : 'js',
            }
          })
          // 为 define 选项提供全局定义（用于未被插件处理的代码）
          build.initialOptions.define = {
            ...build.initialOptions.define,
            __filename: '__filename',
            __dirname: '__dirname',
          }
        },
      }],
    })
    console.log('res:->', res)
  }

  get config() {
    this.getConfigPath()
    this.readConfig()
    return this.userConfig
  }
}
