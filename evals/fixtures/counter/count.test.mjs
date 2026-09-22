import assert from 'node:assert/strict';
import test from 'node:test';
import { formatCount } from './src/format-count.mjs';

test('zero is a count', () => assert.equal(formatCount(0), '0'));
test('positive counts display', () => assert.equal(formatCount(12), '12'));
test('missing counts use a placeholder', () => {
  assert.equal(formatCount(null), '—');
  assert.equal(formatCount(undefined), '—');
});
