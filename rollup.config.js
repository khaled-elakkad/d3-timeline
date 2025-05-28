import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { minify } from 'terser';
import fs from 'fs';
import path from 'path';

const NAME = 'd3-timelines';
const INPUT = 'src/timelines.js';
const BUILD_DIR = 'build';
const DIST_DIR = 'dist';

function copyToDist() {
  return {
    name: 'copy-to-dist',
    async generateBundle(_, bundle) {
      const umdFile = `${NAME}.umd.js`;
      const srcCode = bundle[umdFile]?.code;
      if (!srcCode) {
        console.warn(`UMD output ${umdFile} not found.`);
        return;
      }

      if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR);
      }

      const distRaw = path.resolve(DIST_DIR, 'timelines.js');
      const distMin = path.resolve(DIST_DIR, 'timelines.min.js');

      fs.writeFileSync(distRaw, srcCode);
      console.log(`Copied → ${distRaw}`);

      const minified = await minify(srcCode);
      fs.writeFileSync(distMin, minified.code);
      console.log(`Minified → ${distMin}`);
    }
  };
}

export default {
  input: INPUT,
  output: [
    {
      file: `${BUILD_DIR}/${NAME}.esm.js`,
      format: 'esm',
      sourcemap: true
    },
    {
      file: `${BUILD_DIR}/${NAME}.cjs.js`,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: `${BUILD_DIR}/${NAME}.umd.js`,
      format: 'umd',
      name: 'D3Timelines',
      globals: {
        'd3-axis': 'd3',
        'd3-array': 'd3',
        'd3-time-format': 'd3',
        'd3-time': 'd3',
        'd3-scale': 'd3',
        'd3-scale-chromatic': 'd3',
        'd3-selection': 'd3',
        'd3-zoom': 'd3'
      },
      sourcemap: true
    }
  ],
  external: [
    'd3-axis',
    'd3-array',
    'd3-time-format',
    'd3-time',
    'd3-scale',
    'd3-scale-chromatic',
    'd3-selection',
    'd3-zoom'
  ],
  plugins: [
    resolve(),
    commonjs(),
    terser(),
    copyToDist()
  ]
};
