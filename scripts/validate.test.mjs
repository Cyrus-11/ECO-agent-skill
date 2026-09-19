import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { validateSkill } from './validate.mjs';

function fixture(t, text) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'eco-validator-'));
  const folder = path.join(directory, 'example');
  fs.mkdirSync(folder);
  fs.writeFileSync(path.join(folder, 'SKILL.md'), text);
  t.after(() => {
    const relative = path.relative(os.tmpdir(), directory);
    assert.ok(!relative.startsWith('..') && !path.isAbsolute(relative) && relative.startsWith('eco-validator-'));
    fs.rmSync(directory, { recursive: true });
  });
  return folder;
}

const valid = '---\nname: example\ndescription: Review a local example when requested.\n---\n# Instructions\nRead the requested example.\n';

test('accepts portable skill metadata and CRLF files', t => {
  assert.equal(validateSkill(fixture(t, valid.replaceAll('\n', '\r\n'))).name, 'example');
});
test('rejects duplicate YAML keys rather than silently choosing one', t => {
  assert.throws(() => validateSkill(fixture(t, valid.replace('name: example', 'name: other\nname: example'))));
});
test('rejects missing descriptions and mismatched names', t => {
  assert.throws(() => validateSkill(fixture(t, valid.replace('description: Review a local example when requested.\n', ''))));
  assert.throws(() => validateSkill(fixture(t, valid.replace('name: example', 'name: other'))));
});
test('rejects references that disappear when only one skill is installed', t => {
  assert.throws(() => validateSkill(fixture(t, valid + '\nRead [shared](../shared.md).\n')));
});
test('accepts bundled references and rejects broken references', t => {
  const folder = fixture(t, valid + '\nRead [details](references/details.md).\n');
  assert.throws(() => validateSkill(folder));
  fs.mkdirSync(path.join(folder, 'references'));
  fs.writeFileSync(path.join(folder, 'references/details.md'), '# Details\n');
  assert.equal(validateSkill(folder).name, 'example');
});
test('rejects reference files that are never linked from SKILL.md', t => {
  const folder = fixture(t, valid);
  fs.mkdirSync(path.join(folder, 'references'));
  fs.writeFileSync(path.join(folder, 'references/orphan.md'), '# Orphan\n');
  assert.throws(() => validateSkill(folder));
});

function referenceFixture(t, body) {
  const folder = fixture(t, valid + '\nRead [details](references/nested/details.md).\n');
  fs.mkdirSync(path.join(folder, 'references/nested'), { recursive: true });
  fs.writeFileSync(path.join(folder, 'references/nested/details.md'), body);
  return folder;
}

test('rejects broken links inside nested reference guides with source context', t => {
  const folder = referenceFixture(t, '[Missing](missing.md)\n');
  assert.throws(() => validateSkill(folder), /details\.md: broken reference missing\.md/);
});

test('resolves reference guide links relative to the guide, within the skill', t => {
  const folder = referenceFixture(t, '[Instructions](../../SKILL.md#instructions)\n[Asset](../../assets/example%20data.json)\n');
  fs.mkdirSync(path.join(folder, 'assets'));
  fs.writeFileSync(path.join(folder, 'assets/example data.json'), '{}\n');
  assert.equal(validateSkill(folder).name, 'example');
});

test('rejects reference guide links outside the installed skill', t => {
  const folder = referenceFixture(t, '[Outside](../../../outside.md)\n');
  fs.writeFileSync(path.join(folder, '../outside.md'), '# Outside\n');
  assert.throws(() => validateSkill(folder), /details\.md: skill link escapes its installed folder/);
});

test('rejects links to directories inside reference guides', t => {
  const folder = referenceFixture(t, '[Directory](..)\n');
  assert.throws(() => validateSkill(folder), /details\.md: broken reference/);
});

test('ignores web, email, and same-page links in reference guides', t => {
  const folder = referenceFixture(t, '[Web](https://example.com)\n[Email](mailto:example@example.com)\n[Section](#details)\n');
  assert.equal(validateSkill(folder).name, 'example');
});
test('accepts a non-empty space-separated allowed-tools string', t => {
  const text = valid.replace('description: Review a local example when requested.',
    'description: Review a local example when requested.\nallowed-tools: Read Grep Glob');
  assert.equal(validateSkill(fixture(t, text)).name, 'example');
});
test('rejects an empty or non-string allowed-tools value', t => {
  const blank = valid.replace('description: Review a local example when requested.',
    'description: Review a local example when requested.\nallowed-tools: "   "');
  assert.throws(() => validateSkill(fixture(t, blank)));
  const list = valid.replace('description: Review a local example when requested.',
    'description: Review a local example when requested.\nallowed-tools:\n  - Read');
  assert.throws(() => validateSkill(fixture(t, list)));
});
