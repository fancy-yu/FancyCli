import chalk from 'chalk'
import { underlineTheme } from '../const/index.js'
import { getComponentTemplate } from '../template/components.template.js'
import { getHookTemplate, getIndexTemplate } from '../template/hooks.template.js'
import { GType } from '../types/generate.js'
import CommanderUtilsManager from '../utils/index.js'
import { exit, log } from '../utils/tools.js'

export function generateAction({
  type,
  fileName,
  templateType,
}) {
  const cu = new CommanderUtilsManager()
  const config = cu.C.config
  type === GType.HOOK && (fileName = `use${fileName}`)
  fileName = fileName.replace(/^./, match => match.toUpperCase())
  const { dirName, addIndexExport } = config.g[type]
  const targetRootDirPath = cu.F.resolvePath(`src/${dirName}`)
  const targetRootDirPathExist = cu.F.validateFileExist(targetRootDirPath)
  if (!targetRootDirPathExist) {
    log.error(`${underlineTheme(dirName)} dir is not exist, please create it and try again `)
    exit(1)
  }
  const targetDirPath = cu.F.resolvePath(`src/${dirName}/${fileName}`)
  const targetDirPathExist = cu.F.validateFileExist(targetDirPath)
  if (targetDirPathExist) {
    log.warn(`${underlineTheme(fileName)} hook is exist!`)
    exit(1)
  }
  const targetFilePath = cu.F.resolvePath(`src/${dirName}/${fileName}/index.ts`)
  cu.F.createDir(targetDirPath)
    .createFile(targetFilePath)
  let getTemplate

  switch (type) {
    case GType.HOOK:
      getTemplate = getHookTemplate
      break
    case GType.COMPONENT:
      getTemplate = getComponentTemplate(templateType)
      break
    default:
      chalk.red('未知的类型：', type)
      break
  }
  cu.F.writeInFile(targetFilePath, getTemplate(fileName))
  if (addIndexExport) {
    const IndexPath = cu.F.resolvePath(`src/${dirName}/index.ts`)
    const data = cu.F.createFile(IndexPath)
      .readFile(IndexPath)
    cu.F.writeInFile(IndexPath, `${data}${getIndexTemplate(fileName)}`)
  }
  log.success(`${underlineTheme(fileName)} hook is created successfully!`)
}
