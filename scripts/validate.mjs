import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocument } from 'yaml';

export const skillNames = ['architect', 'imprint', 'recover', 'remember', 'review'];
export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function localLinks(text) {
  return [...text.matchAll(/\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)]
    .map(match => match[1]).filter(link => !/^(https?:|mailto:|#)/i.test(link));
}

function validateSkillLinks(file, text, folder) {
  const linked = new Set();
  for (const link of localLinks(text)) {
    const target = path.resolve(path.dirname(file), decodeURIComponent(link.split('#')[0]));
    const relative = path.relative(folder, target);
    assert.ok(relative && relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative),
      `${file}: skill link escapes its installed folder: ${link}`);
    assert.ok(fs.existsSync(target) && fs.statSync(target).isFile(), `${file}: broken reference ${link}`);
    linked.add(target);
  }
  return linked;
}

export function validateSkill(folder) {
  folder = path.resolve(folder);
  const file = path.join(folder, 'SKILL.md');
  assert.ok(fs.existsSync(file), `${folder}: missing SKILL.md`);
  const text = fs.readFileSync(file, 'utf8').replaceAll('\r\n', '\n');
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]+)$/);
  assert.ok(match, `${file}: YAML frontmatter and nonempty body are required`);
  const document = parseDocument(match[1], { uniqueKeys: true });
  assert.equal(document.errors.length, 0, `${file}: ${document.errors.join('; ')}`);
  const metadata = document.toJS();
  assert.ok(metadata && typeof metadata === 'object' && !Array.isArray(metadata), `${file}: metadata must be a mapping`);
  assert.ok(typeof metadata.name === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.name), `${file}: invalid name`);
  assert.ok(metadata.name.length <= 64, `${file}: name exceeds 64 characters`);
  assert.equal(metadata.name, path.basename(folder), `${file}: name differs from folder`);
  assert.ok(typeof metadata.description === 'string' && metadata.description.trim().length > 0 && metadata.description.length <= 1024,
    `${file}: description must contain 1-1024 characters`);
  assert.ok(match[2].trim().length > 0, `${file}: instructions are empty`);
  assert.ok(text.split('\n').length <= 500, `${file}: move conditional detail into references`);
  assert.ok(!text.includes('[TODO:'), `${file}: unfinished scaffold`);
  assert.ok(!fs.existsSync(path.join(folder, 'SKILLS.md')), `${folder}: obsolete SKILLS.md filename`);
  if ('allowed-tools' in metadata) {
    const allowed = metadata['allowed-tools'];
    assert.ok(typeof allowed === 'string' && allowed.trim().length > 0 && allowed.length <= 500,
      `${file}: allowed-tools must be a non-empty space-separated string`);
  }
  const linked = validateSkillLinks(file, text, folder);
  const referencesDir = path.join(folder, 'references');
  if (fs.existsSync(referencesDir)) {
    const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
      entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
    for (const refFile of walk(referencesDir)) {
      assert.ok(linked.has(refFile), `${file}: reference not linked from SKILL.md: ${path.relative(folder, refFile)}`);
      if (path.extname(refFile).toLowerCase() === '.md') {
        validateSkillLinks(refFile, fs.readFileSync(refFile, 'utf8'), folder);
      }
    }
  }
  return metadata;
}

export function validateRepository() {
  const folders = fs.readdirSync(path.join(root, 'skill'), { withFileTypes: true }).filter(item => item.isDirectory()).map(item => item.name).sort();
  assert.deepEqual(folders, skillNames, 'Unexpected skill folders');
  for (const name of skillNames) validateSkill(path.join(root, 'skill', name));
  for (const link of localLinks(fs.readFileSync(path.join(root, 'README.md'), 'utf8'))) {
    assert.ok(fs.existsSync(path.resolve(root, decodeURIComponent(link.split('#')[0]))), `README has a broken local link: ${link}`);
  }
  console.log(`Validated ${folders.length} skills and local README links.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) validateRepository();
