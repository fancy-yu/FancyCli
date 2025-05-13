import prompts from 'prompts';
import { program } from './program.js';
import chalk from 'chalk';
import { GType } from '../types/generate.js';

export const createGenerateCommander = () => {
  program.command('g').description('创建hook/components').action(async () => {
    const questions: Parameters<typeof prompts>[0] = [
      {
        type: 'select',
        name: 'gType',
        choices: [{
          title: GType.HOOK,
          value: GType.HOOK,
          description: chalk.yellow('将在全局hooks文件下创建'),
        },
        {
          title: GType.COMPONENT,
          value: GType.COMPONENT,
          description: chalk.yellow('将在全局components文件下创建'),
        }],
        message: chalk.yellow('请选择要创建的类型'),
        validate: (input: string) => {
          if (!input) {
            return chalk.red('类型不能为空')
          }
          return true
        }
      },
      {
        type: 'text',
        name: 'fileName',
        message: chalk.yellow('请输入文件夹名称'),
        validate: (input: string) => {
          if (!input) {
            return chalk.red('文件夹名称不能为空')
          }
          return true
        }
      },

    ]
    const { gType, fileName } = await prompts(questions)
  })
}
