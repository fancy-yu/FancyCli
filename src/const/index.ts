import type { IDefaultConfig } from '../types/generate'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import chalk from 'chalk'

export const DEFAULT_CONFIG: IDefaultConfig = {
  g: {
    hook: {
      dirName: 'hooks',
      addIndexExport: true,
    },
    component: {
      dirName: 'components',
      addIndexExport: true,
    },
  },
}

export const DEFAULT_CONFIG_FILE_NAMES = [
  'f.config.json',
  // 'f.config.yaml',
  // 'f.config.js',
  // 'f.config.ts',
]

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

export const IGNORE_CHECK_DIRS = ['node_modules', '.git', 'dist']

export const errorTheme = chalk.bold.red
export const successTheme = chalk.bold.green
export const warnTheme = chalk.hex('#ffeb3b')
export const infoTheme = chalk.blue
export const underlineTheme = chalk.underline
