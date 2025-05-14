import fs from 'node:fs'
import path from 'node:path'
import { fdir } from 'fdir'
import fsExtra from 'fs-extra'
import { injectable } from 'inversify'

import { IGNORE_CHECK_DIRS } from '../const/index.js'

@injectable()
export class FileUtils {
  #crawler: fdir = new fdir()
  rootPath: string = process.cwd()
  getDirs(path: string = this.rootPath) {
    const dirs = this.#crawler.onlyDirs().exclude((dirName) => {
      if (IGNORE_CHECK_DIRS.includes(dirName)) {
        return true
      }
      return false
    }).crawl(path).sync()
    return dirs
  }

  readFile(path: string) {
    return fs.readFileSync(path, 'utf8')
  }

  validateFileExist(path: string) {
    if (!path)
      return false
    return fs.existsSync(path)
  }

  getRelativePath(pathStr: string) {
    return path.resolve(this.rootPath, pathStr)
  }

  resolvePath(p: string) {
    return path.resolve(this.rootPath, p)
  }

  createDir(path: string) {
    fsExtra.ensureDirSync(path)
    return this
  }

  createFile(path: string) {
    fsExtra.ensureFileSync(path)
    return this
  }

  writeInFile(file: string, content: string, options: fs.WriteFileOptions = { encoding: 'utf8' }) {
    fsExtra.outputFileSync(file, content, options)
    return this
  }
}
