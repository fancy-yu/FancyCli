import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
    'no-useless-assignment': 'off',
    'no-unused-vars': 'off',
    'node/prefer-global/process': 'off',
    'unused-imports/no-unused-imports': 'off',
    'new-cap': 'off',
    'unused-imports/no-unused-vars': 'off',
    'no-case-declarations': 'off',
  },
  typescript: true,
})
