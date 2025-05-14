#!/usr/bin/env node
import { createGenerateCommander } from './commanders/generate.js'
import { createInitCommander } from './commanders/init.js'
import { program } from './commanders/program.js'

function main() {
  createGenerateCommander()
  createInitCommander()
  program.parse()
}
main()
