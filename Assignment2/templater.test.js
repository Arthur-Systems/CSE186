/*
#######################################################################
#
# Copyright (C) 2020-2024 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

const Templater = require('./templater');

/** */
test('Undefined', () => {
  const t = new Templater(undefined);
  expect(t.apply({})).toBe(undefined);
});

/** */
test('Single Tag', () => {
  const t = new Templater('Hello {{tag}}');
  expect(t.apply({tag: 'World'})).toBe('Hello World');
});

/** */
test('Multi Tag', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(t.apply({had: 'had', little: 'little', lamb: 'lamb'}))
      .toBe('Mary had a little lamb');
});

/** */
test('Missing Tag', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(t.apply({had: 'had', lamb: 'lamb'}))
      .toBe('Mary had a lamb');
});

/** */
test('No Space Between Tags', () => {
  const t = new Templater('Mary {{had}}{{little}}');
  expect(t.apply({had: 'had', little: 'little'})).toBe('Mary hadlittle');
});

/** */
test('Repeated Tags', () => {
  const t = new Templater('Mary {{had}} {{had}}');
  expect(t.apply({had: 'had'})).toBe('Mary had had');
});

/** */
test('Tags Separated By Other Characters', () => {
  const t = new Templater('Mary {{had}}-{{little}}');
  expect(t.apply({had: 'had', little: 'little'})).toBe('Mary had-little');
});

/** */
test('Strict - Missing Tag', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(() => t.apply({had: 'had', little: 'little'}, true))
      .toThrow('Missing tag lamb in map');
});

/** */
test('No Match', () => {
  const t = new Templater('Mary had a little lamb');
  expect(t.apply({had: 'had', little: 'little'}))
      .toBe('Mary had a little lamb');
});
