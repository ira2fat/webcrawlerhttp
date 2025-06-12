const {normalizeUrl} = require('./crawl');
const {describe, it, expect, test} = require('@jest/globals');

test('normalizeUrl strip protocol', () => {
  const input = 'https://example.com/path';
  const actual = normalizeUrl(input);
    const expected = 'example.com/path';
  expect(actual).toEqual(expected);

});

test('normalizeUrl strip trailing slash', () => {
  const input = 'https://example.com/path/';
  const actual = normalizeUrl(input);
    const expected = 'example.com/path';
  expect(actual).toEqual(expected);

});

test('normalizeUrl capitals', () => {
  const input = 'https://EXAMPLE.com/path';
  const actual = normalizeUrl(input);
    const expected = 'example.com/path';
  expect(actual).toEqual(expected);

});

test('normalizeUrl strip http', () => {
  const input = 'http://example.com/path';
  const actual = normalizeUrl(input);
    const expected = 'example.com/path';
  expect(actual).toEqual(expected);

});