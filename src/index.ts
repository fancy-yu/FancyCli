#!/usr/bin/env node
import { createGenerateCommander } from './commanders/generate.js'
import { program } from './commanders/program.js'

function main() {
  createGenerateCommander()
  program.parse()
}
main()
