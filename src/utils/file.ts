import { fdir } from 'fdir'
import { injectable } from 'inversify';

@injectable()
export class FileUtils {
  crawler: fdir
  constructor(){
    this.crawler = new fdir()
  }
  getDirs(){
    const dirs = this.crawler.onlyDirs().exclude((dirName)=> {
      if(dirName.includes('node_modules')){
        return true;
      }
      return false
    }).crawl(process.cwd()).sync()
    return dirs;
  }

}
