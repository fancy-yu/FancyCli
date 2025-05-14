import { TemplateType } from '../types/generate.js'

export function getComponentTemplateWithNormal(name: string) {
  return (
    `import React, { useState } from 'react';

export interface ${name}Props {};
export default function ${name} (props: ${name}Props){
    const {} = props ?? {};
    return <></>
};
`)
}

export function getComponentTemplateWithRef(name: string) {
  return (
    `
import React, { useImperativeHandle } from 'react';

export interface ${name}Props {};
export interface ${name}Ref {};
function ${name} (props: ${name}Props, ref: React.ForwardedRef<TestRef>){
    const {} = props ?? {};
    useImperativeHandle(ref, () => ({}), []);
    return <></>
};
export default React.forwardRef<${name}Ref, ${name}Props>(${name});
`)
}

export function getComponentTemplate(type: TemplateType) {
  switch (type) {
    case TemplateType.NORMAL:
      return getComponentTemplateWithNormal
    case TemplateType.REF:
      return getComponentTemplateWithRef
    default:
      return getComponentTemplateWithNormal
  }
}
