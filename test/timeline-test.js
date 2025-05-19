import test from 'tape';
import timelines from '../index.js';

test("timeline() returns the correct version", function(t) {
  t.equal(timelines().version(), '1.0.0');
  t.end();
});
