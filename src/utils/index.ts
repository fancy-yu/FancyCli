import { Container, inject, injectable } from 'inversify';
import { FileUtils } from './file.js';
import { CommonderConfig } from './config.js';

export class CommanderUtils {
  static container: Container = new Container();
  constructor(){
    CommanderUtils.container.bind(FileUtils).toSelf();
    CommanderUtils.container.bind(CommonderConfig).toSelf();
  }
  get file(){
    return CommanderUtils.container.get(FileUtils)
  }
  get config(){
    return CommanderUtils.container.get(CommonderConfig)
  }

}
