import chalk from "chalk";
import { GType } from "../types/generate.js";

interface IBaseGenerate{
  CreateFile():void
  CreateFolder():void
  ReadFile(): string;
  WriteFile(): boolean;
}
class BaseGenerate implements IBaseGenerate{
  #fileName: string = '';
  #filePath: string = '';
  #fileContent: string = '';
  constructor(options: {fileName: string, filePath: string, fileContent: string}){
    const {fileContent, fileName,filePath} = options;
    this.#fileContent = fileContent;
    this.#fileName = fileName;
    this.#filePath = filePath;
  }
  CreateFile(): void {
    // 在当前文件夹下创建文件
    
    console.log('创建文件');
  }
  CreateFolder(): void {
    console.log('创建文件夹');
  }
  ReadFile(): string {
    return this.#fileContent;
  }
  WriteFile(): boolean {
    return true;
  }
}


export const generateAction = (type: GType) => {
  switch(type){
    case GType.HOOK:
      console.log('hook');
      break;
    case GType.COMPONENT:
      console.log('component');
      break;
    default:
      chalk.red('未知的类型：', type);
      break;
  }

}

