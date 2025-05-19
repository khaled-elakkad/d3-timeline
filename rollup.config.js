import nodeResolve from '@rollup/plugin-node-resolve';
import pkg from './package.json' assert { type: 'json' };

const external = Object.keys(pkg.peerDependencies || {});

export default {
  input: 'index.js',
  output: {
    file: 'build/d3-timelines.js',
    format: 'umd',
    name: 'd3.timelines',
    globals: {
      'd3-axis': 'd3',
      'd3-array': 'd3',
      'd3-time-format': 'd3',
      'd3-time': 'd3',
      'd3-selection': 'd3',
      'd3-scale': 'd3',
      'd3-zoom': 'd3'
    }
  },
  external,
  plugins: [
    nodeResolve({ browser: true })
  ]
};
