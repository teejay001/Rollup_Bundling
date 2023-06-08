/* eslint-disable no-undef */
const path = require('path');
import { babel } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import { uglify } from "rollup-plugin-uglify";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// import nodeResolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
import eslint from "@rollup/plugin-eslint";
const gzipPlugin = require('rollup-plugin-gzip').default;
// import { gzipPlugin } from 'rollup-plugin-gzip';
import htmlTemplate from "rollup-plugin-generate-html-template";
import { brotliCompress } from "zlib";
import { promisify } from "util";
import { visualizer } from "rollup-plugin-visualizer";
// import nodeExternals from 'rollup-plugin-node-externals';
// const nodeExternals = require('rollup-plugin-node-externals').default;
// import alias from '@rollup/plugin-alias';

const brotliPromise = promisify(brotliCompress);
const distDir = '../dist/functions';
const globalMap = {
  '@common/enums' : 'enums',
  '@common/utils/logger' : 'logger'
};

const externals = ['@common/enums', '@common/utils/logger'];

const config = [
  {
    input: './src/onSend.ts',
    output: {
      format: "iife",
      dir: distDir,
      entryFileNames: '[name]-[hash].js',
      sourcemap: true,
      name: "egressFunctions",
      // globals: globalMap,
    },
    context: 'window',
    // external: externals,
    plugins: rollupPlugins("./public/index.html")
  },
  {
    input: './src/onMessageCompose.ts',
    output: {
      format: "iife",
      dir: distDir,
      entryFileNames: '[name]-[hash].js',
      sourcemap: true,
      // globals: globalMap,
    },
    context: 'window',
    // external: externals,
    plugins: rollupPlugins(`${distDir}/index.html`),
  },
  {
    input: './src/RibbonButtonFunc.ts',
    output: {
      format: "iife",
      dir: distDir,
      entryFileNames: '[name]-[hash].js',
      sourcemap: true,
    },
    context: 'window',
    plugins: rollupPlugins(`${distDir}/index.html`),
  },
];
console.log(path.resolve(__dirname, '../Common/src'));

function rollupPlugins(htmlTemplatePath) {
  return [
    nodeResolve(),
    commonjs(),
    typescript(),
    babel({
      babelHelpers: "bundled",
      exclude: ["node_modules/**", "dist/**"],
    }),
    // alias({
    //   entries: [
    //     { find: '@common', replacement: (path.resolve(__dirname,'../Common/src')).replace(/\\/g, '/') }
    //   ]
    // }),
    // resolve({
    //   jsnext: true,
    //   modulePaths: ['../Common/**/*'],
    //   moduleDirectories: ['ojs-common']
    // }),
    // nodeResolve({
    //   browser: true,
    //   moduleDirectories: ['ojs-common'],
    //   modulePaths: ['../Common/**/*'],
    //   rootDir: '../Common'
    // }),
    // nodeExternals({
    //   exclude: ["node_modules/**", "dist/**", ".eslintrc.js", "babel.config.js", "jest.config.js", "webpack.config.js", "rollup.config.js"],
    // }),
    // commonjs({
    //   sourceMap: false,
    //   extensions: [".ts", ".js"],
    //   include: '../Common/**'
    // }),
    // nodePolyfills(),
    eslint({
      exclude: "src/**",
    }),
    htmlTemplate({
      template: htmlTemplatePath,
      target: "index.html",
    }),
    gzipPlugin(),
    gzipPlugin({
      customCompression: (content) => brotliPromise(Buffer.from(content)),
      fileName: ".br",
    }),
    process.env.NODE_ENV === "production" && uglify(),
    process.env.NODE_ENV === 'development' && visualizer({ open: false, }),
  ]
}

export default config;
