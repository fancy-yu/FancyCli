export function getHookTemplate(name: string) {
  return (
    `export interface ${name}Params {};
export const ${name} = (params: ${name}Params)=>{
  return {};
};
`)
}

export function getIndexTemplate(name: string) {
  return (`\nexport * from './${name}';`)
}
