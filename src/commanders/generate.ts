import chalk from 'chalk'
import prompts from 'prompts'
import { generateAction } from '../actions/generate.js'
import { errorTheme, infoTheme, warnTheme } from '../const/index.js'
import { GType, TemplateType } from '../types/generate.js'
import { program } from './program.js'

export function createGenerateCommander() {
  program.command('g').description('创建hook/components').action(async () => {
    const questions: Parameters<typeof prompts>[0] = [
      {
        type: 'select',
        name: 'gType',
        choices: [{
          title: GType.HOOK,
          value: GType.HOOK,
          description: warnTheme('将在全局hooks文件下创建, hooks会自动添加use前缀'),
        }, {
          title: GType.COMPONENT,
          value: GType.COMPONENT,
          description: warnTheme('将在全局components文件下创建'),
        }],
        message: warnTheme('请选择要创建的类型'),
        validate: (input: string) => {
          if (!input) {
            return errorTheme('类型不能为空')
          }
          return true
        },
      },
      {
        type: 'text',
        name: 'fileName',
        message: warnTheme('请输入文件夹名称'),
        validate: (input: string) => {
          if (!input) {
            return errorTheme('名称不能为空')
          }
          return true
        },
      },
    ]
    const { gType, fileName } = await prompts(questions)
    let templateType = TemplateType.NORMAL
    switch (gType) {
      case GType.COMPONENT:
        const { templateType: templateT } = await prompts([{
          type: 'select',
          name: 'templateType',
          choices: [{
            title: infoTheme('普通函数式组件'),
            value: TemplateType.NORMAL,
            description: warnTheme('将创建普通函数式组件'),
          }, {
            title: infoTheme('forwordref组件'),
            value: TemplateType.REF,
            description: warnTheme('将创建forwordref组件'),
          }],
          message: warnTheme('请选择要创建的类型'),
        }])
        templateType = templateT
    }
    if (!fileName) {
      process.exit(1)
    }

    generateAction({ type: gType, fileName, templateType })
  })
}
