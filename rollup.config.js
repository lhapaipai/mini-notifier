import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import fse from 'fs-extra';

import postcssImport from "postcss-import"
import postcssNested from "postcss-nested";
import autoprefixer from "autoprefixer";



const pkg = fse.readJsonSync('./package.json');

export default {
  input: "src/index.ts",
  external: [
    ...Object.keys(pkg.dependencies || {})
  ],
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true
    },
  ],
  plugins: [
    json(),
    resolve({extensions: ['.ts', '.js']}),
    commonjs(),
    typescript(),
    postcss({
      plugins: [postcssImport, postcssNested, autoprefixer],
      extract: true,
      extract: 'style.css'
    
    })
  ]
};
