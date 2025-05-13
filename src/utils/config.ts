import fs, { readFileSync } from 'fs'
import path from 'path';
import tsNode from 'ts-node'
import { pathToFileURL } from 'url';
import esbuild from 'esbuild'
import { injectable, inject } from 'inversify';
import { FileUtils } from './file.js';
global.__dirname = import.meta.url

@injectable()
export class CommonderConfig {
  @inject(FileUtils)  public fileUtils: FileUtils
  constructor(){
    // const dirs = this.fileUtils.getDirs();
    // console.log('dirs:->', dirs);
    // const configPath = path.join(process.cwd(), 'f.config.ts'); 

    // const readConfig = async()=>{
    //   const { outputFiles } = await esbuild.build({
    //     stdin: { contents: readFileSync(configPath, 'utf-8'), loader: 'ts' },
    //     format: 'esm',
    //     write: false
    //   });
    //   console.log('outputFiles:->', outputFiles);
    // }
    // readConfig();
    try {
      // const r = new Function(res)
    } catch (err) {
      console.error('动态导入失败:', err);
      process.exit(1);
    }
  }
  readConfig(){
    console.log('this.:->', this.fileUtils.getDirs());
  }
}
