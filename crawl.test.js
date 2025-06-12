const {normalizeUrl, getURLFromHTML} = require('./crawl');
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

test('get url from html absolute', () => {
  const inputHTMLBody = ` <html> 
<head>
    <a href="https://example.com/path">Link</a>
  </html>`;

  const baseUrl = 'https://example.com';
  const actual = getURLFromHTML(inputHTMLBody, baseUrl);
    const expected = ['https://example.com/path'];
  expect(actual).toEqual(expected);

});

test('get url from html relative', () => {
  const inputHTMLBody = ` <html> 
<head>
    <a href="/path/">Link</a>
  </html>`;

  const baseUrl = 'https://example.com';
  const actual = getURLFromHTML(inputHTMLBody, baseUrl);
    const expected = ['https://example.com/path/'];
  expect(actual).toEqual(expected);

});

test('get url from html relative', () => {
  const inputHTMLBody = ` <html> 
<head>
    <a href="INVALID">Invalid</a>
  </html>`;

  const baseUrl = 'https://example.com';
  const actual = getURLFromHTML(inputHTMLBody, baseUrl);
    const expected = [];
  expect(actual).toEqual(expected);

});