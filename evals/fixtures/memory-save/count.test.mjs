import assert from 'node:assert/strict';
import test from 'node:test';
import { formatCount } from './src/format-count.mjs';

test('zero and positive counts display', () => {
  assert.equal(formatCount(0), '0');
  assert.equal(formatCount(12), '12');
});
