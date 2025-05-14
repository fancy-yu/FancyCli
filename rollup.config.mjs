import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

/** @type {import("rollup").RollupOptions} */
export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.umd.js',
      name: 'fy',
      format: 'umd',
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: 'tsconfig.json',
    }),
  ],
}
