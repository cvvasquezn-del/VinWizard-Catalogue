import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// Incorrect pairing would skip a product or make the back cover unreachable.
const context = vm.createContext({});
const source = (() => { try { return readFileSync(new URL('./navigation.js', import.meta.url), 'utf8'); } catch { return ''; } })();
vm.runInContext(source, context);
const book = context.VWBook;

test('every page is reachable in order, with separate front and back covers', () => {
  assert.ok(book, 'navigation has not been implemented');
  let page = 0;
  const seen = [];
  for (let i = 0; i < 9; i++) {
    seen.push(...book.visible(page, 16, true));
    page = book.move(page, 1, 16, true);
  }
  assert.deepEqual(seen, Array.from({ length: 16 }, (_, i) => i));
  assert.equal(book.move(15, 1, 16, true), 15);
  assert.equal(book.move(0, -1, 16, true), 0);
});

test('mobile shows individual pages and changing to spreads preserves the selected page', () => {
  assert.ok(book);
  for (let i = 0; i < 16; i++) {
    assert.deepEqual(Array.from(book.visible(i, 16, false)), [i]);
    assert.ok(Array.from(book.visible(i, 16, true)).includes(i));
  }
  assert.equal(book.move(2, 1, 16, false), 3);
  assert.equal(book.move(2, -1, 16, true), 0);
});

test('shared page links clamp malformed and out-of-range values', () => {
  assert.ok(book);
  assert.equal(book.fromHash('#page=7', 16), 6);
  assert.equal(book.fromHash('#page=999', 16), 15);
  assert.equal(book.fromHash('#page=-3', 16), 0);
  assert.equal(book.fromHash('#page=2.5', 16), 0);
  assert.equal(book.fromHash('#unexpected', 16), 0);
});
