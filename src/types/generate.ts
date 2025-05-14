export enum GType {
  HOOK = 'hook',
  COMPONENT = 'component',
}

export type GOptions = Record<GType, { dirName: string, addIndexExport?: boolean }>
export interface IDefaultConfig {
  g: GOptions
}

export enum TemplateType {
  NORMAL = 'normal',
  REF = 'ref',
}
