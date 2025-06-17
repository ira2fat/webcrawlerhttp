const {sortPages} = require('./report.js');
const { expect, test} = require('@jest/globals');

test('sortPages', () => {
  const input = {
    'example.com/path': { count: 3 },
    'example.com/another-path': { count: 5 },
    'example.com/yet-another-path': { count: 2 }
  };
    const actual = sortPages(input);
    const expected = [
      ['example.com/another-path', {count: 5}],
      ['example.com/path', {count: 3}],
      ['example.com/yet-another-path', {count: 2}]
    ];
  expect(actual).toEqual(expected);

});