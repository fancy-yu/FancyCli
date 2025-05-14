import chalk from 'chalk'
import { intersection } from 'lodash'
import { errorTheme, infoTheme, successTheme, underlineTheme, warnTheme } from '../const/index.js'

/**
 * 验证target是否存在于array中
 * and 为 false 时，只要包含其中一个即可
 */
export function targetInArray<T extends any[]>(array: T, target: T[number] | T, and = true) {
  if (!target || !array || !Array.isArray(array))
    return false
  if (Array.isArray(target)) {
    const intersecRes = intersection(array, target)
    return and ? intersecRes.length === target.length : intersecRes.length > 0
  }
  return (array || []).includes(target)
}
chalk.level = 1
export const log = (msg: string) => console.log(msg)

log.error = (msg: string) => log(errorTheme(msg))
log.warn = (msg: string) => log(warnTheme(msg))
log.success = (msg: string) => log(successTheme(msg))
log.info = (msg: string) => log(infoTheme(msg))
log.underline = (msg: string) => log(underlineTheme(msg))

export const getNotFoundMsg = (path: string) => log.error(`not found ${underlineTheme(path)}, the default config will be used`)

export const exit = process.exit
