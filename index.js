import timelines from './src/timelines.js';

if (typeof window !== 'undefined' && window.d3) {
  window.d3.timelines = timelines;
}

export default timelines;
