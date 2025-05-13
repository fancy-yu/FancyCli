#!/usr/bin/env node

import { createGenerateCommander } from './commanders/index.js';
import { program } from './commanders/program.js';
import { CommanderUtils } from './utils/index.js';


function main(){
  const cu = new CommanderUtils();
  cu.config.readConfig
  // createGenerateCommander()
  // program.parse();
}
main();


